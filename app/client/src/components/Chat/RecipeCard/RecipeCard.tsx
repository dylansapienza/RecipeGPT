import { BookmarkAdd } from "@mui/icons-material";
import {
  AspectRatio,
  Button,
  Card,
  CardContent,
  IconButton,
  Typography,
} from "@mui/joy";

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
  return (
    <>
      <div style={{ padding: "1rem" }}>
        <Card sx={{ width: "90%", maxWidth: 300, boxShadow: "md" }}>
          <div>
            <Typography level="h4">{recipeTitle}</Typography>
            <Typography>By: {recipeAuthor}</Typography>
            <IconButton
              variant="plain"
              color="neutral"
              size="sm"
              sx={{ position: "absolute", top: "0.875rem", right: "0.5rem" }}
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
          </div>
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
        </Card>
      </div>
    </>
  );
}
