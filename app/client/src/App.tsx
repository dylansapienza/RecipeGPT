import { CssVarsProvider } from "@mui/joy/styles";
import Grid from "@mui/joy/Grid";

//import components
import Sidebar from "./components/Sidebar/Sidebar";
import Chat from "./components/Chat/Chat";

function App() {
  return (
    <CssVarsProvider>
      <div style={{ backgroundColor: "#FFD8B8" }}>
        <Grid container spacing={2}>
          <Sidebar />
          <Chat />
        </Grid>
      </div>
    </CssVarsProvider>
  );
}

export default App;
