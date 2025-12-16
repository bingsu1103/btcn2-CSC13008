const apiUser = {
  updateUser: async (payload) => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const appToken = import.meta.env.VITE_X_APP_TOKEN;
    const accessToken = localStorage.getItem("accessToken");

    const response = await fetch(`${backendUrl}/api/users/profile`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "x-app-token": appToken,
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error("Updated user failed");
    }

    return response.json();
  },
};

export default apiUser;
