import { createContext, useContext, useState, useEffect } from "react";
import { type ReactNode } from "react";
import { exampleProjects, templateProject } from "./projectTemplates";

const PROJECTS_SAVE_KEY = "stitch2ProjectsKey";
const SELECTED_PROJ_SAVE_KEY = "stitch2ProjectsSaveKey";

interface StitchTypes {
  stitches: number;
  rows: number;
  repeats: number;
  time: number;
}

interface Section {
  name: string;
  data: StitchTypes;
}

interface ProjectData {
  sections: Record<string, Section>;
}

interface ProjectOptions {
  counterVisibility: {
    stitches: boolean;
    rows: boolean;
    repeats: boolean;
    time: boolean;
  };
  reminders: {
    remindTurnBackOn: boolean;
    remindTurnOff: boolean;
    remindTurnBackOnWait: number;
    remindTurnOffWait: number;
  };
}

export interface Project {
  options: ProjectOptions;
  data: ProjectData;
  name: string;
  color: string;
  lastModified: number;
}

interface ProjectsContextProps {
  projects: Record<string, Project>;
  selectedProjectID: string;
  setSelectedProjectID: (newProject: string) => void;
  selectedProject: Project | null;
  createNewProject: () => void;
  deleteProject: (projectID: string) => void;
  renameProject: (projectID: string, newName: string) => void;
}

const ProjectsContext = createContext<ProjectsContextProps | null>(null);

const randomID = () => Math.random().toString(36).slice(2, 11);

export const ProjectsProvider = ({ children }: { children: ReactNode }) => {
  const [projects, setProjects] =
    useState<Record<string, Project>>(exampleProjects);
  const [selectedProjectID, setSelectedProjectID] = useState<string>("");

  const selectedProject = projects[selectedProjectID];

  // Load existing data from localstorage
  useEffect(() => {
    const projects = localStorage.getItem(PROJECTS_SAVE_KEY);
    const selectedProject = localStorage.getItem(SELECTED_PROJ_SAVE_KEY);

    if (projects) {
      setProjects(JSON.parse(projects));
    } else {
      setProjects(exampleProjects);
    }

    if (selectedProject) {
      setSelectedProject(selectedProject);
    }
  }, []);

  // Creates a new project with template data and sets that as the currently selected project
  const createNewProject = () => {
    const projectID = randomID();

    setProjects((projects) => {
      const newProject: Project = { ...templateProject };

      return {
        ...projects,
        [projectID]: newProject,
      };
    });

    setSelectedProjectID(projectID);
  };

  const deleteProject = (projectID: string) => {
    setProjects((projects) => {
      const projectsClone = { ...projects };
      delete projectsClone[projectID];

      if (projectID == selectedProjectID) {
        setSelectedProjectID(Object.keys(projects)[0] || "");
      }

      return projectsClone;
    });
  };

  const renameProject = (projectID: string, newName: string) => {
    setProjects((projects) => {
      return {
        ...projects,
        [projectID]: {
          ...projects[projectID],
          name: newName,
        },
      };
    });
  };

  const value = {
    projects,
    selectedProjectID,
    setSelectedProjectID,
    selectedProject,
    createNewProject,
    deleteProject,
    renameProject,
  };

  return (
    <ProjectsContext.Provider value={value}>
      {children}
    </ProjectsContext.Provider>
  );
};

export const useProjects = () => {
  const context = useContext(ProjectsContext);
  if (!context) {
    throw new Error(
      "Projects context can only be used inside a ProjectProvider",
    );
  }

  return context;
};
