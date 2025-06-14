import { type Project } from "./useProjects";

// Helper function to generate random project data
function generateProject(
  name: string,
  color: string,
  sectionsData: Array<{
    name: string;
    notes: string;
    stitches: number;
    rows: number;
    repeats: number;
    time: number;
  }>,
): Project {
  const sections: Record<string, any> = {};

  sectionsData.forEach((section, index) => {
    sections[`section_${index + 1}`] = {
      name: section.name,
      notes: section.notes,
      data: {
        stitches: section.stitches,
        rows: section.rows,
        repeats: section.repeats,
        time: section.time,
      },
    };
  });

  return {
    name,
    color,
    lastModified:
      Date.now() - Math.floor(Math.random() * 90 * 24 * 60 * 60 * 1000), // Random within last 90 days
    options: {
      counterOptions: {
        stitches: Math.random() > 0.2,
        rows: Math.random() > 0.1,
        repeats: Math.random() > 0.4,
        time: Math.random() > 0.3,
      },
      timerOptions: {
        remindTurnOn: Math.random() > 0.5,
        autoTurnOff: Math.random() > 0.6,
        remindTurnOnDelay: Math.floor(Math.random() * 15) + 5,
        autoTurnOffDelay: Math.floor(Math.random() * 25) + 10,
      },
    },
    selectedSectionID: "",
    data: { sections },
  };
}

