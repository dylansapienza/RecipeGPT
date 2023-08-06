import { BookmarkAdd } from "@mui/icons-material";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
import {
  AspectRatio,
  Button,
  Card,
  CardContent,
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

export default function RecipeCard({
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
      <div style={{ padding: "1rem" }}>
        <Card sx={{ minWidth: 300, maxWidth: 300, boxShadow: "md" }}>
          <IconButton
            variant="plain"
            color="neutral"
            size="sm"
            sx={{ position: "absolute", top: "0.4rem", left: "0.2rem" }}
          >
            <ClearRoundedIcon onClick={() => setShowCard(false)} />
          </IconButton>
          <IconButton
            variant="plain"
            color="neutral"
            size="sm"
            sx={{ position: "absolute", top: "0.4rem", right: "0.2rem" }}
          >
            <BookmarkAdd
              onClick={() =>
                addSavedRecipe({
                  recipeTitle,
                  base64recipeImage,
                  recipeAuthor,
                  recipeTime,
                  sourcePdfPath,
                })
              }
            />
          </IconButton>
          <div
            style={{
              paddingTop: "1rem",
              paddingLeft: "0.5rem",
              paddingRight: "0.5rem",
            }}
          >
            <Typography level="h5">{recipeTitle}</Typography>
            <Typography>By: {recipeAuthor}</Typography>

            <AspectRatio minHeight="120px" maxHeight="200px">
              <img
                src={`data:image/png;base64,${base64recipeImage}`}
                loading="lazy"
                alt=""
              />
            </AspectRatio>
            <CardContent orientation="horizontal">
              <div>
                <Typography>Expected Cook Time:</Typography>
                <Typography>{recipeTime}</Typography>
              </div>

              <Button
                variant="solid"
                size="md"
                color="primary"
                sx={{ ml: "auto", alignSelf: "center", fontWeight: 600 }}
                onClick={() => window.open(sourcePdfPath, "_blank")}
              >
                Expand
              </Button>
            </CardContent>
          </div>
        </Card>
      </div>
    </>
  );
}
