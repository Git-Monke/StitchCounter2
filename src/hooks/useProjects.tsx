import { create } from "zustand";
import { subscribeWithSelector, persist } from "zustand/middleware";
import { exampleProjects, templateProject } from "./projectTemplates";

interface StitchTypes {
  stitches: number;
  rows: number;
  repeats: number;
  time: number;
}

interface Section {
  name: string;
  notes: string[];
  data: StitchTypes;
}

interface ProjectData {
  sections: Record<string, Section>;
}

interface ProjectOptions {
  counterOptions: {
    stitches: boolean;
    rows: boolean;
    repeats: boolean;
    time: boolean;
  };
  timerOptions: {
    remindTurnOn: boolean;
    autoTurnOff: boolean;
    remindTurnOnDelay: number;
    autoTurnOffDelay: number;
  };
}

export interface Project {
  options: ProjectOptions;
  data: ProjectData;
  name: string;
  color: string;
  lastModified: number;
}

interface ProjectStore {
  // Base state
  projects: Record<string, Project>;
  selectedProjectID: string;

  // Actions
  setSelectedProjectID: (newProject: string) => void;
  createNewProject: () => void;
  deleteProject: (projectID: string) => void;
  renameProject: (projectID: string, newName: string) => void;
  updateSelectedProject: <K extends keyof Project>(
    key: K,
    updateFunc: (data: Project[K]) => Project[K],
  ) => void;
}

const randomID = () => Math.random().toString(36).slice(2, 11);

export const useProjects = create<ProjectStore>()(
  subscribeWithSelector(
    persist(
      (set, get) => ({
        // Initial state
        projects: exampleProjects,
        selectedProjectID: "",

        // Actions
        setSelectedProjectID: (newProject) => {
          set({ selectedProjectID: newProject });
        },

        createNewProject: () => {
          const projectID = randomID();
          const newProject: Project = { ...templateProject };

          set((state) => ({
            projects: {
              ...state.projects,
              [projectID]: newProject,
            },
            selectedProjectID: projectID,
          }));
        },

        deleteProject: (projectID) => {
          set((state) => {
            const newProjects = { ...state.projects };
            delete newProjects[projectID];

            // Clear selection if we're deleting the selected project
            const newState: Partial<ProjectStore> = { projects: newProjects };
            if (state.selectedProjectID === projectID) {
              newState.selectedProjectID = "";
            }

            return newState;
          });
        },

        renameProject: (projectID, newName) => {
          set((state) => ({
            projects: {
              ...state.projects,
              [projectID]: {
                ...state.projects[projectID],
                name: newName,
                lastModified: Date.now(),
              },
            },
          }));
        },

        updateSelectedProject: (key, updateFunc) => {
          set((state) => {
            const selectedProjectID = state.selectedProjectID;
            if (!selectedProjectID) return state;

            const updatedProject = {
              ...state.projects[selectedProjectID],
              [key]: updateFunc(state.projects[selectedProjectID][key]),
              lastModified: Date.now(),
            };

            return {
              projects: {
                ...state.projects,
                [selectedProjectID]: updatedProject,
              },
            };
          });
        },
      }),
      {
        name: "stitch-counter-storage",
        partialize: (state) => ({
          projects: state.projects,
          selectedProjectID: state.selectedProjectID,
        }),
      },
    ),
  ),
);

// Selector helpers
export const useSelectedProject = () =>
  useProjects((state) => state.projects[state.selectedProjectID] || null);

export const createSelectedProjectSelector =
  <K extends keyof Project>(key: K) =>
  (state: ProjectStore) =>
    state.projects[state.selectedProjectID]?.[key];

// Common selectors
export const useSelectedProjectOption = <K extends keyof Project["options"]>(
  optionType: K,
  prop: keyof Project["options"][K],
) => {
  return useProjects(
    (state) =>
      state.projects[state.selectedProjectID]?.options[optionType][prop],
  );
};

export const useSelectedProjectName = () => {
  return useProjects((state) => state.projects[state.selectedProjectID]?.name);
};
