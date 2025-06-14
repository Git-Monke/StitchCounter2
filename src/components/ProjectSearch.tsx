import { useState } from "react";
import { Search, X } from "lucide-react";
import { SidebarMenuButton, useSidebar } from "./ui/sidebar";
import { Input } from "./ui/input";

interface ProjectSearchProps {
  onSearch: (query: string) => void;
}

export function ProjectSearch({ onSearch }: ProjectSearchProps) {
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { setOpen, state } = useSidebar();

  const handleStartSearch = () => {
    setOpen(true);
    setIsSearching(true);
  };

  const handleStopSearch = () => {
    setIsSearching(false);
    setSearchQuery("");
    onSearch("");
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query);
  };

  if (isSearching && state === "expanded") {
    return (
      <div className="flex items-center gap-2 px-2">
        <Input
          placeholder="Search projects..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="h-8"
          autoFocus
        />
        <button
          onClick={handleStopSearch}
          className="p-1 hover:bg-accent rounded-md"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <SidebarMenuButton asChild onClick={handleStartSearch}>
      <div>
        <Search />
        {state === "expanded" && <span>Search Projects</span>}
      </div>
    </SidebarMenuButton>
  );
}
