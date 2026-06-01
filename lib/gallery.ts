export type GalleryItem = {
  src: string;
  alt: string;
  tag: string;
  wide?: boolean;
};

/** Real project photos from The Epoxy Guys' Google Business Profile. */
export const galleryItems: GalleryItem[] = [
  { src: "/photos/gallery-real-01.jpg", alt: "Finished two-car garage with a light flake epoxy floor and cabinets", tag: "Garage flake", wide: true },
  { src: "/photos/gallery-real-02.jpg", alt: "Glossy flake epoxy garage floor reflecting light, with a car", tag: "Glossy flake" },
  { src: "/photos/real-corvette-flake-floor.jpg", alt: "Sports car parked on a glossy flake epoxy garage floor", tag: "Showpiece garage" },
  { src: "/photos/gallery-real-06.jpg", alt: "The Epoxy Guys crew applying a floor coating on the job", tag: "On the job" },
  { src: "/photos/gallery-real-03.jpg", alt: "Finished two-car garage with a tan flake epoxy floor", tag: "Two-car garage" },
  { src: "/photos/gallery-real-07.jpg", alt: "Close-up of a gray flake epoxy floor finish", tag: "Flake detail" },
  { src: "/photos/gallery-real-04.jpg", alt: "Room with a finished gray flake epoxy floor", tag: "Flake floor" },
  { src: "/photos/gallery-real-09.jpg", alt: "Concrete floor being prepped and ground before coating", tag: "Surface prep" },
  { src: "/photos/gallery-real-05.jpg", alt: "Garage with a finished gray flake epoxy floor and border", tag: "Garage flake" },
  { src: "/photos/gallery-real-08.jpg", alt: "Finished garage with a flake epoxy floor", tag: "Finished garage" },
  { src: "/photos/gallery-real-10.jpg", alt: "Macro close-up of decorative epoxy flake", tag: "Flake close-up" },
];
