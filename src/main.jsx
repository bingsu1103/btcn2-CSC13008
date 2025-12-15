import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "@/App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "@/pages/Home";
import { ThemeProvider } from "./contexts/ThemeContext";
import MovieDetail from "./pages/MovieDetail";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home></Home>,
      },
      {
        path: "/movies/:id",
        element: <MovieDetail></MovieDetail>,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider storageKey="vite-ui-theme">
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>
);
