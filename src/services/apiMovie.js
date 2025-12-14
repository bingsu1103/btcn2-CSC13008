const apiMovie = {
  fetchAllMovie: async (page = 1, limit = 10) => {
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

  getMostPopularMovie: async (page = 1, limit = 10) => {
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
};

export default apiMovie;
