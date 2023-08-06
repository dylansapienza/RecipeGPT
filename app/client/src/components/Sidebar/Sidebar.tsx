import { Divider, Stack, Typography } from "@mui/joy";
import Grid from "@mui/joy/Grid";
import Sheet from "@mui/joy/Sheet";
import RecipeCard from "../Chat/RecipeCard/RecipeCard";

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
  return (
    <Grid xs={2}>
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
          <Stack>
            {savedRecipes.length > 0 ? (
              savedRecipes.map((recipe) => {
                return (
                  <RecipeCard
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
              <></>
            )}
          </Stack>
        </div>
      </Sheet>
    </Grid>
  );
}
