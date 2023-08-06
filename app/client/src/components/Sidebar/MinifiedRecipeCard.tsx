/* eslint-disable @typescript-eslint/no-unused-vars */
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
import {
  AspectRatio,
  Card,
  CardContent,
  Chip,
  IconButton,
  Typography,
} from "@mui/joy";
import { useState } from "react";

interface RecipeCardProps {
  recipeTitle: string;
  base64recipeImage: string;
  recipeAuthor: string;
  recipeTime: string;
  sourcePdfPath: string;
}

export default function MinifiedRecipeCard({
  recipeTitle,
  base64recipeImage,
  recipeAuthor,
  recipeTime,
  sourcePdfPath,
  addSavedRecipe,
}: RecipeCardProps & { addSavedRecipe: (recipe: RecipeCardProps) => void }) {
  const [constShowCard, setShowCard] = useState(true);

  if (!constShowCard) {
    return <></>;
  }

  return (
    <>
      <div style={{ padding: "0.5rem" }}>
        <Card
          variant="outlined"
          orientation="horizontal"
          sx={{
            width: 320,
            "&:hover": {
              boxShadow: "md",
              borderColor: "neutral.outlinedHoverBorder",
            },
          }}
        >
          <IconButton
            variant="plain"
            color="neutral"
            size="sm"
            sx={{ position: "absolute", top: "0.4rem", right: "0.2rem" }}
          >
            <ClearRoundedIcon onClick={() => setShowCard(false)} />
          </IconButton>
          <AspectRatio ratio="1" sx={{ width: 90 }}>
            <img
              src={`data:image/png;base64,${base64recipeImage}`}
              loading="lazy"
              alt=""
            />
          </AspectRatio>
          <CardContent>
            <Typography level="h6">{recipeTitle}</Typography>
            <Typography level="body2">By: {recipeAuthor}</Typography>
            <Chip
              variant="outlined"
              color="primary"
              size="sm"
              sx={{ pointerEvents: "none" }}
            >
              Savory, Smoky, Spicy
            </Chip>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
