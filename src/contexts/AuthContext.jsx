import { createContext, useContext, useEffect, useState } from "react";
import apiAuth from "@/services/apiAuth";

const AuthContext = createContext(null);

export const AuthContextProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchAccount = async () => {
      const res = await apiAuth.fetch();
      if (res.user) {
        setUser(res.user);
        setIsAuthenticated(true);
      }
    };
    fetchAccount();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        user,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthContextProvider");
  }
  return context;
};
