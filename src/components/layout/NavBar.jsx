import { House } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import apiAuth from "@/services/apiAuth";
import { toast } from "sonner";

const NavBar = () => {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (!keyword.trim()) return;
    navigate(`/movies?query=${encodeURIComponent(keyword)}&page=1`);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

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
  const { isAuthenticated, setIsAuthenticated, setUser } = useAuth();

  return (
    <div className="flex items-center justify-between p-2 bg-nav mt-2 rounded-xs border-2">
      <Link to="/">
        <House />
      </Link>

      <div className="flex gap-2">
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
          <Button
            onClick={() => handleLogOut()}
            variant="outline"
            size="sm"
            className="bg-transparent text-green-400 border border-green-400 cursor-pointer"
          >
            Logout
          </Button>
        )}
        <Input
          className="w-60 bg-background"
          placeholder="Search movie..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Button
          variant="outline"
          className="border-green-400 text-green-400 cursor-pointer"
          onClick={handleSearch}
        >
          Search
        </Button>
      </div>
    </div>
  );
};

export default NavBar;
