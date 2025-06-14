import { useProjects, useSelectedProjectName } from "@/hooks/useProjects";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "./ui/dropdown-menu";
import { Check, Settings, PaintBucket, Pencil, Trash, X } from "lucide-react";

import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { HexColorPicker } from "react-colorful";

const ColorPickerPopover = () => {
  const { updateSelectedProject } = useProjects();
  const selectedColor = useProjects(
    (state) => state.projects[state.selectedProjectID]?.color ?? "#000000",
  );

  return (
    <Popover modal>
      <PopoverTrigger asChild>
        <DropdownMenuItem
          onSelect={(e) => {
            e.preventDefault();
          }}
        >
          <PaintBucket className="mr-2" />
          Change Color
        </DropdownMenuItem>
      </PopoverTrigger>
      <PopoverContent className="flex">
        <HexColorPicker
          color={selectedColor}
          onChange={(newHex) => {
            updateSelectedProject("color", () => newHex);
          }}
          className="flex-1"
        />
      </PopoverContent>
    </Popover>
  );
};

export const AppHeader = () => {
  const { renameProject, deleteProject, selectedProjectID } = useProjects();
  const projectName = useSelectedProjectName();
  const projectColor = useProjects(
    (state) => state.projects[state.selectedProjectID]?.color,
  );

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
    if (!nameIsValid(newProjectName)) {
      return;
    }

    renameProject(selectedProjectID, newProjectName);
    setNewProjectName("");
    setRenamingProject(false);
  };

  return (
    <>
      {projectName != null && (
        <div className="h-16 flex items-end px-16 w-full justify-between">
          {!renamingProject && (
            <div className="flex items-center">
              <div
                className="w-3 h-3 rounded-full mr-3"
                style={{
                  backgroundColor: projectColor,
                }}
              />
              <span className="mr-2">
                {projectName || "No project selected"}
              </span>
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

          {!renamingProject && (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Settings className="w-5 h-5" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                {/* Rename */}
                <DropdownMenuItem
                  onClick={() => {
                    setRenamingProject(true);
                  }}
                >
                  <Pencil></Pencil>
                  Rename
                </DropdownMenuItem>

                {/* Change Color */}
                <ColorPickerPopover />

                {/* Delete */}
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
          )}
        </div>
      )}
    </>
  );
};
