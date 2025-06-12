import "./App.css";

import { ProjectsProvider, useProjects } from "./hooks/useProjects";
import { SidebarProvider } from "./components/ui/sidebar";
import { AppSidebar } from "./components/AppSidebar";
import { ArrowLeft } from "lucide-react";
import { AppHeader } from "./components/AppHeader";

const AppContent = () => {
  const { selectedProject } = useProjects();
  console.log(selectedProject);

  return (
    <div className="w-full min-h-screen flex flex-col relative">
      {selectedProject == null && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-2">
          <span className="opacity-50">
            Select or create a project to begin!
          </span>
          <ArrowLeft className="opacity-50"></ArrowLeft>
        </div>
      )}
    </div>
  );
};

function App() {
  return (
    <ProjectsProvider>
      <SidebarProvider>
        <AppSidebar />
        <AppHeader />
        <AppContent />
      </SidebarProvider>
    </ProjectsProvider>
  );
}

export default App;
