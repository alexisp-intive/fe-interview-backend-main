import { ThemeProvider } from "@emotion/react";
import CssBaseline from "@mui/material/CssBaseline";
import "./App.css";
import { Layout } from "./components/Layout";
import { SearchResults } from "./components/SearchResults";
import { theme } from "./config/theme";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <QueryClientProvider client={queryClient}>
        <Layout>
          <SearchResults />
        </Layout>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
