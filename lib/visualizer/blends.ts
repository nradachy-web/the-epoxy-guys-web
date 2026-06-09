/**
 * Flake Design Visualizer — blend catalog.
 *
 * A blend is pure DATA, never an image: a base-coat color plus a recipe of
 * vinyl flake chips (hex + relative weight). The same shape powers our named
 * presets AND a user's custom blend, and the renderer generates the texture
 * procedurally from it. Names + palette are our own (not the competitor's).
 */

export type Chip = { hex: string; weight: number };

export type FlakeSize = "fine" | "standard" | "broad"; // 1/16", 1/8", 1/4"
export type Density = "light" | "standard" | "full"; // base-coat reveal -> full broadcast

export type Blend = {
  slug: string;
  name: string;
  code: string;
  family: "Neutral" | "Gray" | "Earth" | "Bold" | "Cool";
  baseCoat: string;
  chips: Chip[];
  size: FlakeSize;
  density: Density;
  /** default polyaspartic sheen 0..1 (matte..mirror) */
  gloss: number;
};

/** Our flake chip palette — the building blocks for the custom blend builder. */
export const palette: { hex: string; name: string }[] = [
  { hex: "#f3f1ea", name: "White" },
  { hex: "#e7e0d2", name: "Eggshell" },
  { hex: "#cdc1ac", name: "Scone" },
  { hex: "#b7a98e", name: "Wheat" },
  { hex: "#9a8c72", name: "Khaki" },
  { hex: "#7c6f5a", name: "Walnut" },
  { hex: "#5a4f40", name: "Espresso" },
  { hex: "#d9d6cf", name: "Pearl" },
  { hex: "#b9b9b6", name: "Silver" },
  { hex: "#8d8f90", name: "Pewter" },
  { hex: "#5f6266", name: "Slate" },
  { hex: "#3a3d42", name: "Graphite" },
  { hex: "#1c1d20", name: "Onyx" },
  { hex: "#7d8a93", name: "Harbor Blue" },
  { hex: "#46586a", name: "Deep Navy" },
  { hex: "#566b5e", name: "Sage" },
  { hex: "#b5683a", name: "Copper" },
  { hex: "#9a3b34", name: "Cabernet" },
  { hex: "#c9a14e", name: "Brass" },
];

/** Base-coat colors (the epoxy under the flake). */
export const baseCoats: { hex: string; name: string }[] = [
  { hex: "#2b2b2e", name: "Charcoal" },
  { hex: "#4a4a4d", name: "Slate" },
  { hex: "#6b6b6e", name: "Gray" },
  { hex: "#8c8980", name: "Stone" },
  { hex: "#b9b3a5", name: "Sand" },
  { hex: "#e9e4d8", name: "Bone" },
  { hex: "#1b1b1d", name: "Black" },
  { hex: "#3a4250", name: "Navy" },
  { hex: "#6e4a36", name: "Terracotta" },
];

