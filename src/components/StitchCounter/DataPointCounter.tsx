import React from "react";
import { ChevronUp, ChevronDown, RotateCcw } from "lucide-react";
import { Button } from "../ui/button";
import {
  useSelectedSectionID,
  useSelectedProject,
  useProjects,
} from "../../hooks/useProjects";

export type DataPointKey = "stitches" | "rows" | "repeats";

interface DataPointCounterProps {
  dataKey: DataPointKey;
  label: string;
}

export const DataPointCounter: React.FC<DataPointCounterProps> = ({
  dataKey,
  label,
}) => {
  const selectedSectionID = useSelectedSectionID();
  const project = useSelectedProject();
  const updateSelectedProject = useProjects(
    (state) => state.updateSelectedProject,
  );

  if (!project || !selectedSectionID) return null;

  const value = project.data.sections[selectedSectionID]?.data[dataKey] ?? 0;

  const setValue = (newValue: number) => {
    updateSelectedProject("data", (data) => {
      const section = data.sections[selectedSectionID];
      if (!section) return data;
      return {
        ...data,
        sections: {
          ...data.sections,
          [selectedSectionID]: {
            ...section,
            data: {
              ...section.data,
              [dataKey]: newValue,
            },
          },
        },
      };
    });
    // Mark interaction for timer auto-off/reminder logic
    if (
      typeof window !== "undefined" &&
      typeof (window as any).__stitchCounterMarkInteraction === "function"
    ) {
      (window as any).__stitchCounterMarkInteraction();
    }
  };

  return (
    <div className="flex items-center w-full gap-2">
      {/* Label left */}
      <span className="text-sm font-medium flex-shrink-0 w-16 text-left">
        {label}
      </span>
      {/* Center group: up, value, down */}
      <div className="flex items-center justify-center flex-1 gap-1">
        <Button
          size="icon"
          variant="ghost"
          aria-label={`Decrement ${label}`}
          onClick={() => setValue(Math.max(0, value - 1))}
          disabled={value <= 0}
        >
          <ChevronDown />
        </Button>
        <span className="w-10 text-center tabular-nums text-base">{value}</span>
        <Button
          size="icon"
          variant="ghost"
          aria-label={`Increment ${label}`}
          onClick={() => setValue(value + 1)}
        >
          <ChevronUp />
        </Button>
      </div>
      {/* Reset right */}
      <Button
        size="icon"
        variant="ghost"
        aria-label={`Reset ${label}`}
        onClick={() => setValue(0)}
        disabled={value === 0}
        className="ml-auto"
      >
        <RotateCcw />
      </Button>
    </div>
  );
};
