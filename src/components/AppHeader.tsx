import { useProjects } from "@/hooks/useProjects";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "./ui/dropdown-menu";
import { ChevronDown, Pencil, Trash } from "lucide-react";

export const AppHeader = () => {
  const { selectedProject, renameProject, deleteProject } = useProjects();

  return (
    <>
      {selectedProject != null && (
        <div className="h-16 flex items-end px-16 w-full">
          <div className="flex gap-2 items-center">
            <span>{selectedProject?.name || "No project selected"}</span>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <ChevronDown></ChevronDown>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>
                  <Pencil></Pencil>
                  Rename
                </DropdownMenuItem>

                <DropdownMenuItem>
                  <Trash></Trash>
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      )}
    </>
  );
};
