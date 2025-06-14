import { SidebarTrigger } from "../ui/sidebar";
import { Separator } from "../ui/separator";
import {
  useSelectedProject,
  useProjects,
  useSelectedSectionID,
} from "../../hooks/useProjects";
import { StitchCounterSidebar } from "./StitchCounterSidebar";
import { StitchCounterSectionTitle } from "./StitchCounterSectionTitle";
import { DataPointCounter } from "./DataPointCounter";
import { SectionTimer } from "./SectionTimer";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";

import { useSelectedProjectName } from "../../hooks/useProjects";
import { Toaster } from "../ui/sonner";

export const StitchCounter: React.FC = () => {
  const [isEditingNotes, setIsEditingNotes] = useState(false);
  const [notesDraft, setNotesDraft] = useState("");
  const project = useSelectedProject();
  const projectName = useSelectedProjectName();
  const zustandRehydrate = useProjects.persist.rehydrate;
  const sectionId = useSelectedSectionID();
  const updateSelectedProject = useProjects(
    (state) => state.updateSelectedProject,
  );

  const handleEditNotes = () => {
    if (!sectionId || !project) return;
    setNotesDraft(project.data.sections[sectionId].notes);
    setIsEditingNotes(true);
  };

  const handleSaveNotes = () => {
    if (!sectionId) return;
    updateSelectedProject("data", (data) => ({
      ...data,
      sections: {
        ...data.sections,
        [sectionId]: {
          ...data.sections[sectionId],
          notes: notesDraft,
        },
      },
    }));
    setIsEditingNotes(false);
  };

  const handleCancelNotes = () => {
    setIsEditingNotes(false);
    setNotesDraft("");
  };

  // Set document title to project name, update dynamically
  useEffect(() => {
    if (projectName) {
      document.title = projectName;
    }
  }, [projectName]);

  // --- Real-time cross-window sync logic ---
  // 1. Listen for storage and message events to reload Zustand state
  useEffect(() => {
    const handleSync = () => {
      // Rehydrate Zustand from localStorage
      if (typeof zustandRehydrate === "function") {
        zustandRehydrate();
      }
    };

    const handleMessage = (event: MessageEvent) => {
      if (event.data === "stitch-counter-sync") {
        handleSync();
      }
    };

    window.addEventListener("storage", handleSync);
    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("storage", handleSync);
      window.removeEventListener("message", handleMessage);
    };
  }, [zustandRehydrate]);

  // 2. Send postMessage to opener (main) or popup (child) on relevant updates
  // We'll patch the persist setItem to also send a message
  useEffect(() => {
    // Only patch once
    if ((window as any).__stitchCounterPatched) return;
    (window as any).__stitchCounterPatched = true;

    const origSetItem = window.localStorage.setItem;
    window.localStorage.setItem = function (...args) {
      origSetItem.apply(this, args);
      // Notify the other window (popup or main)
      if (window.opener && !window.opener.closed) {
        window.opener.postMessage("stitch-counter-sync", "*");
      }
      // If this is the main window and popup is open, notify it
      if (
        (window as any).__stitchCounterPopup &&
        !(window as any).__stitchCounterPopup.closed
      ) {
        (window as any).__stitchCounterPopup.postMessage(
          "stitch-counter-sync",
          "*",
        );
      }
    };

    // If this is the main window, track the popup when opened
    const origOpen = window.open;
    window.open = function (...args) {
      const popup = origOpen.apply(this, args);
      (window as any).__stitchCounterPopup = popup;
      return popup;
    };
  }, []);

  if (!project) {
    return <div className="p-4">No project selected.</div>;
  }

  return (
    <div className="flex h-screen w-full">
      <StitchCounterSidebar />
      <div className="flex-1 p-4 flex flex-col">
        {/* Main stitch counter content goes here */}
        <div className="flex items-center gap-1 min-w-0">
          <SidebarTrigger />
          <Separator orientation="vertical" className="h-4 mx-1" />
          <h2 className="text-lg font-bold flex items-center gap-1 min-w-0 truncate">
            <StitchCounterSectionTitle />
          </h2>
        </div>
        <div className="flex flex-col gap-4 w-full flex-1 min-h-0">
          {!isEditingNotes && (
            <div className="flex flex-col gap-4 w-full max-w-xs mx-auto mt-4">
              <div className="flex flex-col gap-4">
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
          )}
          {isEditingNotes ? (
            <div className="flex flex-col gap-4 flex-1 min-h-0 mt-4">
              <Textarea
                value={notesDraft}
                onChange={(e) => setNotesDraft(e.target.value)}
                className="resize-none w-full flex-1 min-h-0"
                placeholder="Enter your notes here..."
                onKeyDown={(e) => {
                  if (e.key === "Enter" && e.shiftKey) {
                    e.preventDefault();
                    handleSaveNotes();
                  }
                }}
                autoFocus={true}
              />
              <div className="flex gap-2 justify-end">
                <Button variant="outline" onClick={handleCancelNotes}>
                  Cancel
                </Button>
                <Button onClick={handleSaveNotes}>Save Notes</Button>
              </div>
            </div>
          ) : (
            <div className="flex justify-end mt-auto">
              <Button onClick={handleEditNotes} variant="outline">
                Edit Notes
              </Button>
            </div>
          )}
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default StitchCounter;
