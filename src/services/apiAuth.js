const apiAuth = {
  register: async (payload) => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const appToken = import.meta.env.VITE_X_APP_TOKEN;

    const response = await fetch(`${backendUrl}/api/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-app-token": appToken,
      },
      body: JSON.stringify({
        username: payload.username,
        email: payload.email,
        password: payload.password,
        phone: payload.phone,
        dob: payload.dob,
      }),
    });

    if (!response.ok) {
      throw new Error("Register failed");
    }

    return response.json();
  },
  login: async (payload) => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const appToken = import.meta.env.VITE_X_APP_TOKEN;

    const response = await fetch(`${backendUrl}/api/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-app-token": appToken,
      },
      body: JSON.stringify({
        username: payload.username,
        password: payload.password,
      }),
    });

    if (!response.ok) {
      throw new Error("Login failed");
    }

    return response.json();
  },
  fetch: async () => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const appToken = import.meta.env.VITE_X_APP_TOKEN;

    const accessToken = localStorage.getItem("accessToken");

    const response = await fetch(`${backendUrl}/api/users/profile`, {
      headers: {
        "Content-Type": "application/json",
        "x-app-token": appToken,
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error("Fetch account failed");
    }

    return response.json();
  },
};

export default apiAuth;
