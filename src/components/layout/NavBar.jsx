import { House } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

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

  return (
    <div className="flex items-center justify-between p-2 bg-nav mt-2 rounded-xs border-2">
      <Link to="/">
        <House />
      </Link>

      <div className="flex gap-2">
        <Input
          className="w-60 bg-background"
          placeholder="Search movie..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Button
          variant="outline"
          className="border-green-400 text-green-400"
          onClick={handleSearch}
        >
          Search
        </Button>
      </div>
    </div>
  );
};

export default NavBar;
