"use server";

import { checkUser } from "@/lib/checkUser";
import { GoogleGenerativeAI } from "@google/generative-ai";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY;
const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

// Helper function to fetch recipe image from Unsplash
async function fetchRecipeImage(recipeName: string): Promise<string> {
  try {
    if (!UNSPLASH_ACCESS_KEY) {
      console.warn("⚠️ UNSPLASH_ACCESS_KEY not set, skipping image fetch");
      return "";
    }

    const response = await fetch(`https://api.unsplash.com/search/photos?query=${encodeURIComponent(recipeName)}&per_page=1&orientation=landscape`, {
      headers: {
        Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
      },
    });

    if (!response.ok) {
      console.error("❌ Unsplash API error:", response.statusText);
      return "";
    }

    const data = await response.json();

    if (data.results && data.results.length > 0) {
      const photo = data.results[0];
      return photo.urls.regular || "";
    }

    return "";
  } catch (error) {
    console.error("❌ Error fetching Unsplash image:", error);
    return "";
  }
}

interface GenerateRecipesParams {
  ingredients: string[];
  dietaryPreferences?: string[];
  cuisinePreference?: string;
  mealType?: string;
}

interface GeneratedRecipe {
  title: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  prepTime: number;
  cookTime: number;
  servings: number;
  difficulty: string;
  matchPercentage: number;
  missingIngredients: string[];
  category: string;
  cuisine: string;
  imageUrl: string;
}

// Generate recipes from pantry items using Gemini
export async function generateRecipesFromPantry(params: GenerateRecipesParams) {
  try {
    const user = await checkUser();
    if (!user) {
      throw new Error("User not authenticated");
    }

    const { ingredients, dietaryPreferences = [], cuisinePreference = "any", mealType = "any" } = params;

    if (!ingredients || ingredients.length === 0) {
      throw new Error("Please select at least one ingredient");
    }

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" });

    const prompt = `You are a professional chef and recipe expert. Generate 5 creative recipes that can be made using the following ingredients.

Available Ingredients:
${ingredients.map((ing) => `- ${ing}`).join("\n")}

${dietaryPreferences.length > 0 ? `Dietary Preferences: ${dietaryPreferences.join(", ")}` : ""}
${cuisinePreference === "any" ? "" : `Preferred Cuisine: ${cuisinePreference}`}
${mealType === "any" ? "" : `Meal Type: ${mealType}`}

For each recipe, return ONLY valid JSON array with this exact structure (no markdown, no explanations):
[
  {
    "title": "Recipe Name",
    "description": "Brief description of the dish",
    "category": "Main Course/Dessert/Appetizer/Snack/Beverage",
    "cuisine": "Cuisine Type",
    "ingredients": ["ingredient 1", "ingredient 2"],
    "instructions": ["Step 1", "Step 2", "Step 3"],
    "prepTime": 10,
    "cookTime": 20,
    "servings": 2,
    "difficulty": "Easy/Medium/Hard",
    "matchPercentage": 85,
    "missingIngredients": ["milk", "salt"]
  }
]

Rules:
- matchPercentage = percentage of required ingredients available (0-100)
- Prioritize recipes that use more of the provided ingredients
- Include 1-5 common missing ingredients per recipe
- Make recipes creative but realistic
- PrepTime and cookTime should be in minutes
- Only return valid JSON, no additional text`;

    console.log("🤖 Calling Gemini API with ingredients...");
    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    // Parse JSON from response
    const jsonRegex = /\[[\s\S]*\]/;
    const jsonMatch = jsonRegex.exec(responseText);
    if (!jsonMatch) {
      throw new Error("Failed to parse recipe data from AI response");
    }

    const parsedRecipes = JSON.parse(jsonMatch[0]) as GeneratedRecipe[];

    // Fetch images for each recipe
    console.log("📸 Fetching images for recipes...");
    const recipesWithImages = await Promise.all(
      parsedRecipes.map(async (recipe) => ({
        ...recipe,
        imageUrl: await fetchRecipeImage(recipe.title),
      })),
    );

    console.log("✅ Successfully generated recipes from pantry items");
    return {
      success: true,
      recipes: recipesWithImages,
      message: `Generated ${recipesWithImages.length} recipes from your ingredients!`,
    };
  } catch (error) {
    console.error("❌ Error generating recipes:", error);
    throw error;
  }
}

// Save generated recipe to Strapi
export async function saveGeneratedRecipe(recipe: GeneratedRecipe) {
  try {
    const user = await checkUser();
    if (!user) {
      throw new Error("User not authenticated");
    }

    if (!STRAPI_API_TOKEN) {
      throw new Error("STRAPI_API_TOKEN not configured");
    }

    const recipeData = {
      title: recipe.title,
      description: recipe.description,
      category: recipe.category,
      cuisine: recipe.cuisine,
      ingredients: recipe.ingredients,
      instructions: recipe.instructions,
      prepTime: recipe.prepTime,
      cookTime: recipe.cookTime,
      servings: recipe.servings,
      difficulty: recipe.difficulty,
      imageUrl: recipe.imageUrl,
      isAiGenerated: true,
      source: "AI Recipe Generator",
    };

    const response = await fetch(`${STRAPI_URL}/api/recipes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${STRAPI_API_TOKEN}`,
      },
      body: JSON.stringify({
        data: recipeData,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error("Strapi error:", error);
      throw new Error("Failed to save recipe");
    }

    const savedRecipe = await response.json();
    console.log("✅ Recipe saved successfully:", savedRecipe);

    return {
      success: true,
      recipe: savedRecipe,
      message: "Recipe saved successfully!",
    };
  } catch (error) {
    console.error("❌ Error saving recipe:", error);
    throw error;
  }
}
