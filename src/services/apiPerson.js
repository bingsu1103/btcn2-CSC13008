const apiPerson = {
  getPerson: async (id) => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const appToken = import.meta.env.VITE_X_APP_TOKEN;

    const response = await fetch(`${backendUrl}/api/persons/${id}`, {
      headers: {
        "Content-Type": "application/json",
        "x-app-token": appToken,
      },
    });

    if (!response.ok) {
      throw new Error("Fetch person failed");
    }

    return response.json();
  },
};

export default apiPerson;
