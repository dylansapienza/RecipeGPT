import { CssVarsProvider } from "@mui/joy/styles";
import Grid from "@mui/joy/Grid";

//import components
import Sidebar from "./components/Sidebar/Sidebar";
import Chat from "./components/Chat/Chat";
import { Typography } from "@mui/joy";
import { useState } from "react";

interface RecipeCardProps {
  recipeTitle: string;
  base64recipeImage: string;
  recipeAuthor: string;
  recipeTime: string;
  sourcePdfPath: string;
}

function App() {
  const [savedRecipes, setSavedRecipes] = useState<RecipeCardProps[]>([]);

  function addSavedRecipe(recipe: RecipeCardProps) {
    setSavedRecipes((savedRecipes) => [...savedRecipes, recipe]);
  }

  return (
    <CssVarsProvider>
      <div style={{ backgroundColor: "#FFD8B8" }}>
        <Typography level="h1" sx={{ textAlign: "letf", ml: 2 }}>
          RecipeGPT
        </Typography>
        <Grid container spacing={2}>
          <Sidebar savedRecipes={savedRecipes} />
          <Chat addSavedRecipe={addSavedRecipe} />
        </Grid>
      </div>
    </CssVarsProvider>
  );
}

export default App;
