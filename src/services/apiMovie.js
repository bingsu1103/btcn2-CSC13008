const apiMovie = {
  fetchAllMovie: async (page, limit) => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const appToken = import.meta.env.VITE_X_APP_TOKEN;

    const response = await fetch(
      `${backendUrl}/api/movies?page=${page}&limit=${limit}`,
      {
        headers: {
          "Content-Type": "application/json",
          "x-app-token": appToken,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Fetch movie failed");
    }

    return response.json();
  },

  getMostPopularMovie: async (page, limit) => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const appToken = import.meta.env.VITE_X_APP_TOKEN;

    const response = await fetch(
      `${backendUrl}/api/movies/most-popular?page=${page}&limit=${limit}`,
      {
        headers: {
          "Content-Type": "application/json",
          "x-app-token": appToken,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Fetch most popular movie failed");
    }

    return response.json();
  },
  getTopRatingMovie: async (page, limit) => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const appToken = import.meta.env.VITE_X_APP_TOKEN;

    const response = await fetch(
      `${backendUrl}/api/movies/top-rated?page=${page}&limit=${limit}`,
      {
        headers: {
          "Content-Type": "application/json",
          "x-app-token": appToken,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Fetch top rating movie failed");
    }

    return response.json();
  },
  getAMovie: async (id) => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const appToken = import.meta.env.VITE_X_APP_TOKEN;

    const response = await fetch(`${backendUrl}/api/movies/${id}`, {
      headers: {
        "Content-Type": "application/json",
        "x-app-token": appToken,
      },
    });

    if (!response.ok) {
      throw new Error("Fetch movie failed");
    }

    return response.json();
  },
  getMovieReview: async (movieId, page, limit) => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const appToken = import.meta.env.VITE_X_APP_TOKEN;

    const response = await fetch(
      `${backendUrl}/api/movies/${movieId}/review?page=${page}&limit=${limit}&sort=newest`,
      {
        headers: {
          "Content-Type": "application/json",
          "x-app-token": appToken,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Fetch review movie failed");
    }

    return response.json();
  },
};

export default apiMovie;
