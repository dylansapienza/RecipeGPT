import { Typography } from "@mui/joy";
import Grid from "@mui/joy/Grid";
import Sheet from "@mui/joy/Sheet";

export default function Sidebar() {
  return (
    <Grid xs={2}>
      <Sheet
        sx={{
          height: "90vh",
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
            Left Sidebar
          </Typography>
        </div>
      </Sheet>
    </Grid>
  );
}
