import { House } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const NavBar = () => {
  return (
    <div className="flex items-center justify-between p-2 bg-[#D3E1FC] mt-2">
      <House />
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