// Project templates data
const projectTemplates = [
  {
    name: "Cozy Baby Blanket",
    color: "#FFB6C1",
    sections: [
      {
        name: "Border",
        notes: "- Use single crochet\n- Change yarn every 4 rows",
        stitches: 120,
        rows: 8,
        repeats: 1,
        time: 45,
      },
      {
        name: "Main Pattern",
        notes: "- Chevron stitch pattern\n- Keep tension even",
        stitches: 480,
        rows: 32,
        repeats: 8,
        time: 180,
      },
      {
        name: "Final Border",
        notes: "- Mirror starting border\n- Weave in ends",
        stitches: 120,
        rows: 8,
        repeats: 1,
        time: 45,
      },
    ],
  },
  {
    name: "Winter Scarf",
    color: "#4682B4",
    sections: [
      {
        name: "Cable Pattern",
        notes: "- Use cable needle\n- Cross every 6 rows",
        stitches: 240,
        rows: 60,
        repeats: 10,
        time: 120,
      },
      {
        name: "Fringe",
        notes: "- 6-inch strands\n- Every other stitch",
        stitches: 40,
        rows: 2,
        repeats: 2,
        time: 30,
      },
    ],
  },
  {
    name: "Autumn Cardigan",
    color: "#DEB887",
    sections: [
      {
        name: "Back Panel",
        notes: "- Ribbing first\n- Armhole increases at row 45",
        stitches: 320,
        rows: 65,
        repeats: 1,
        time: 200,
      },
      {
        name: "Front Left",
        notes: "- Button band\n- Shape neckline",
        stitches: 160,
        rows: 65,
        repeats: 1,
        time: 120,
      },
      {
        name: "Front Right",
        notes: "- Buttonhole band\n- Match left panel",
        stitches: 160,
        rows: 65,
        repeats: 1,
        time: 120,
      },
      {
        name: "Sleeves",
        notes: "- Taper from cuff\n- Set in carefully",
        stitches: 180,
        rows: 45,
        repeats: 2,
        time: 90,
      },
    ],
  },
  {
    name: "Granny Square Afghan",
    color: "#9370DB",
    sections: [
      {
        name: "Individual Squares",
        notes: "- Make 64 squares\n- Consistent tension",
        stitches: 24,
        rows: 4,
        repeats: 64,
        time: 15,
      },
      {
        name: "Assembly",
        notes: "- Join with slip stitch\n- Work in rows",
        stitches: 192,
        rows: 16,
        repeats: 1,
        time: 90,
      },
      {
        name: "Border",
        notes: "- Three rounds\n- Corner increases",
        stitches: 256,
        rows: 3,
        repeats: 1,
        time: 45,
      },
    ],
  },
  {
    name: "Lace Doily",
    color: "#F0F8FF",
    sections: [
      {
        name: "Center Ring",
        notes: "- Magic ring start\n- 12 dc in ring",
        stitches: 12,
        rows: 1,
        repeats: 1,
        time: 5,
      },
      {
        name: "Petal Rounds",
        notes: "- Increase pattern\n- Chain spaces",
        stitches: 144,
        rows: 8,
        repeats: 1,
        time: 60,
      },
      {
        name: "Outer Edge",
        notes: "- Picot edging\n- Block when finished",
        stitches: 288,
        rows: 4,
        repeats: 1,
        time: 40,
      },
    ],
  },
  {
    name: "Chunky Throw Pillow",
    color: "#CD853F",
    sections: [
      {
        name: "Front Panel",
        notes: "- Textured stitch\n- 18x18 inches",
        stitches: 144,
        rows: 36,
        repeats: 1,
        time: 80,
      },
      {
        name: "Back Panel",
        notes: "- Plain single crochet\n- Match front size",
        stitches: 144,
        rows: 36,
        repeats: 1,
        time: 60,
      },
      {
        name: "Assembly",
        notes: "- Invisible seam\n- Leave opening for stuffing",
        stitches: 72,
        rows: 3,
        repeats: 1,
        time: 25,
      },
    ],
  },
  {
    name: "Market Bag",
    color: "#228B22",
    sections: [
      {
        name: "Base",
        notes: "- Oval shape\n- Work in rounds",
        stitches: 48,
        rows: 8,
        repeats: 1,
        time: 30,
      },
      {
        name: "Sides",
        notes: "- Mesh pattern\n- Expandable design",
        stitches: 96,
        rows: 20,
        repeats: 1,
        time: 45,
      },
      {
        name: "Handles",
        notes: "- Reinforced straps\n- Comfortable grip",
        stitches: 60,
        rows: 4,
        repeats: 2,
        time: 20,
      },
    ],
  },
  {
    name: "Baby Booties Set",
    color: "#FFE4E1",
    sections: [
      {
        name: "Sole",
        notes: "- Oval base\n- Size 0-3 months",
        stitches: 28,
        rows: 6,
        repeats: 2,
        time: 15,
      },
      {
        name: "Upper",
        notes: "- Shape around sole\n- Cute bow detail",
        stitches: 40,
        rows: 8,
        repeats: 2,
        time: 20,
      },
      {
        name: "Ties",
        notes: "- I-cord technique\n- 6 inches long",
        stitches: 36,
        rows: 1,
        repeats: 4,
        time: 10,
      },
    ],
  },
  {
    name: "Kitchen Dishcloths",
    color: "#F5DEB3",
    sections: [
      {
        name: "Main Square",
        notes: "- Cotton yarn only\n- Tight gauge",
        stitches: 100,
        rows: 25,
        repeats: 6,
        time: 20,
      },
      {
        name: "Hanging Loop",
        notes: "- Chain 12\n- Attach to corner",
        stitches: 12,
        rows: 1,
        repeats: 6,
        time: 2,
      },
    ],
  },
  {
    name: "Amigurumi Bear",
    color: "#DEB887",
    sections: [
      {
        name: "Head",
        notes: "- Start with magic ring\n- Stuff firmly",
        stitches: 72,
        rows: 12,
        repeats: 1,
        time: 35,
      },
      {
        name: "Body",
        notes: "- Oval shape\n- Leave opening for stuffing",
        stitches: 84,
        rows: 14,
        repeats: 1,
        time: 40,
      },
      {
        name: "Arms",
        notes: "- Cylinder shape\n- Stuff lightly",
        stitches: 36,
        rows: 8,
        repeats: 2,
        time: 15,
      },
      {
        name: "Legs",
        notes: "- Cone shape\n- Stuff for stability",
        stitches: 42,
        rows: 10,
        repeats: 2,
        time: 20,
      },
      {
        name: "Ears",
        notes: "- Small circles\n- Attach securely",
        stitches: 12,
        rows: 3,
        repeats: 2,
        time: 5,
      },
    ],
  },
  {
    name: "Chevron Baby Blanket",
    color: "#98FB98",
    sections: [
      {
        name: "Chevron Pattern",
        notes: "- Color changes every 2 rows\n- Point precision",
        stitches: 360,
        rows: 80,
        repeats: 1,
        time: 240,
      },
      {
        name: "Border",
        notes: "- Single crochet edge\n- Corner adjustments",
        stitches: 200,
        rows: 3,
        repeats: 1,
        time: 30,
      },
    ],
  },
  {
    name: "Mesh Beach Bag",
    color: "#20B2AA",
    sections: [
      {
        name: "Bottom",
        notes: "- Circular base\n- Sturdy foundation",
        stitches: 60,
        rows: 10,
        repeats: 1,
        time: 25,
      },
      {
        name: "Mesh Body",
        notes: "- Open weave\n- Drainage holes",
        stitches: 120,
        rows: 25,
        repeats: 1,
        time: 50,
      },
      {
        name: "Reinforced Rim",
        notes: "- Double crochet band\n- Handle attachment",
        stitches: 60,
        rows: 2,
        repeats: 1,
        time: 15,
      },
      {
        name: "Handles",
        notes: "- Braided rope style\n- Extra strength",
        stitches: 150,
        rows: 1,
        repeats: 2,
        time: 30,
      },
    ],
  },
  {
    name: "Flower Motif Shawl",
    color: "#DA70D6",
    sections: [
      {
        name: "Center Flowers",
        notes: "- Make 12 motifs\n- Join as you go",
        stitches: 48,
        rows: 6,
        repeats: 12,
        time: 25,
      },
      {
        name: "Connecting Mesh",
        notes: "- Fill between flowers\n- Maintain drape",
        stitches: 144,
        rows: 12,
        repeats: 1,
        time: 60,
      },
      {
        name: "Lace Edge",
        notes: "- Scalloped border\n- Block for best shape",
        stitches: 240,
        rows: 4,
        repeats: 1,
        time: 45,
      },
    ],
  },
  {
    name: "Coaster Set",
    color: "#F4A460",
    sections: [
      {
        name: "Round Coasters",
        notes: "- 4-inch diameter\n- Absorbent cotton",
        stitches: 48,
        rows: 8,
        repeats: 6,
        time: 12,
      },
      {
        name: "Storage Basket",
        notes: "- Holds complete set\n- Matching color",
        stitches: 96,
        rows: 12,
        repeats: 1,
        time: 35,
      },
    ],
  },
  {
    name: "Cable Knit Style Blanket",
    color: "#F5F5DC",
    sections: [
      {
        name: "Cable Panels",
        notes: "- Faux cable technique\n- Consistent crosses",
        stitches: 200,
        rows: 40,
        repeats: 5,
        time: 80,
      },
      {
        name: "Plain Sections",
        notes: "- Single crochet fill\n- Even tension",
        stitches: 160,
        rows: 40,
        repeats: 4,
        time: 50,
      },
      {
        name: "Ribbed Border",
        notes: "- Post stitch ribbing\n- All around edge",
        stitches: 280,
        rows: 6,
        repeats: 1,
        time: 40,
      },
    ],
  },
];

export const exampleProjects: Record<string, Project> = {};

// Generate 15 projects using the templates
projectTemplates.slice(0, 15).forEach((template, index) => {
  const id = `project_${String(index + 1).padStart(3, "0")}`;
  exampleProjects[id] = generateProject(
    template.name,
    template.color,
    template.sections,
  );
});

// B. Template project
export const templateProject: Project = {
  name: "Untitled Project",
  color: "#808080",
  lastModified: Date.now(),
  options: {
    counterOptions: {
      stitches: false,
      rows: false,
      repeats: true,
      time: true,
    },
    timerOptions: {
      remindTurnOn: false,
      autoTurnOff: false,
      remindTurnOnDelay: 5,
      autoTurnOffDelay: 5,
    },
  },
  data: {
    sections: {
      defaultSection: {
        name: "Untitled Section",
        notes: "",
        data: {
          stitches: 0,
          rows: 0,
          repeats: 0,
          time: 0,
        },
      },
    },
  },
  selectedSectionID: "defaultSection",
};
