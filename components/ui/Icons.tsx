import type { SVGProps } from "react";

const paths: Record<string, string> = {
  // service icons
  garage:
    "M3 11l9-6 9 6M5 10v10h14V10M8 20v-5h8v5M8 12h8",
  basement:
    "M4 4h16v6H4zM4 10l8 5 8-5M6 14v6h12v-6M9 20v-3h6v3",
  commercial:
    "M3 21h18M5 21V7l7-4 7 4v14M9 21v-4h6v4M8 10h.01M12 10h.01M16 10h.01M8 13h.01M12 13h.01M16 13h.01",
  polyaspartic:
    "M12 3s6 6.5 6 11a6 6 0 11-12 0c0-4.5 6-11 6-11zM9.5 13a2.5 2.5 0 002.5 2.5",
  polished:
    "M3 17l6-10 4 6 3-4 5 8zM4 21h16M14 4l1 2 2 1-2 1-1 2-1-2-2-1 2-1z",
  residential:
    "M3 11l9-7 9 7M5 10v10h14V10M10 20v-6h4v6",
  logo:
    "M12 3l7 4v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V7zM9.5 12l1.8 1.8L15 10",
  prep:
    "M3 20h7M6 20v-4M4 16h4v-4l8-8 4 4-8 8H4zM14 6l4 4",
  // value props
  clock: "M12 7v5l3 2M12 21a9 9 0 100-18 9 9 0 000 18z",
  shield: "M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6zM9 12l2 2 4-4",
  user: "M12 12a4 4 0 100-8 4 4 0 000 8zM4 21c0-4 4-6 8-6s8 2 8 6",
  pin: "M12 22s7-7 7-12a7 7 0 10-14 0c0 5 7 12 7 12zM12 12a2.5 2.5 0 100-5 2.5 2.5 0 000 5z",
  // ui
  phone:
    "M5 3h4l2 5-2.5 1.5a11 11 0 005 5L15 11l5 2v4a2 2 0 01-2 2A16 16 0 013 5a2 2 0 012-2z",
  arrow: "M5 12h14M13 6l6 6-6 6",
  check: "M5 12l4 4 10-10",
  star: "M12 3l2.6 5.5 6 .8-4.4 4.2 1.1 6L12 16.8 6.7 19.5l1.1-6L3.4 9.3l6-.8z",
  menu: "M4 7h16M4 12h16M4 17h16",
  close: "M6 6l12 12M18 6L6 18",
  chevron: "M6 9l6 6 6-6",
  sparkle: "M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8zM19 14l.9 2.1L22 17l-2.1.9L19 20l-.9-2.1L16 17l2.1-.9z",
  spray:
    "M9 4h4v4H9zM9 8c-2 0-3 1.5-3 4v8h10v-8c0-2.5-1-4-3-4M13 4l3-1M13 6l3 0M13 8l3 1",
  drop: "M12 3s6 6.5 6 11a6 6 0 11-12 0c0-4.5 6-11 6-11z",
};

export function Icon({
  name,
  size = 24,
  ...props
}: { name: keyof typeof paths | string; size?: number } & SVGProps<SVGSVGElement>) {
  const d = paths[name] ?? "";
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {d.split("M").filter(Boolean).map((seg, i) => (
        <path key={i} d={`M${seg}`} />
      ))}
    </svg>
  );
}
