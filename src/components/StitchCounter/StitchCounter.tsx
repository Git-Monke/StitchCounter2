import { SidebarTrigger } from "../ui/sidebar";
import { Separator } from "../ui/separator";
import { useSelectedProject } from "../../hooks/useProjects";
import { StitchCounterSidebar } from "./StitchCounterSidebar";
import { StitchCounterSectionTitle } from "./StitchCounterSectionTitle";
import { DataPointCounter } from "./DataPointCounter";
import { SectionTimer } from "./SectionTimer";
import { useEffect } from "react";

import { useSelectedProjectName } from "../../hooks/useProjects";
import { Toaster } from "../ui/sonner";

export const StitchCounter: React.FC = () => {
  const project = useSelectedProject();
  const projectName = useSelectedProjectName();

  // Set document title to project name, update dynamically
  useEffect(() => {
    if (projectName) {
      document.title = projectName;
    }
  }, [projectName]);

  if (!project) {
    return <div className="p-4">No project selected.</div>;
  }

  return (
    <div className="flex h-screen w-full">
      <StitchCounterSidebar />
      <div className="flex-1 p-4">
        {/* Main stitch counter content goes here */}
        <div className="flex items-center mb-4 gap-1 min-w-0">
          <SidebarTrigger />
          <Separator orientation="vertical" className="h-4 mx-1" />
          <h2 className="text-lg font-bold flex items-center gap-1 min-w-0 truncate">
            <StitchCounterSectionTitle />
          </h2>
        </div>
        <div className="flex flex-col gap-4 w-full">
          <div className="flex flex-col gap-4 w-full max-w-xs mx-auto">
            {project.options?.counterOptions?.stitches && (
              <DataPointCounter dataKey="stitches" label="Stitches" />
            )}
            {project.options?.counterOptions?.rows && (
              <DataPointCounter dataKey="rows" label="Rows" />
            )}
            {project.options?.counterOptions?.repeats && (
              <DataPointCounter dataKey="repeats" label="Repeats" />
            )}
            {project.options?.counterOptions?.time && <SectionTimer />}
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default StitchCounter;