export const presets: Blend[] = [
  {
    slug: "tungsten", name: "Tungsten", code: "EG-101", family: "Gray",
    baseCoat: "#3a3d42", chips: [{ hex: "#b9b9b6", weight: 0.5 }, { hex: "#5f6266", weight: 0.3 }, { hex: "#1c1d20", weight: 0.2 }],
    size: "standard", density: "full", gloss: 0.62,
  },
  {
    slug: "domino", name: "Domino", code: "EG-102", family: "Bold",
    baseCoat: "#1b1b1d", chips: [{ hex: "#f3f1ea", weight: 0.5 }, { hex: "#1c1d20", weight: 0.4 }, { hex: "#8d8f90", weight: 0.1 }],
    size: "broad", density: "full", gloss: 0.78,
  },
  {
    slug: "granite", name: "Granite", code: "EG-103", family: "Gray",
    baseCoat: "#4a4a4d", chips: [{ hex: "#d9d6cf", weight: 0.4 }, { hex: "#8d8f90", weight: 0.35 }, { hex: "#3a3d42", weight: 0.25 }],
    size: "standard", density: "full", gloss: 0.55,
  },
  {
    slug: "birch", name: "Birch", code: "EG-104", family: "Neutral",
    baseCoat: "#b9b3a5", chips: [{ hex: "#f3f1ea", weight: 0.45 }, { hex: "#cdc1ac", weight: 0.35 }, { hex: "#7c6f5a", weight: 0.2 }],
    size: "standard", density: "standard", gloss: 0.5,
  },
  {
    slug: "sandstone", name: "Sandstone", code: "EG-105", family: "Earth",
    baseCoat: "#8c8980", chips: [{ hex: "#cdc1ac", weight: 0.4 }, { hex: "#b7a98e", weight: 0.3 }, { hex: "#9a8c72", weight: 0.2 }, { hex: "#5a4f40", weight: 0.1 }],
    size: "standard", density: "full", gloss: 0.5,
  },
  {
    slug: "copper-vein", name: "Copper Vein", code: "EG-106", family: "Bold",
    baseCoat: "#2b2b2e", chips: [{ hex: "#8d8f90", weight: 0.45 }, { hex: "#b5683a", weight: 0.3 }, { hex: "#c9a14e", weight: 0.12 }, { hex: "#1c1d20", weight: 0.13 }],
    size: "standard", density: "full", gloss: 0.72,
  },
  {
    slug: "glacier", name: "Glacier", code: "EG-107", family: "Cool",
    baseCoat: "#4a4a4d", chips: [{ hex: "#f3f1ea", weight: 0.4 }, { hex: "#b9b9b6", weight: 0.3 }, { hex: "#7d8a93", weight: 0.2 }, { hex: "#46586a", weight: 0.1 }],
    size: "standard", density: "full", gloss: 0.6,
  },
  {
    slug: "harbor", name: "Harbor", code: "EG-108", family: "Cool",
    baseCoat: "#3a4250", chips: [{ hex: "#7d8a93", weight: 0.45 }, { hex: "#d9d6cf", weight: 0.3 }, { hex: "#46586a", weight: 0.25 }],
    size: "standard", density: "full", gloss: 0.66,
  },
  {
    slug: "cabernet", name: "Cabernet", code: "EG-109", family: "Bold",
    baseCoat: "#1b1b1d", chips: [{ hex: "#9a3b34", weight: 0.35 }, { hex: "#8d8f90", weight: 0.35 }, { hex: "#1c1d20", weight: 0.3 }],
    size: "standard", density: "full", gloss: 0.74,
  },
  {
    slug: "espresso", name: "Espresso", code: "EG-110", family: "Earth",
    baseCoat: "#3a3d42", chips: [{ hex: "#7c6f5a", weight: 0.4 }, { hex: "#5a4f40", weight: 0.3 }, { hex: "#cdc1ac", weight: 0.2 }, { hex: "#1c1d20", weight: 0.1 }],
    size: "standard", density: "full", gloss: 0.58,
  },
  {
    slug: "pewter-fine", name: "Pewter", code: "EG-111", family: "Gray",
    baseCoat: "#5f6266", chips: [{ hex: "#d9d6cf", weight: 0.5 }, { hex: "#8d8f90", weight: 0.3 }, { hex: "#5f6266", weight: 0.2 }],
    size: "fine", density: "full", gloss: 0.52,
  },
  {
    slug: "sage-stone", name: "Sage Stone", code: "EG-112", family: "Earth",
    baseCoat: "#6b6b6e", chips: [{ hex: "#566b5e", weight: 0.35 }, { hex: "#cdc1ac", weight: 0.35 }, { hex: "#3a3d42", weight: 0.3 }],
    size: "standard", density: "full", gloss: 0.5,
  },
];

export const families = ["Neutral", "Gray", "Earth", "Cool", "Bold"] as const;

export const sizeMeta: Record<FlakeSize, { label: string; grid: number }> = {
  fine: { label: '1/16"', grid: 34 },
  standard: { label: '1/8"', grid: 22 },
  broad: { label: '1/4"', grid: 14 },
};

export const densityMeta: Record<Density, { label: string; coverage: number }> = {
  light: { label: "Light broadcast", coverage: 0.72 },
  standard: { label: "Standard", coverage: 0.9 },
  full: { label: "Full broadcast", coverage: 1.0 },
};
