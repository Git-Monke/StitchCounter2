import { useProjects, useSelectedProjectName } from "@/hooks/useProjects";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "./ui/dropdown-menu";
import {
  Check,
  ChevronDown,
  PaintBucket,
  Pencil,
  Trash,
  X,
} from "lucide-react";

import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

export const AppHeader = () => {
  const { renameProject, deleteProject, selectedProjectID } = useProjects();
  const projectName = useSelectedProjectName();

  const [renamingProject, setRenamingProject] = useState(false);
  const [newProjectName, setNewProjectName] = useState("");

  const exitRename = () => {
    setNewProjectName("");
    setRenamingProject(false);
  };

  const nameIsValid = (name: string): boolean => {
    return name != "";
  };

  const handleRename = () => {
    if (!nameIsValid) {
      return;
    }

    renameProject(selectedProjectID, newProjectName);
    setNewProjectName("");
    setRenamingProject(false);
  };

  return (
    <>
      {projectName != null && (
        <div className="h-16 flex items-end px-16 w-full">
          {!renamingProject && (
            <div className="flex gap-2 items-center">
              <span>{projectName || "No project selected"}</span>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <ChevronDown></ChevronDown>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem
                    onClick={() => {
                      setRenamingProject(true);
                    }}
                  >
                    <Pencil></Pencil>
                    Rename
                  </DropdownMenuItem>

                  <DropdownMenuItem>
                    <PaintBucket></PaintBucket>
                    Change Color
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    variant="destructive"
                    onClick={() => {
                      deleteProject(selectedProjectID);
                    }}
                  >
                    <Trash></Trash>
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}
          {renamingProject && (
            <div className="flex gap-2 items-center">
              <Input
                placeholder="New name..."
                onBlur={exitRename}
                autoFocus={true}
                onKeyDown={(e) => {
                  if (e.nativeEvent.key == "Enter") {
                    handleRename();
                  }
                }}
                value={newProjectName}
                onChange={(e) => {
                  setNewProjectName(e.target.value);
                }}
              />

              <Button
                className={`${!nameIsValid(newProjectName) && "opacity-50"}`}
                disabled={!nameIsValid(newProjectName)}
                onMouseDown={(e) => {
                  e.preventDefault();
                  e.stopPropagation();

                  handleRename();
                }}
              >
                <Check></Check>
              </Button>
              <Button variant="destructive" onClick={exitRename}>
                <X></X>
              </Button>
            </div>
          )}
        </div>
      )}
    </>
  );
};
