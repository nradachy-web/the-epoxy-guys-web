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
};

export const scenes: Scene[] = [
  {
    slug: "garage",
    name: "Two-Car Garage",
    code: "01",
    image: asset("/photos/visualizer/garage.jpg"),
    corners: [
      [0.0, 0.95],
      [1.0, 0.95],
      [0.69, 0.575],
      [0.315, 0.565],
    ],
    tile: 12,
  },
  {
    slug: "basement",
    name: "Finished Basement",
    code: "02",
    image: asset("/photos/visualizer/basement.jpg"),
    corners: [
      [0.0, 0.96],
      [1.0, 0.96],
      [0.66, 0.575],
      [0.34, 0.575],
    ],
    tile: 11,
  },
  {
    slug: "showroom",
    name: "Showroom",
    code: "03",
    image: asset("/photos/visualizer/showroom.jpg"),
    corners: [
      [0.0, 0.97],
      [1.0, 0.97],
      [0.68, 0.56],
      [0.32, 0.56],
    ],
    tile: 13,
    wallReject: 0.9,
  },
  {
    slug: "gym",
    name: "Home Gym",
    code: "04",
    image: asset("/photos/visualizer/gym.jpg"),
    corners: [
      [0.0, 0.96],
      [1.0, 0.96],
      [0.68, 0.56],
      [0.32, 0.56],
    ],
    tile: 12,
  },
];
