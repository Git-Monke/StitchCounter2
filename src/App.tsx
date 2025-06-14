import "./App.css";

import { useSelectedProjectName } from "./hooks/useProjects";
import { SidebarProvider } from "./components/ui/sidebar";
import { AppSidebar } from "./components/AppSidebar";
import { ArrowLeft } from "lucide-react";
import { AppHeader } from "./components/AppHeader";
import { ProjectOverview } from "./components/ProjectOverview";
import { CounterSettings } from "./components/CounterSettings";
import { TimerSettings } from "./components/TimerSettings";

const AppContent = () => {
  const projectName = useSelectedProjectName();

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
        <div className="p-8 px-16 grid grid-rows-[auto_1fr] gap-8">
          <div className="flex-1 flex flex-col gap-8">
            <ProjectOverview />
            <h3 className="text-sm font-medium text-muted-foreground">
              Project Settings
            </h3>
            <div className="grid grid-cols-2 gap-6">
              <CounterSettings />
              <TimerSettings />
            </div>
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
