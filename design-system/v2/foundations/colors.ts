export const colorGarden = [
  {
    id: "clover-meadow",
    name: "Clover Meadow",
    token: "Soft Green",
    hex: "#B7CDB1",
    mood: "The color of hope.",
    gradient:
      "radial-gradient(ellipse at 30% 20%, rgba(183,205,177,0.55) 0%, rgba(183,205,177,0.15) 45%, transparent 70%)",
  },
  {
    id: "morning-mist",
    name: "Morning Mist",
    token: "Misty Grey",
    hex: "#BDBDBD",
    mood: "The color of quiet mornings.",
    gradient:
      "radial-gradient(ellipse at 70% 30%, rgba(189,189,189,0.45) 0%, rgba(247,247,247,0.2) 50%, transparent 75%)",
  },
  {
    id: "white-rabbit",
    name: "White Rabbit",
    token: "Warm Cream White",
    hex: "#F7F7F7",
    mood: "The color of comfort.",
    gradient:
      "radial-gradient(ellipse at 50% 50%, rgba(255,255,255,0.9) 0%, rgba(247,247,247,0.4) 60%, transparent 80%)",
  },
  {
    id: "lavender-wish",
    name: "Lavender Wish",
    token: "Soft Lavender Purple",
    hex: "#D4C5E2",
    mood: "The color of gentle encouragement.",
    gradient:
      "radial-gradient(ellipse at 40% 60%, rgba(212,197,226,0.6) 0%, rgba(142,111,174,0.12) 55%, transparent 75%)",
  },
  {
    id: "tiny-magic",
    name: "Tiny Magic",
    token: "Golden Iridescence",
    hex: "#E8D4A8",
    mood: "The color of unexpected lucky moments.",
    gradient:
      "linear-gradient(135deg, rgba(255,215,0,0.35) 0%, rgba(255,153,153,0.25) 35%, rgba(153,221,255,0.25) 70%, rgba(170,255,170,0.2) 100%)",
  },
] as const;

export const brandColors = {
  softGreen: "#B7CDB1",
  deepGreen: "#5B7A55",
  mistyGrey: "#BDBDBD",
  cream: "#FDFCFB",
  whiteRabbit: "#F7F7F7",
  lavender: "#D4C5E2",
  staticePurple: "#8E6FAE",
  textDark: "#3D3530",
  textMuted: "#7A7068",
  golden: "#D4A853",
  iridescent:
    "linear-gradient(135deg, #FFD700 0%, #FF9999 35%, #99DDFF 70%, #AAFFAA 100%)",
} as const;
