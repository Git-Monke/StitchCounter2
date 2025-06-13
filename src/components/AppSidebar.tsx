import { useProjects, type Project } from "@/hooks/useProjects";
import {
  Sidebar,
  SidebarContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarGroup,
  SidebarGroupContent,
  SidebarTrigger,
  SidebarMenuItem,
  SidebarMenu,
  SidebarMenuButton,
  useSidebar,
} from "./ui/sidebar";
import { Separator } from "./ui/separator";
import { PlusIcon, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const ONE_WEEK = 1000 * 60 * 60 * 24 * 7;

const SidebarBullet = ({ projectID }: { projectID: string }) => {
  const { state } = useSidebar();
  const { selectedProjectID, setSelectedProjectID } = useProjects();

  const projectName = useProjects((state) => state.projects[projectID].name);
  const projectColor = useProjects((state) => state.projects[projectID].color);

  return (
    <AnimatePresence initial={false}>
      {state == "expanded" && (
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -10 }}
          transition={{ duration: 0.2 }}
        >
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              onClick={() => {
                setSelectedProjectID(projectID);
              }}
              className={
                selectedProjectID == projectID ? `bg-sidebar-accent` : ``
              }
            >
              <div>
                <div
                  className="w-2 h-2 rounded-full"
                  style={{
                    backgroundColor: projectColor,
                    border: "1px solid rgba(0, 0, 0, 0.1)",
                  }}
                />
                <span>{projectName}</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const AppSidebar = () => {
  const { projects, createNewProject } = useProjects();

  const recentProjects = Object.entries(projects)
    .filter(([_key, project]) => Date.now() - project.lastModified < ONE_WEEK)
    .sort((a, b) => b[1].lastModified - a[1].lastModified);

  const oldProjects = Object.entries(projects)
    .filter(([_key, project]) => Date.now() - project.lastModified >= ONE_WEEK)
    .sort((a, b) => b[1].lastModified - a[1].lastModified);

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="flex flex-row ^group-data-[collapsible=icon]:gap-2">
        <SidebarTrigger />
        <Separator
          orientation="vertical"
          className="h-2 group-data-[collapsible=icon]:hidden"
        />
        <div className="group-data-[collapsible=icon]:hidden overflow-hidden">
          <h2 className="font-semibold truncate overflow-hidden whitespace-nowrap">
            Loop Log!
          </h2>
        </div>
      </SidebarHeader>
      <SidebarContent>
        {/* Actions */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild onClick={createNewProject}>
                  <div>
                    <PlusIcon></PlusIcon>
                    <span>New Project</span>
                  </div>
                </SidebarMenuButton>

                <SidebarMenuButton asChild>
                  <div>
                    <Search></Search>
                    <span>Search Projects</span>
                  </div>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Recent Projects */}
        <SidebarGroup>
          <SidebarGroupLabel>Recent Projects</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {recentProjects.length > 0 &&
                recentProjects.map(([key, _]) => (
                  <SidebarBullet projectID={key} key={key} />
                ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/*  Old Projects */}
        <SidebarGroup>
          <SidebarGroupLabel>Old Projects</SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {oldProjects.length > 0 &&
                oldProjects.map(([key, _]) => (
                  <SidebarBullet projectID={key} key={key} />
                ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};
