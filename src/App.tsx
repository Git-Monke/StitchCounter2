import "./App.css";

import { useSelectedProjectName } from "./hooks/useProjects";
import { SidebarProvider } from "./components/ui/sidebar";
import { AppSidebar } from "./components/AppSidebar";
import { ArrowLeft } from "lucide-react";
import { AppHeader } from "./components/AppHeader";
import { ProjectOverview } from "./components/ProjectOverview";
import { CounterSettings } from "./components/CounterSettings";
import { TimerSettings } from "./components/TimerSettings";
import { StitchCounter } from "./components/StitchCounter/StitchCounter";
import { Button } from "./components/ui/button";

const AppContent = () => {
  const projectName = useSelectedProjectName();

  const isPopup = window.opener != null;

  if (isPopup) {
    return (
      <SidebarProvider>
        <StitchCounter />
      </SidebarProvider>
    );
  }

  return (
    <div className="w-full min-h-screen flex flex-col relative">
      <AppHeader />

      {projectName == null && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-2">
          <span className="opacity-50">
            Select or create a project to begin!
          </span>
          <ArrowLeft className="opacity-50"></ArrowLeft>
        </div>
      )}

      {projectName != null && (
        <div className="pt-8 px-8 md:px-16 grid grid-rows-[auto_1fr] gap-8 relative">
          <div className="flex-1 flex flex-col gap-8">
            <ProjectOverview />
            <h3 className="text-sm font-medium text-muted-foreground">
              Project Settings
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <CounterSettings />
              <TimerSettings />
            </div>
            <Button
              onClick={() => {
                window.open(
                  window.location.href,
                  "popup",
                  "width=400,height=400,toolbar=no,location=no,status=no,menubar=no,scrollbars=no,resizable=no",
                );
              }}
            >
              Open Counter!
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

function App() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <AppContent />
    </SidebarProvider>
  );
}

export default App;
