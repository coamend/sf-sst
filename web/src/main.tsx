import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Provider as UrqlProvider, createClient, defaultExchanges } from "urql";
import { ListGalaxies } from "./pages/Galaxy";
import { ShowGalaxyGenerationProgress } from "./pages/GalaxyGeneration";
import { Amplify } from '@aws-amplify/core';

const urql = createClient({
  url: import.meta.env.VITE_GRAPHQL_URL,
  exchanges: defaultExchanges
});

Amplify.configure({
  API: {
    endpoints: [
      {
        name: "galaxyGenerator",
        endpoint: import.meta.env.VITE_GENERATE_URL,
        region: import.meta.env.VITE_GENERATE_REGION
      }
    ]
  }
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <UrqlProvider value={urql}>
      <App />
    </UrqlProvider>
  </React.StrictMode>
);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/galaxies" />} />
        <Route path="galaxies" element={<ListGalaxies />} />
        <Route path="galaxyGeneration/:galaxyID" element={<ShowGalaxyGenerationProgress />} />
      </Routes>
    </BrowserRouter>
  );
}
