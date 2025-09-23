// utils/fetchRecipe.js

export async function fetchRecipe(ingredientName) {
  try {
    const res = await fetch(
      `http://p0wkg088og0wgc4044wccswc.178.16.139.168.sslip.io/find_recipe_from_image?name=${encodeURIComponent(
        ingredientName
      )}`
    );
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch recipe", error);
    return null;
  }
}

const fetchRecipes = async (ingredientsList) => {
  console.log("🧪 Fetching recipes for:", ingredientsList);
  setLoading(true);
  setError(null);

  try {
    const query = ingredientsList.map(ingredient => `ingredients=${encodeURIComponent(ingredient)}`).join('&');
    const apiUrl = `https://p0wkg088og0wgc4044wccswc.vps.boomlive.in/find_recipe?${query}`;
    console.log("📡 API URL →", apiUrl);

    const response = await fetch(apiUrl);
    const data = await response.json();
    console.log("🍲 API Response →", data);

    if (Array.isArray(data)) {
      setRecipeDatabase(data);
    } else if (Array.isArray(data.recipes)) {
      setRecipeDatabase(data.recipes);
    } else {
      console.error("⛔ Unexpected API structure:", data);
      setRecipeDatabase([]);
    }
  } catch (error) {
    console.error("🚨 Failed to fetch:", error);
    setRecipeDatabase([]);
    setError("Failed to fetch recipes.");
  } finally {
    setLoading(false);
  }
};
