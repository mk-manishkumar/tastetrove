import AIRecipeGenerator from "@/components/AIRecipeGenerator";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export const metadata = {
  title: "AI Recipe Generator | TasteTrove",
  description: "Generate personalized recipes from your ingredients using AI",
};

export default async function AIRecipeGeneratorPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  return <AIRecipeGenerator />;
}
