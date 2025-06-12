import { type Project } from "./useProjects";

export const exampleProjects: Record<string, Project> = {
  scarf: {
    name: "Cozy Winter Scarf",
    color: "#D97706",
    lastModified: Date.now() - 100,
    options: {
      counterVisibility: {
        stitches: true,
        rows: true,
        repeats: false,
        time: true,
      },
      reminders: {
        remindTurnBackOn: true,
        remindTurnOff: false,
        remindTurnBackOnWait: 15,
        remindTurnOffWait: 0,
      },
    },
    data: {
      sections: {
        main: {
          name: "Main Body",
          data: {
            stitches: 30,
            rows: 120,
            repeats: 10,
            time: 360,
          },
        },
      },
    },
  },
  tankTop: {
    lastModified: Date.now() - 86400000,
    name: "Summer Tank Top",
    color: "#10B981",
    options: {
      counterVisibility: {
        stitches: true,
        rows: false,
        repeats: true,
        time: false,
      },
      reminders: {
        remindTurnBackOn: false,
        remindTurnOff: true,
        remindTurnBackOnWait: 0,
        remindTurnOffWait: 10,
      },
    },
    data: {
      sections: {
        front: {
          name: "Front Panel",
          data: {
            stitches: 45,
            rows: 80,
            repeats: 5,
            time: 200,
          },
        },
        back: {
          name: "Back Panel",
          data: {
            stitches: 45,
            rows: 80,
            repeats: 5,
            time: 195,
          },
        },
      },
    },
  },
  beanie: {
    lastModified: Date.now() - 1000 * 60 * 60 * 24 * 7,
    name: "Knitted Beanie",
    color: "#3B82F6",
    options: {
      counterVisibility: {
        stitches: false,
        rows: true,
        repeats: true,
        time: true,
      },
      reminders: {
        remindTurnBackOn: true,
        remindTurnOff: true,
        remindTurnBackOnWait: 20,
        remindTurnOffWait: 5,
      },
    },
    data: {
      sections: {
        ribbing: {
          name: "Ribbing",
          data: {
            stitches: 20,
            rows: 30,
            repeats: 2,
            time: 90,
          },
        },
        crown: {
          name: "Crown Shaping",
          data: {
            stitches: 15,
            rows: 20,
            repeats: 1,
            time: 60,
          },
        },
      },
    },
  },
};

export const templateProject: Project = {
  name: "Unnamed Project",
  color: "#000000", // default black or override later
  options: {
    counterVisibility: {
      stitches: true,
      rows: true,
      repeats: true,
      time: true,
    },
    reminders: {
      remindTurnBackOn: false,
      remindTurnOff: false,
      remindTurnBackOnWait: 0,
      remindTurnOffWait: 0,
    },
  },
  data: {
    sections: {},
  },
  lastModified: Date.now(),
};
