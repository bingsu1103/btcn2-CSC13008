import { Switch } from "@/components/ui/switch";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/contexts/ThemeContext";
import apiAuth from "@/services/apiAuth";
import { Moon, Sun } from "lucide-react";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { theme, setTheme } = useTheme();
  const { user, isAuthenticated, setIsAuthenticated, setUser } = useAuth();
  const navigate = useNavigate();
  const handleLogOut = async () => {
    try {
      await apiAuth.logout();
      toast.success("Log out successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Logout failed, logged out locally");
    } finally {
      localStorage.removeItem("accessToken");
      setIsAuthenticated(false);
      setUser(null);
    }
  };
  return (
    <div className="flex justify-between bg-header p-3 rounded-xs border-2">
      <span>23120205</span>
      <h1 className="font-bold">Movies info</h1>
      <div className="flex gap-2 items-center">
        {!isAuthenticated ? (
          <>
            <Button
              onClick={() => navigate("/login")}
              variant="outline"
              size="sm"
              className="bg-transparent text-green-400 border border-green-400 cursor-pointer"
            >
              Login
            </Button>
            <Button
              onClick={() => navigate("/register")}
              variant="outline"
              size="sm"
              className="bg-transparent text-green-400 border border-green-400 cursor-pointer"
            >
              Register
            </Button>
          </>
        ) : (
          <div className="flex gap-3 items-center">
            <span>{user.username}</span>
            <Button
              onClick={() => handleLogOut()}
              variant="outline"
              size="sm"
              className="bg-transparent text-green-400 border border-green-400 cursor-pointer"
            >
              Logout
            </Button>
          </div>
        )}
        <Switch
          checked={theme === "dark"}
          onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
        />
        {theme === "dark" ? <Moon /> : <Sun />}
      </div>
    </div>
  );
};
export default Header;
