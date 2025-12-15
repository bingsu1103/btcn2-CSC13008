import { Switch } from "@/components/ui/switch";
import { useTheme } from "@/contexts/ThemeContext";
import { Moon, Sun } from "lucide-react";
import { Button } from "../ui/button";
import { useAuth } from "@/contexts/AuthContext";

const Header = () => {
  const { theme, setTheme } = useTheme();
  const { isAuthenticated } = useAuth();
  return (
    <div className="flex justify-between bg-header p-3 rounded-xs border-2">
      <span>23120205</span>
      <h1 className="font-bold">Movies info</h1>
      <div className="flex gap-2 items-center">
        {!isAuthenticated && (
          <>
            <Button className="cursor-pointer">Login</Button>
            <Button className="cursor-pointer">Register</Button>
          </>
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
