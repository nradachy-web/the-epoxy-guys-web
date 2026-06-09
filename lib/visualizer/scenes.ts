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
      [-0.02, 0.99],
      [1.02, 0.99],
      [0.86, 0.5],
      [0.16, 0.5],
    ],
    tile: 11,
    wallReject: 0.8,
  },
  {
    slug: "showroom",
    name: "Showroom",
    code: "03",
    image: asset("/photos/visualizer/showroom.jpg"),
    corners: [
      [-0.02, 0.99],
      [1.02, 0.99],
      [0.82, 0.48],
      [0.18, 0.48],
    ],
    tile: 14,
    wallReject: 0.82,
  },
];
