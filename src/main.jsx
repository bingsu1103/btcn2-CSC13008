import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "@/App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "@/pages/Home";
import { ThemeProvider } from "@/contexts/ThemeContext";
import MovieDetail from "@/pages/MovieDetail";
import ActorDetail from "@/pages/ActorDetail";
import Movies from "@/pages/Movie";
import Register from "@/pages/Register";
import { AuthContextProvider } from "@/contexts/AuthContext";
import Login from "@/pages/Login";
import GuestRoute from "@/contexts/GuestRoute";
import ProtectedRoute from "./contexts/ProtectedRoute";
import UserProfile from "./pages/UserProfile";
import FavoriteMovies from "./pages/FavoriteMovies";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/movies/:id",
        element: <MovieDetail />,
      },
      {
        path: "/actors/:id",
        element: <ActorDetail />,
      },
      {
        path: "/movies",
        element: <Movies />,
      },
      {
        path: "/favorite/movies",
        element: <FavoriteMovies />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/login",
        element: (
          <GuestRoute>
            <Login />
          </GuestRoute>
        ),
      },
      {
        path: "/user/profile",
        element: (
          <ProtectedRoute>
            <UserProfile />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthContextProvider>
      <ThemeProvider storageKey="vite-ui-theme">
        <RouterProvider router={router} />
      </ThemeProvider>
    </AuthContextProvider>
  </StrictMode>
);
