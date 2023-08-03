import { useState } from "react";
import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

// Import Pages
import LandingPage from "./page/LandingPage";
import CodePage from "./page/CodePage";

const queryClient = new QueryClient();

function App() {
  const [param, setParam] = useState({
    owner: "",
    name: "",
    branch: "",
  });
  const [showEditor, setShowEditor] = useState(false);

  return (
    <>
      <QueryClientProvider client={queryClient}>
        {showEditor ? (
          <CodePage param={param} setShowEditor={setShowEditor} />
        ) : (
          <LandingPage
            param={param}
            setParam={setParam}
            setShowEditor={setShowEditor}
          />
        )}
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
}

export default App;
