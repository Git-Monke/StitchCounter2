import { useState, useMemo } from "react";
import { Card } from "./ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X } from "lucide-react";
import { SidebarMenuButton } from "./ui/sidebar";
import { Input } from "./ui/input";
import { useProjects } from "../hooks/useProjects";
import Fuse from "fuse.js";

interface ProjectSearchProps {
  onSearch: (query: string) => void;
}

export function ProjectSearch({ onSearch }: ProjectSearchProps) {
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const projects = useProjects((state) => state.projects);
  const setSelectedProjectID = useProjects(
    (state) => state.setSelectedProjectID
  );

  // Create searchable array of projects
  const searchableProjects = useMemo(() => {
    return Object.entries(projects).map(([id, project]) => ({
      id,
      name: project.name,
      color: project.color,
    }));
  }, [projects]);

  // Initialize Fuse instance
  const fuse = useMemo(() => {
    return new Fuse(searchableProjects, {
      keys: ["name"],
      threshold: 0.3,
    });
  }, [searchableProjects]);

  // Get search results
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    return fuse.search(searchQuery).map((result) => result.item);
  }, [fuse, searchQuery]);

  const handleProjectSelect = (projectId: string) => {
    setSelectedProjectID(projectId);
    setIsSearching(false);
    setSearchQuery("");
    onSearch("");
  };

  const handleStartSearch = () => {
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

  if (isSearching) {
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
        <span>Search Projects</span>
      </div>
    </SidebarMenuButton>
  );
}
