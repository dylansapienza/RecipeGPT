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
}

export default function RecipeCard({
  recipeTitle,
  base64recipeImage,
  recipeAuthor,
  recipeTime,
}: RecipeCardProps) {
  return (
    <>
      <div style={{ padding: "1rem" }}>
        <Card sx={{ width: 300 }}>
          <div>
            <Typography level="h4">{recipeTitle}</Typography>
            <Typography>By: {recipeAuthor}</Typography>
            <IconButton
              variant="plain"
              color="neutral"
              size="sm"
              sx={{ position: "absolute", top: "0.875rem", right: "0.5rem" }}
            >
              <BookmarkAdd />
            </IconButton>
          </div>
          <AspectRatio minHeight="120px" maxHeight="200px">
            <img src={base64recipeImage} loading="lazy" alt="" />
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
            >
              Expand
            </Button>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
