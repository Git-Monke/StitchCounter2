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
  compact?: boolean;
}

export const DataPointCounter: React.FC<DataPointCounterProps> = ({
  dataKey,
  label,
  compact = false,
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
    <div
      className={`flex ${
        compact ? "items-center justify-between" : "flex-col"
      } py-2 px-3 rounded-lg bg-primary/5 border border-primary/10`}
    >
      <span
        className={`${compact ? "text-sm mr-2" : "text-xs text-muted-foreground leading-none"}`}
      >
        {label}:
      </span>
      <div className="flex items-center gap-2">
        <span className="text-base font-medium tabular-nums">{value}</span>
        <div className={`flex items-center gap-1 ${compact ? "" : "ml-auto"}`}>
          <Button
            size="icon"
            variant="ghost"
            className="h-8 w-8"
            aria-label={`Decrement ${label}`}
            onClick={() => setValue(Math.max(0, value - 1))}
            disabled={value <= 0}
          >
            <ChevronDown className="h-4 w-4" />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            className="h-8 w-8"
            aria-label={`Increment ${label}`}
            onClick={() => setValue(value + 1)}
          >
            <ChevronUp className="h-4 w-4" />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            className="h-8 w-8"
            aria-label={`Reset ${label}`}
            onClick={() => setValue(0)}
            disabled={value === 0}
          >
            <RotateCcw className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
