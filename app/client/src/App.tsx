import { CssVarsProvider } from "@mui/joy/styles";
import Grid from "@mui/joy/Grid";

//import components
import Sidebar from "./components/Sidebar/Sidebar";
import Chat from "./components/Chat/Chat";
import { Typography } from "@mui/joy";

function App() {
  return (
    <CssVarsProvider>
      <div style={{ backgroundColor: "#FFD8B8" }}>
        <Typography level="h1" sx={{ textAlign: "letf", ml: 2 }}>
          RecipeGPT
        </Typography>
        <Grid container spacing={2}>
          <Sidebar />
          <Chat />
        </Grid>
      </div>
    </CssVarsProvider>
  );
}

export default App;
