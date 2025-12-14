import { Switch } from "@/components/ui/switch";
import { useTheme } from "@/contexts/ThemeContext";

const Header = () => {
  const { theme, setTheme } = useTheme();
  return (
    <div className="flex justify-between bg-[#F1DBDB] p-3">
      <span>23120205</span>
      <h1 className="font-bold">Movies info</h1>
      <div>
        <Switch
          checked={theme === "dark"}
          onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
        />
      </div>
    </div>
  );
};
export default Header;
