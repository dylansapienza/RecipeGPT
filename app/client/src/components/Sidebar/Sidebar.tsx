import { Divider, Stack, Typography } from "@mui/joy";
import Grid from "@mui/joy/Grid";
import Sheet from "@mui/joy/Sheet";
import { useEffect, useRef } from "react";
import MinifiedRecipeCard from "./MinifiedRecipeCard";

interface RecipeCardProps {
  recipeTitle: string;
  base64recipeImage: string;
  recipeAuthor: string;
  recipeTime: string;
  sourcePdfPath: string;
}

export default function Sidebar({
  savedRecipes,
}: {
  savedRecipes: RecipeCardProps[];
}) {
  const bottomRecipe = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (bottomRecipe.current) {
      bottomRecipe.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [savedRecipes]);

  return (
    <Grid xs={3}>
      <Sheet
        sx={{
          height: "81vh",
          mx: 0,
          my: 1, // margin top & bottom
          py: 3, // padding top & bottom
          px: 1, // padding left & right
          display: "flex",
          flexDirection: "column",
          borderRadius: "sm",
          boxShadow: "md",
        }}
      >
        <div>
          <Typography level="h4" component="h1">
            Saved Recipes
          </Typography>
          <Divider />
          <Stack
            sx={{
              flexGrow: 1,
              overflowY: "auto", // Add vertical scroll
              maxHeight: "calc(90vh - 12vh)",
            }}
          >
            {savedRecipes.length > 0 ? (
              savedRecipes.map((recipe) => {
                return (
                  <MinifiedRecipeCard
                    recipeTitle={recipe.recipeTitle}
                    base64recipeImage={recipe.base64recipeImage}
                    recipeAuthor={recipe.recipeAuthor}
                    recipeTime={recipe.recipeTime}
                    sourcePdfPath={recipe.sourcePdfPath}
                    addSavedRecipe={() => {}}
                  />
                );
              })
            ) : (
              <Typography
                level="h5"
                sx={{ textAlign: "center", paddingTop: "5rem" }}
                color="neutral"
              >
                No saved recipes yet!
              </Typography>
            )}
            <div ref={bottomRecipe} />
          </Stack>
        </div>
      </Sheet>
    </Grid>
  );
}
