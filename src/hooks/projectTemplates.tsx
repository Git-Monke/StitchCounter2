import { type Project } from "./useProjects";

// A. Example projects
export const exampleProjects: Record<string, Project> = {
  "baby-blanket-2024": {
    name: "Baby Blanket",
    color: "#FFB6C1",
    lastModified: Date.now() - 2 * 24 * 60 * 60 * 1000, // 2 days ago
    options: {
      counterOptions: {
        stitches: true,
        rows: true,
        repeats: true,
        time: false,
      },
      timerOptions: {
        remindTurnOn: true,
        autoTurnOff: false,
        remindTurnOnDelay: 30,
        autoTurnOffDelay: 0,
      },
    },
    data: {
      sections: {
        border: {
          name: "Border",
          notes: ["Use single crochet", "Keep tension loose"],
          data: {
            stitches: 240,
            rows: 8,
            repeats: 0,
            time: 180, // 3 hours in minutes
          },
        },
        "main-pattern": {
          name: "Main Pattern",
          notes: ["Repeat chevron pattern", "Count carefully on row 1"],
          data: {
            stitches: 1440,
            rows: 32,
            repeats: 16,
            time: 720, // 12 hours in minutes
          },
        },
      },
    },
  },

  "winter-scarf": {
    name: "Winter Scarf",
    color: "#4682B4",
    lastModified: Date.now() - 5 * 24 * 60 * 60 * 1000, // 5 days ago
    options: {
      counterOptions: {
        stitches: true,
        rows: true,
        repeats: false,
        time: true,
      },
      timerOptions: {
        remindTurnOn: false,
        autoTurnOff: true,
        remindTurnOnDelay: 0,
        autoTurnOffDelay: 60,
      },
    },
    data: {
      sections: {
        ribbing: {
          name: "Ribbing",
          notes: ["K2, P2 pattern", "Cast on with long-tail method"],
          data: {
            stitches: 96,
            rows: 6,
            repeats: 0,
            time: 45,
          },
        },
        body: {
          name: "Body",
          notes: ["Stockinette stitch", "Check gauge every 20 rows"],
          data: {
            stitches: 2400,
            rows: 150,
            repeats: 0,
            time: 900, // 15 hours
          },
        },
        fringe: {
          name: "Fringe",
          notes: ["Cut 8-inch strands", "Attach every 4th stitch"],
          data: {
            stitches: 48,
            rows: 0,
            repeats: 24,
            time: 60,
          },
        },
      },
    },
  },

  "dishcloth-set": {
    name: "Kitchen Dishcloth Set",
    color: "#98FB98",
    lastModified: Date.now() - 1 * 24 * 60 * 60 * 1000, // 1 day ago
    options: {
      counterOptions: {
        stitches: false,
        rows: true,
        repeats: true,
        time: false,
      },
      timerOptions: {
        remindTurnOn: true,
        autoTurnOff: true,
        remindTurnOnDelay: 15,
        autoTurnOffDelay: 45,
      },
    },
    data: {
      sections: {
        "dishcloth-1": {
          name: "Dishcloth #1",
          notes: ["Seed stitch pattern", "Cotton yarn only"],
          data: {
            stitches: 900,
            rows: 30,
            repeats: 0,
            time: 120,
          },
        },
        "dishcloth-2": {
          name: "Dishcloth #2",
          notes: ["Diagonal pattern", "Same size as #1"],
          data: {
            stitches: 465,
            rows: 30,
            repeats: 15,
            time: 90,
          },
        },
      },
    },
  },

  "lace-shawl": {
    name: "Evening Lace Shawl",
    color: "#DDA0DD",
    lastModified: Date.now() - 10 * 24 * 60 * 60 * 1000, // 10 days ago
    options: {
      counterOptions: {
        stitches: true,
        rows: true,
        repeats: true,
        time: true,
      },
      timerOptions: {
        remindTurnOn: true,
        autoTurnOff: false,
        remindTurnOnDelay: 20,
        autoTurnOffDelay: 0,
      },
    },
    data: {
      sections: {
        "center-panel": {
          name: "Center Panel",
          notes: [
            "Follow chart carefully",
            "Use stitch markers",
            "Block heavily when finished",
          ],
          data: {
            stitches: 2800,
            rows: 140,
            repeats: 35,
            time: 1200, // 20 hours
          },
        },
        border: {
          name: "Lace Border",
          notes: ["Pick up stitches evenly", "Work border chart 3 times"],
          data: {
            stitches: 720,
            rows: 24,
            repeats: 3,
            time: 360, // 6 hours
          },
        },
      },
    },
  },
};

// B. Template project
export const templateProject: Project = {
  name: "Untitled Project",
  color: "#808080",
  lastModified: Date.now(),
  options: {
    counterOptions: {
      stitches: true,
      rows: true,
      repeats: true,
      time: true,
    },
    timerOptions: {
      remindTurnOn: false,
      autoTurnOff: false,
      remindTurnOnDelay: 30,
      autoTurnOffDelay: 60,
    },
  },
  data: {
    sections: {},
  },
};
