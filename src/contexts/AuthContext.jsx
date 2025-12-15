import { createContext, useContext, useEffect, useState } from "react";
import apiAuth from "@/services/apiAuth";

const AuthContext = createContext(null);

export const AuthContextProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  useEffect(() => {
    const fetchAccount = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) {
          setIsAuthLoading(false);
          return;
        }

        const res = await apiAuth.fetch();
        if (res) {
          setUser(res);
          setIsAuthenticated(true);
        }
      } catch (e) {
        localStorage.removeItem("accessToken");
      } finally {
        setIsAuthLoading(false);
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
        isAuthLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthContextProvider");
  return ctx;
};
