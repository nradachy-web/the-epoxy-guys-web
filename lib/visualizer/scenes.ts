import { asset } from "@/lib/asset";

/**
 * Room environments. Each is just a photo with a BARE floor + the 4 floor-quad
 * corners (normalized, top-left origin) in floor order: front-left, front-right,
 * back-right, back-left. The renderer derives the floor mask + lighting from the
 * photo, so a user-uploaded photo with marked corners uses the exact same path.
 */
export type Corner = [number, number];

export type Scene = {
  slug: string;
  name: string;
  code: string;
  image: string;
  /** [frontLeft, frontRight, backRight, backLeft], normalized 0..1, top-left origin */
  corners: [Corner, Corner, Corner, Corner];
  /** how many flake "tiles" span the near edge — controls apparent flake scale */
  tile: number;
  /** clip floor pixels brighter than this (walls); >1 disables. Lower for white-walled rooms. */
  wallReject?: number;
  /**
   * Rotoscoped floor cutout (grayscale PNG, white = floor). When present the
   * renderer shows flake ONLY on these pixels — objects standing on the floor
   * occlude it — and the quad is used purely for perspective mapping.
   */
  mask?: string;
};

/**
 * Corners are measured off each photo (gradient-traced wall/floor junction
 * lines, extended along those lines to y=1.04 so the renderer's front-edge
 * feather lands off-frame). Masks are rotoscoped floor cutouts generated from
 * the photos (Gemini magenta-repaint -> chroma key -> cleanup). If a photo is
 * replaced, re-measure corners AND regenerate its mask — verify with the ?cal
 * overlay on /visualizer.
 */
export const scenes: Scene[] = [
  {
    slug: "garage",
    name: "Two-Car Garage",
    code: "01",
    image: asset("/photos/visualizer/garage.jpg"),
    corners: [
      [-0.727, 1.04],
      [1.63, 1.04],
      [0.68, 0.565],
      [0.304, 0.565],
    ],
    tile: 5,
    mask: asset("/photos/visualizer/garage-mask.png"),
  },
  {
    slug: "basement",
    name: "Finished Basement",
    code: "02",
    image: asset("/photos/visualizer/basement.jpg"),
    corners: [
      [-0.259, 1.04],
      [1.322, 1.04],
      [0.65, 0.55],
      [0.375, 0.55],
    ],
    tile: 3.5,
    mask: asset("/photos/visualizer/basement-mask.png"),
  },
  {
    slug: "showroom",
    name: "Showroom",
    code: "03",
    image: asset("/photos/visualizer/showroom.jpg"),
    corners: [
      [-0.307, 1.04],
      [1.567, 1.04],
      [0.605, 0.54],
      [0.407, 0.54],
    ],
    tile: 4,
    mask: asset("/photos/visualizer/showroom-mask.png"),
  },
  {
    slug: "gym",
    name: "Home Gym",
    code: "04",
    image: asset("/photos/visualizer/gym.jpg"),
    corners: [
      [-0.152, 1.04],
      [1.14, 1.04],
      [0.655, 0.55],
      [0.36, 0.55],
    ],
    tile: 2.75,
    mask: asset("/photos/visualizer/gym-mask.png"),
  },
];
