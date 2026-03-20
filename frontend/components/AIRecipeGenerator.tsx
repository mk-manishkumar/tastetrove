"use client";

import { useState } from "react";
import { Loader2, Sparkles, Plus, X } from "lucide-react";
import { toast } from "sonner";
import useFetch from "@/hooks/use-fetch";
import { generateRecipesFromPantry } from "@/actions/generateRecipesFromPantry.actions";
import RecipeCard from "./RecipeCard";

const COMMON_INGREDIENTS = ["Chicken Breast", "Ground Beef", "Salmon", "Eggs", "Milk", "Cheese", "Butter", "Olive Oil", "Garlic", "Onion", "Tomato", "Bell Pepper", "Broccoli", "Spinach", "Pasta", "Rice", "Bread", "Potatoes", "Carrots", "Salt", "Pepper", "Flour", "Sugar", "Beans", "Lentils"];

const CUISINES = ["Any", "Italian", "Indian", "Mexican", "Asian", "Thai", "Mediterranean"];
const MEAL_TYPES = ["Any", "Breakfast", "Lunch", "Dinner", "Snack", "Dessert"];
const DIETARY_PREFERENCES = ["Vegan", "Vegetarian", "Gluten-Free", "Low-Carb", "Dairy-Free"];

export default function AIRecipeGenerator() {
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [customIngredient, setCustomIngredient] = useState("");
  const [selectedDietary, setSelectedDietary] = useState<string[]>([]);
  const [selectedCuisine, setSelectedCuisine] = useState("Any");
  const [selectedMeal, setSelectedMeal] = useState("Any");

  const { loading, fn: generateRecipes, data: generatedData, error } = useFetch(generateRecipesFromPantry);

  const handleAddIngredient = (ingredient: string) => {
    if (!selectedIngredients.includes(ingredient)) {
      setSelectedIngredients([...selectedIngredients, ingredient]);
    }
  };

  const handleAddCustomIngredient = () => {
    if (customIngredient.trim() && !selectedIngredients.includes(customIngredient.trim())) {
      setSelectedIngredients([...selectedIngredients, customIngredient.trim()]);
      setCustomIngredient("");
    }
  };

  const handleRemoveIngredient = (ingredient: string) => {
    setSelectedIngredients(selectedIngredients.filter((ing) => ing !== ingredient));
  };

  const handleToggleDietary = (dietary: string) => {
    setSelectedDietary((prev) => (prev.includes(dietary) ? prev.filter((d) => d !== dietary) : [...prev, dietary]));
  };

  const handleGenerateRecipes = async () => {
    if (selectedIngredients.length === 0) {
      toast.error("Please select at least one ingredient");
      return;
    }

    await generateRecipes({
      ingredients: selectedIngredients,
      dietaryPreferences: selectedDietary,
      cuisinePreference: selectedCuisine,
      mealType: selectedMeal,
    });
  };

  // Get recipes from hook data
  const displayRecipes = generatedData && "recipes" in generatedData && Array.isArray(generatedData.recipes) ? generatedData.recipes : [];

  return (
    <div className="min-h-screen bg-linear-to-br from-orange-50 to-stone-50 pt-24 pb-16 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-orange-600 p-3 rounded-full">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-stone-900">AI Recipe Generator</h1>
          </div>
          <p className="text-lg text-stone-600">Select ingredients you have on hand, and our AI chef will generate personalized recipes just for you.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Panel - Generator */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-8 space-y-8">
              {/* Ingredients Selection */}
              <div>
                <h2 className="text-2xl font-bold text-stone-900 mb-4">Step 1: Select Ingredients</h2>

                {/* Common Ingredients Grid */}
                <div className="mb-6">
                  <p className="text-sm font-semibold text-stone-600 mb-3">Quick Select:</p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {COMMON_INGREDIENTS.map((ingredient) => (
                      <button key={ingredient} onClick={() => handleAddIngredient(ingredient)} disabled={selectedIngredients.includes(ingredient)} className={`px-3 py-2 rounded-lg text-sm font-medium transition ${selectedIngredients.includes(ingredient) ? "bg-orange-600 text-white" : "bg-stone-100 text-stone-700 hover:bg-stone-200"} disabled:opacity-50`}>
                        + {ingredient}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Custom Ingredient Input */}
                <div className="flex gap-2">
                  <input type="text" placeholder="Add custom ingredient..." value={customIngredient} onChange={(e) => setCustomIngredient(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleAddCustomIngredient()} className="flex-1 px-4 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500" />
                  <button onClick={handleAddCustomIngredient} className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg font-medium transition">
                    <Plus className="w-5 h-5" />
                  </button>
                </div>

                {/* Selected Ingredients */}
                {selectedIngredients.length > 0 && (
                  <div className="mt-4">
                    <p className="text-sm font-semibold text-stone-600 mb-2">Selected ({selectedIngredients.length}):</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedIngredients.map((ingredient) => (
                        <div key={ingredient} className="bg-orange-100 text-orange-800 px-4 py-2 rounded-full flex items-center gap-2">
                          <span>{ingredient}</span>
                          <button onClick={() => handleRemoveIngredient(ingredient)} className="hover:text-orange-600 transition">
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Dietary Preferences */}
              <div>
                <h2 className="text-2xl font-bold text-stone-900 mb-4">Step 2: Dietary Preferences (Optional)</h2>
                <div className="flex flex-wrap gap-2">
                  {DIETARY_PREFERENCES.map((dietary) => (
                    <button key={dietary} onClick={() => handleToggleDietary(dietary)} className={`px-4 py-2 rounded-full font-medium transition ${selectedDietary.includes(dietary) ? "bg-orange-600 text-white" : "bg-stone-200 text-stone-700 hover:bg-stone-300"}`}>
                      {dietary}
                    </button>
                  ))}
                </div>
              </div>

              {/* Cuisine & Meal Type */}
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="cuisine-select" className="block text-sm font-semibold text-stone-600 mb-2">
                    Cuisine Preference:
                  </label>
                  <select id="cuisine-select" value={selectedCuisine} onChange={(e) => setSelectedCuisine(e.target.value)} className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500">
                    {CUISINES.map((cuisine) => (
                      <option key={cuisine} value={cuisine}>
                        {cuisine}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="meal-select" className="block text-sm font-semibold text-stone-600 mb-2">
                    Meal Type:
                  </label>
                  <select id="meal-select" value={selectedMeal} onChange={(e) => setSelectedMeal(e.target.value)} className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500">
                    {MEAL_TYPES.map((meal) => (
                      <option key={meal} value={meal}>
                        {meal}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Generate Button */}
              <button onClick={handleGenerateRecipes} disabled={loading || selectedIngredients.length === 0} className="w-full bg-linear-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl transition flex items-center justify-center gap-2">
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Generating Recipes...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    Generate Recipes with AI
                  </>
                )}
              </button>

              {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">{error instanceof Error ? error.message : "An error occurred"}</div>}
            </div>
          </div>

          {/* Right Panel - Info */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-xl font-bold text-stone-900 mb-4">💡 How It Works</h3>
              <ol className="space-y-4">
                <li className="flex gap-3">
                  <span className="font-bold text-orange-600 shrink-0">1.</span>
                  <span className="text-stone-700">Select ingredients you have at home</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-bold text-orange-600 shrink-0">2.</span>
                  <span className="text-stone-700">Set your dietary preferences</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-bold text-orange-600 shrink-0">3.</span>
                  <span className="text-stone-700">Click generate to get recipes</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-bold text-orange-600 shrink-0">4.</span>
                  <span className="text-stone-700">Save your favorites for later</span>
                </li>
              </ol>

              <div className="mt-8 pt-8 border-t border-stone-200">
                <p className="text-xs text-stone-600">🤖 Powered by Google Gemini AI • Recipes generated instantly • Match percentage shows ingredient coverage</p>
              </div>
            </div>
          </div>
        </div>

        {/* Generated Recipes */}
        {displayRecipes.length > 0 && (
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-stone-900 mb-8">🍽️ Generated Recipes ({displayRecipes.length})</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayRecipes.map((recipe) => (
                <RecipeCard key={recipe.title} recipe={recipe} variant="default" />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
