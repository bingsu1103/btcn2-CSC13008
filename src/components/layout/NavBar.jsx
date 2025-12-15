import { House } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div className="flex items-center justify-between p-2 bg-nav mt-2 rounded-xs border-2">
      <Link to="/">
        <House />
      </Link>
      <div className="flex gap-2">
        <Input
          className="w-60 bg-background"
          placeholder="Search"
          type="text"
        />
        <Button className="bg-transparent border-green-400 border text-green-400 cursor-pointer">
          Search
        </Button>
      </div>
    </div>
  );
};
export default NavBar;
