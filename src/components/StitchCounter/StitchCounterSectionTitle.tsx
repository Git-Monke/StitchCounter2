import React, { useState, useRef, useEffect } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Pencil, Check, X } from "lucide-react";
import {
  useSelectedProject,
  useSelectedSectionID,
  useProjects,
  useSelectedProjectID,
} from "../../hooks/useProjects";

/**
 * Displays and allows editing of the current section's name.
 * Uses Zustand hooks internally for state management.
 */
export const StitchCounterSectionTitle: React.FC = () => {
  const project = useSelectedProject();
  const selectedSectionID = useSelectedSectionID();
  const selectedProjectID = useSelectedProjectID();
  const renameSection = useProjects((state) => state.renameSection);

  const [editing, setEditing] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // Autofocus input when editing starts
  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [editing]);

  // Cancel editing on blur
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    // Only cancel if focus moves outside the input and the buttons
    if (
      e.relatedTarget &&
      (e.relatedTarget as HTMLElement).dataset.action === "check"
    ) {
      return;
    }
    setEditing(false);
    setInputValue("");
  };

  // Submit the name change
  const handleSubmit = () => {
    if (
      project &&
      selectedSectionID &&
      inputValue.trim() &&
      inputValue !== project.data.sections[selectedSectionID]?.name
    ) {
      renameSection(selectedProjectID, selectedSectionID, inputValue.trim());
    }
    setEditing(false);
    setInputValue("");
  };

  // Cancel editing
  const handleCancel = () => {
    setEditing(false);
    setInputValue("");
  };

  const sectionName =
    selectedSectionID && project.data.sections[selectedSectionID]
      ? project.data.sections[selectedSectionID].name
      : "No section selected";

  return (
    <div className="flex items-center gap-1 min-w-0 truncate">
      {editing ? (
        <>
          <Input
            ref={inputRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onBlur={handleBlur}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSubmit();
              } else if (e.key === "Escape") {
                handleCancel();
              }
            }}
            className="truncate text-base h-8 px-2 py-1 w-auto max-w-[8rem] sm:max-w-[12rem]"
            style={{ fontSize: "inherit" }}
          />
          <Button
            type="button"
            data-action="check"
            size="icon"
            variant="ghost"
            className="ml-1 text-green-600 hover:text-green-800 flex-shrink-0"
            onClick={handleSubmit}
            tabIndex={0}
          >
            <Check size={18} />
          </Button>
          <Button
            type="button"
            size="icon"
            variant="ghost"
            className="ml-1 text-red-600 hover:text-red-800 flex-shrink-0"
            onClick={handleCancel}
            tabIndex={0}
          >
            <X size={18} />
          </Button>
        </>
      ) : (
        <>
          <span className="truncate">{sectionName}</span>
          {selectedSectionID && (
            <Button
              type="button"
              size="icon"
              variant="ghost"
              className="ml-1 text-muted-foreground hover:text-primary flex-shrink-0"
              aria-label="Edit section name"
              onClick={() => {
                setEditing(true);
                setInputValue(sectionName);
              }}
            >
              <Pencil size={18} />
            </Button>
          )}
        </>
      )}
    </div>
  );
};
