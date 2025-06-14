import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarTrigger,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar,
} from "../ui/sidebar";
import { Separator } from "../ui/separator";
import {
  useSelectedProject,
  useSelectedSectionID,
  useProjects,
  useSelectedProjectID,
} from "../../hooks/useProjects";
import { PlusIcon } from "lucide-react";

/**
 * Sidebar for selecting sections within the StitchCounter popup.
 * Uses Zustand for state management and shadcn/ui for UI primitives.
 */
export const StitchCounterSidebar: React.FC = () => {
  const project = useSelectedProject();
  const selectedProjectID = useSelectedProjectID();
  const selectedSectionID = useSelectedSectionID();
  const setSelectedSection = useProjects((state) => state.setSelectedSection);
  const addSectionToProject = useProjects((state) => state.addSectionToProject);
  const { toggleSidebar } = useSidebar();

  if (!project) {
    return null;
  }

  const sectionEntries = Object.entries(project.data.sections);

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="flex flex-row ^group-data-[collapsible=icon]:gap-2">
        <SidebarTrigger />
        <Separator orientation="vertical" className="h-2" />
        <div className="group-data-[collapsible=icon]:hidden overflow-hidden">
          <h2 className="font-semibold truncate overflow-hidden whitespace-nowrap">
            Select Section
          </h2>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Sections</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {sectionEntries.map(([sectionID, section]) => (
                <SidebarMenuItem key={sectionID}>
                  <SidebarMenuButton
                    onClick={() => {
                      if (sectionID !== selectedSectionID) {
                        setSelectedSection(selectedProjectID, sectionID);
                        toggleSidebar();
                      }
                    }}
                    className={
                      selectedSectionID === sectionID ? "bg-sidebar-accent" : ""
                    }
                  >
                    <span>{section.name}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => {
                    addSectionToProject(selectedProjectID);
                    toggleSidebar();
                  }}
                  className="flex items-center gap-2"
                >
                  <PlusIcon className="w-4 h-4" />
                  Add Section
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};
