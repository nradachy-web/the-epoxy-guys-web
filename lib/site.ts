/**
 * The Epoxy Guys, single source of truth for site content.
 * Every fact here is real: recovered from the client's prior site, their Google
 * Ads account, and their own marketing. No fabricated reviews, ratings, or stats.
 * Copy frames the customer as the hero and The Epoxy Guys as the trusted local pro.
 */

export const site = {
  name: "The Epoxy Guys",
  legalName: "The Epoxy Guys",
  trademark: "The Epoxy Guys™",
  url: "https://miepoxyguys.com",
  description:
    "The Epoxy Guys are Genesee County's owner-operated epoxy and concrete coating specialists. One-day garage floors, basement and commercial coatings, polished concrete, and decorative metallic, flake, and quartz finishes, backed by a 15-year warranty. Serving Flint, Grand Blanc, Fenton and the surrounding Michigan communities. Free consultations.",
  tagline: "Floors that look like glass. Installed in a day.",
  region: "Genesee County and the greater Flint, Michigan area",
  regionShort: "Genesee County, MI",
  phone: "810-441-4494",
  phoneHref: "tel:+18104414494",
  email: "info@miepoxyguys.com",
  emailHref: "mailto:info@miepoxyguys.com",
  address: {
    street: "3075 Joyce St",
    city: "Burton",
    region: "Michigan",
    state: "MI",
    zip: "48529",
    full: "3075 Joyce St, Burton, MI 48529",
  },
  hours: "Mon to Sat, 8am to 5pm",
  geo: { lat: 42.979818, lng: -83.6502582 },
  facebook: "https://www.facebook.com/miepoxyguys",
  owner: {
    name: "David Tougas",
    partner: "Michelle Tougas",
    title: "Owner",
    note: "Owner on every job",
  },
  priceFrom: "$2.75",
  warrantyYears: 15,
  cure: "45 to 60 minutes",
} as const;

/** Headline differentiators, the proof bar under the hero. */
export const valueProps = [
  {
    label: "One-day installation",
    detail: "Polyaspartic systems cure in 45 to 60 minutes, so most floors are done start to finish in a single day.",
    icon: "clock",
  },
  {
    label: "15-year warranty",
    detail: "Prep done right and premium coatings, standing behind every floor with a 15-year warranty.",
    icon: "shield",
  },
  {
    label: "Owner on every job",
    detail: "David is on site for your project. You deal with the owner, not a rotating crew of subs.",
    icon: "user",
  },
  {
    label: "Locally owned",
    detail: "A Genesee County family business that knows Michigan slabs, salt, and winters.",
    icon: "pin",
  },
] as const;

/** Quick stats strip. Defensible facts only. */
export const stats = [
  { value: "1", unit: "day", label: "Typical install time" },
  { value: "15", unit: "yr", label: "Warranty on every floor" },
  { value: "45 to 60", unit: "min", label: "Polyaspartic cure time" },
  { value: "7", unit: "counties", label: "Served across mid-Michigan" },
] as const;

/** The customer-facing process, the spine of the homepage. */
export const process = [
  {
    step: "01",
    title: "Free on-site consultation",
    body: "We come to you, measure, look at the condition of the slab, and talk through colors and finishes. You get an honest quote with no pressure and no surprises later.",
  },
  {
    step: "02",
    title: "Diamond grind and prep",
    body: "The make-or-break step. We diamond grind the concrete to a profile, chase and fill cracks, and vacuum it clean so the coating bonds for good. No shortcuts, ever.",
  },
  {
    step: "03",
    title: "Coat, broadcast, and topcoat",
    body: "We lay the base coat, broadcast your flake or metallic finish, then seal it with a UV-stable polyaspartic topcoat that resists hot tires, oil, salt, and stains.",
  },
  {
    step: "04",
    title: "Walk on it the same day",
    body: "Because polyaspartic cures in under an hour, most floors are ready to walk on the same day and parked on within a day or two. We hand you a care sheet and clean up like we were never there.",
  },
] as const;

export type ServiceIcon =
  | "garage"
  | "basement"
  | "commercial"
  | "polyaspartic"
  | "polished"
  | "residential"
  | "logo"
  | "prep";

export type Service = {
  slug: string;
  name: string;
  navLabel: string;
  short: string;
  category: "Residential" | "Commercial" | "System" | "Specialty";
  /** one-line value promise for cards */
  promise: string;
  /** big page headline */
  headline: string;
  /** hero/intro paragraph */
  intro: string;
  /** the customer's worry this resolves */
  problem: string;
  /** what makes it worth it */
  benefits: { title: string; body: string }[];
  /** who/what it is ideal for */
  idealFor: string[];
  /** the outcome */
  outcome: string;
  /** related finish slugs */
  finishes: string[];
  icon: ServiceIcon;
  image: string;
  /** primary keywords this page targets (from the live Google Ads account) */
  keywords: string[];
  metaTitle: string;
  metaDescription: string;
};

export const services: Service[] = [
  {
    slug: "garage-floor-coatings",
    name: "Garage Floor Coatings",
    navLabel: "Garage Floors",
    short: "Garage Floors",
    category: "Residential",
    promise: "Turn a cracked, stained garage into the cleanest room in the house, in one day.",
    headline: "One-day garage floors that look like glass and shrug off everything.",
    intro:
      "Your garage works harder than any room in the house, and the bare slab shows it. We grind it down, fix what is broken, and pour a flake or metallic epoxy garage floor sealed with polyaspartic. The result is a showroom floor that handles hot tires, dropped wrenches, road salt, and oil without blinking, installed in a single day.",
    problem:
      "Cracks, oil stains that never scrub out, and dusty concrete that looks worse every year. You want a garage you are proud to leave open.",
    benefits: [
      { title: "Hot-tire proof", body: "Polyaspartic topcoats resist the hot-tire pickup that peels cheap epoxy and box-store kits." },
      { title: "Salt and chemical resistant", body: "Michigan winters drag in brine and slush. Your floor wipes clean and never absorbs it." },
      { title: "Slip-resistant and bright", body: "Flake adds traction underfoot and bounces light around, so the whole garage feels bigger and safer." },
      { title: "Done in a day", body: "Grind, coat, and topcoat in one visit. Most garages are ready to walk on the same evening." },
    ],
    idealFor: ["2 and 3-car attached garages", "Detached shops and pole barns", "Hobby and gym garages", "Homes for sale that need curb appeal"],
    outcome:
      "A garage floor that looks like a dealership showroom, cleans up with a mop, and carries a 15-year warranty.",
    finishes: ["epoxy-flake", "metallic", "solid-clear"],
    icon: "garage",
    image: "/photos/service-garage.jpg",
    keywords: ["epoxy garage floor", "garage floor coating near me", "one day garage floors", "garage floor epoxy flint", "polyaspartic garage floor"],
    metaTitle: "Epoxy Garage Floor Coatings in Flint & Grand Blanc, MI",
    metaDescription:
      "One-day epoxy and polyaspartic garage floor coatings in Genesee County, MI. Hot-tire proof, salt resistant, 15-year warranty. Free quote from The Epoxy Guys.",
  },
  {
    slug: "basement-floor-coatings",
    name: "Basement Floor Coatings",
    navLabel: "Basement Floors",
    short: "Basement Floors",
    category: "Residential",
    promise: "Turn a damp, gray basement into a clean, dry, finished living space.",
    headline: "Waterproof basement floors you will actually want to live on.",
    intro:
      "A bare basement slab is cold, dusty, and one leak away from a headache. A coated basement floor is sealed, waterproof, and warm-looking, the difference between storage and a real room. We coat basements for home gyms, theaters, playrooms, and man caves across Genesee County.",
    problem:
      "Moisture, musty smells, and concrete dust on everything you store down there. You want usable square footage, not a damp cave.",
    benefits: [
      { title: "Seals out moisture", body: "A continuous, non-porous coating resists the dampness that plagues Michigan basements." },
      { title: "Easy to clean", body: "No more concrete dust. A quick mop keeps a coated basement spotless." },
      { title: "Warmer, brighter space", body: "Light, decorative finishes turn a gray box into a finished room without the cost of tile or carpet." },
      { title: "Adds usable space", body: "A finished floor is the first step to a basement you actually use, and value buyers notice." },
    ],
    idealFor: ["Home gyms and yoga rooms", "Theaters and game rooms", "Playrooms and craft spaces", "Walk-out basements"],
    outcome:
      "A dry, bright, easy-clean basement floor that finally makes the downstairs feel like part of the house.",
    finishes: ["metallic", "epoxy-flake", "quartz"],
    icon: "basement",
    image: "/photos/service-basement.jpg",
    keywords: ["epoxy basement floor", "basement floor coating", "waterproof basement floor", "basement floor sealer flint mi"],
    metaTitle: "Epoxy Basement Floor Coatings in Genesee County, MI",
    metaDescription:
      "Waterproof, easy-clean epoxy basement floor coatings in Flint, Grand Blanc & Fenton, MI. Turn a damp basement into finished living space. Free quote.",
  },
  {
    slug: "commercial-industrial-epoxy",
    name: "Commercial & Industrial Epoxy",
    navLabel: "Commercial & Industrial",
    short: "Commercial & Industrial",
    category: "Commercial",
    promise: "Floors that pass inspection, take a beating, and keep your business open.",
    headline: "Commercial and industrial floors built to outlast the building.",
    intro:
      "When a floor is part of how you make money, downtime and failure are not options. We install seamless, chemical-resistant epoxy and polyaspartic systems for warehouses, shops, showrooms, kitchens, gyms, and grow spaces, with fast turnarounds and night and weekend scheduling so we do not shut you down.",
    problem:
      "A worn, cracking, or unsanitary floor that fails inspections, traps dirt, and makes your business look tired.",
    benefits: [
      { title: "Heavy-duty durability", body: "Stands up to forklifts, pallet jacks, foot traffic, and dropped tools without chipping out." },
      { title: "Sanitary and seamless", body: "Non-porous, easy-sanitize surfaces ideal for commercial kitchens, breweries, and medical spaces." },
      { title: "Fast turnaround", body: "Polyaspartic cures in under an hour, so we can phase work overnight and have you open the next day." },
      { title: "Safety built in", body: "Anti-slip additives and bright, high-visibility finishes keep staff and customers safe." },
    ],
    idealFor: ["Warehouses and distribution", "Auto and machine shops", "Restaurants and commercial kitchens", "Retail, showrooms, gyms, and grow facilities"],
    outcome:
      "A professional, durable, easy-to-clean floor that protects your slab, your staff, and your brand.",
    finishes: ["quartz", "solid-clear", "epoxy-flake"],
    icon: "commercial",
    image: "/photos/service-commercial.jpg",
    keywords: ["commercial epoxy floor", "industrial floor coating", "commercial kitchen epoxy", "warehouse floor coating michigan", "restaurant epoxy floor"],
    metaTitle: "Commercial & Industrial Epoxy Flooring in Mid-Michigan",
    metaDescription:
      "Seamless, chemical-resistant commercial and industrial epoxy floors for warehouses, kitchens, shops & retail across Genesee County, MI. Night & weekend installs.",
  },
  {
    slug: "polyaspartic-coatings",
    name: "Polyaspartic & Polyurea Coatings",
    navLabel: "Polyaspartic Coatings",
    short: "Polyaspartic",
    category: "System",
    promise: "The system that makes one-day floors possible, and outperforms old-school epoxy.",
    headline: "Polyaspartic: stronger than epoxy, cured in under an hour.",
    intro:
      "Most floors fail at the topcoat. We use polyaspartic, a fast-curing aliphatic polyurea that is tougher, clearer, and far more UV-stable than traditional epoxy. It cures in 45 to 60 minutes instead of days, never yellows in the sun, and resists hot tires, chemicals, and abrasion. It is the reason we can finish your floor in a single day and warranty it for 15 years.",
    problem:
      "You have seen epoxy floors peel, yellow, and bubble. You want the system that does not fail in a Michigan garage two winters later.",
    benefits: [
      { title: "Cures in 45 to 60 minutes", body: "Apply in the morning, walk on it that evening. No three-day wait, no extended shutdown." },
      { title: "UV stable, never yellows", body: "Unlike epoxy, polyaspartic holds its color in sunlight and protects the coats beneath it." },
      { title: "Extreme durability", body: "Higher abrasion and chemical resistance than epoxy, and it handles temperature swings from cold slabs to summer heat." },
      { title: "All-season install", body: "Polyaspartic can be applied across a wide temperature range, so we coat floors year round in Michigan." },
    ],
    idealFor: ["Garages that see hot tires and salt", "High-traffic commercial floors", "Anyone burned by a failed epoxy job", "Cold-weather and time-sensitive installs"],
    outcome:
      "A floor engineered to outlast cheap epoxy by years, installed in a day and backed for fifteen.",
    finishes: ["solid-clear", "epoxy-flake", "metallic"],
    icon: "polyaspartic",
    image: "/photos/service-polyaspartic.jpg",
    keywords: ["polyaspartic coating", "polyurea floor coating", "polyaspartic vs epoxy", "polyaspartic garage floor michigan"],
    metaTitle: "Polyaspartic & Polyurea Floor Coatings in Michigan",
    metaDescription:
      "Polyaspartic floor coatings cure in 45 to 60 minutes, never yellow, and outlast epoxy. The one-day, 15-year system from The Epoxy Guys in Genesee County, MI.",
  },
  {
    slug: "polished-concrete",
    name: "Polished & Stained Concrete",
    navLabel: "Polished Concrete",
    short: "Polished Concrete",
    category: "Specialty",
    promise: "A low-maintenance, high-end concrete floor with nothing to peel or replace.",
    headline: "Polished and stained concrete with a deep, durable shine.",
    intro:
      "Sometimes the best floor is the slab you already have, refined. We mechanically grind and polish concrete to a smooth, reflective finish, or add stain for color and depth. The result is an eco-friendly, extremely hard-wearing floor that needs little more than dust mopping, popular for retail, restaurants, offices, and modern homes.",
    problem:
      "You want a clean, modern, low-maintenance floor without the cost of tile or the upkeep of carpet.",
    benefits: [
      { title: "Extremely low maintenance", body: "Dust mop and the occasional wet mop keep it sparkling. No waxing, no replacing." },
      { title: "Hard-wearing", body: "Polished concrete resists chipping and cracking under heavy foot and cart traffic." },
      { title: "Eco-friendly", body: "We refine the slab you already have, using less material than installing a new floor surface." },
      { title: "Custom color and sheen", body: "Choose your stain color and gloss level, from a soft satin to a deep mirror polish." },
    ],
    idealFor: ["Retail and showrooms", "Restaurants and breweries", "Offices and lobbies", "Modern residential interiors"],
    outcome:
      "A sleek, reflective, nearly maintenance-free floor that looks high-end and lasts for decades.",
    finishes: ["polished-concrete", "stained"],
    icon: "polished",
    image: "/photos/service-polished.jpg",
    keywords: ["polished concrete", "concrete polishing", "stained concrete", "polished concrete floors near me michigan"],
    metaTitle: "Polished & Stained Concrete Floors in Genesee County, MI",
    metaDescription:
      "Polished and stained concrete floor contractors in Flint, MI. Low-maintenance, durable, custom color and sheen for homes and businesses. Free consultation.",
  },
  {
    slug: "residential-epoxy-flooring",
    name: "Residential Epoxy Flooring",
    navLabel: "Residential Epoxy",
    short: "Residential Epoxy",
    category: "Residential",
    promise: "Bring showroom floors to the rooms you live in, not just the garage.",
    headline: "Residential epoxy floors for every room that takes a beating.",
    intro:
      "Epoxy is not just for garages. We coat kitchens, mudrooms, laundry rooms, sunrooms, bathrooms, and entryways with the same glass-smooth, customizable finishes, durable, waterproof, and far easier to clean than tile or vinyl. If a room sees spills, traffic, or pets, it is a candidate.",
    problem:
      "Tile grout that stains, vinyl that peels, and floors that never look truly clean no matter how hard you scrub.",
    benefits: [
      { title: "Seamless and hygienic", body: "No grout lines or seams to trap dirt. The whole floor wipes clean in seconds." },
      { title: "Waterproof and pet-proof", body: "Spills, paws, and muddy boots wipe right up. Nothing soaks in." },
      { title: "Designed to your taste", body: "Match any palette with flake, metallic, quartz, or a clean solid color." },
      { title: "Adds real home value", body: "A custom, durable floor is a feature buyers and guests notice immediately." },
    ],
    idealFor: ["Kitchens and pantries", "Mudrooms and laundry rooms", "Sunrooms and three-season rooms", "Entryways and hallways"],
    outcome:
      "Beautiful, seamless, hard-wearing floors in the rooms you actually live in, custom to your style.",
    finishes: ["metallic", "epoxy-flake", "solid-clear", "quartz"],
    icon: "residential",
    image: "/photos/service-residential.jpg",
    keywords: ["residential epoxy flooring", "epoxy kitchen floor", "home epoxy floor coating", "epoxy floor installers michigan"],
    metaTitle: "Residential Epoxy Flooring in Flint & Grand Blanc, MI",
    metaDescription:
      "Custom residential epoxy floors for kitchens, mudrooms, sunrooms & more in Genesee County, MI. Seamless, waterproof, easy to clean. Free quote from The Epoxy Guys.",
  },
  {
    slug: "custom-logo-floors",
    name: "Custom Logo Floors",
    navLabel: "Custom Logo Floors",
    short: "Custom Logos",
    category: "Specialty",
    promise: "Put your brand, team, or favorite badge right into the floor.",
    headline: "Custom logo floors that stop people in their tracks.",
    intro:
      "Want your business logo at the entrance, your favorite car badge in the garage, or a team emblem in the man cave? We build custom logos and graphics directly into the epoxy, sealed under a clear, durable topcoat so they look incredible and never wear off.",
    problem:
      "A blank floor that misses an easy chance to show off your brand or personality.",
    benefits: [
      { title: "Fully custom", body: "We match your colors and recreate your logo, crest, or design right in the floor." },
      { title: "Sealed and permanent", body: "Your graphic lives under the clear topcoat, protected from traffic, tires, and cleaning." },
      { title: "High-impact for business", body: "A branded entry floor makes showrooms, shops, and restaurants look instantly more professional." },
      { title: "A statement at home", body: "Car brands, team logos, and family crests turn a garage or basement into a showpiece." },
    ],
    idealFor: ["Retail and restaurant entries", "Auto showrooms and dealerships", "Man caves and hobby garages", "Gyms and team facilities"],
    outcome:
      "A floor that doubles as a centerpiece, with your brand or badge built to last.",
    finishes: ["metallic", "solid-clear", "epoxy-flake"],
    icon: "logo",
    image: "/photos/service-logo.jpg",
    keywords: ["custom logo epoxy floor", "epoxy floor logo", "business logo floor coating", "garage logo floor"],
    metaTitle: "Custom Logo Epoxy Floors in Michigan",
    metaDescription:
      "Custom logo and graphic epoxy floors for businesses, garages & man caves in mid-Michigan. Your brand or badge built into a durable floor. Free design consult.",
  },
  {
    slug: "surface-prep-and-repair",
    name: "Surface Prep, Repair & Demolition",
    navLabel: "Prep & Demolition",
    short: "Prep & Demolition",
    category: "System",
    promise: "Tear out the old, prep the slab right, and set up a floor that lasts.",
    headline: "Demolition, tear-out, and concrete prep done right, because coatings are only as good as the slab.",
    intro:
      "Every great floor starts below the coating. We handle the full tear-out: carpet, standard and VCT tile, even asbestos tile removed and disposed of responsibly, plus complete floor demo down to bare concrete. Then we diamond grind to the correct profile, chase and fill cracks, patch spalls and pits, address moisture, and strip old failed coatings. When you hear a horror story about epoxy peeling, it almost always traces back to skipped prep. We never skip it.",
    problem:
      "There is old carpet, tile, or a peeling box-store coating in the way, and the slab underneath has never been prepped right.",
    benefits: [
      { title: "Carpet tear-out", body: "We remove old carpet, pad, and tack strip and haul it away, so the slab is ready for a real floor." },
      { title: "Tile removal: standard, VCT & asbestos", body: "We chip out ceramic, vinyl composite (VCT), and asbestos tile, handling and disposing of hazardous material responsibly and to code." },
      { title: "Complete floor demo", body: "We remove all existing flooring and thinset down to clean concrete and prepare the space for a flawless new install." },
      { title: "Diamond grinding", body: "We open the concrete to a mechanical profile so the coating actually bonds, no liquid etch shortcuts." },
      { title: "Crack and spall repair", body: "We chase, fill, and patch damage so the finished floor is smooth and structurally sound." },
      { title: "Moisture management", body: "We test for and address moisture, the silent killer of floor coatings in Michigan basements and slabs." },
    ],
    idealFor: ["Carpet tear-out", "VCT & asbestos tile removal", "Complete floor demo to bare concrete", "Failed DIY or box-store epoxy", "Cracked or pitted slabs", "Damp basements and garages"],
    outcome:
      "A clean, sound, properly profiled slab, the foundation for a floor that holds up for the long haul.",
    finishes: ["solid-clear", "epoxy-flake"],
    icon: "prep",
    image: "/photos/service-prep.jpg",
    keywords: ["floor demolition", "carpet removal", "tile removal", "vct tile removal", "asbestos tile removal", "concrete floor prep", "epoxy removal", "concrete crack repair", "concrete grinding michigan"],
    metaTitle: "Concrete Prep, Repair & Demolition in Genesee County",
    metaDescription:
      "Professional concrete grinding, crack repair, old coating removal & moisture management in Genesee County, MI. The prep that makes floors last. Free assessment.",
  },
];

/** Per-service media + sales copy that isn't on the base Service type:
 *  a stakes line (the cost of not acting), a review to feature, two real
 *  photos used for the framed lead image and the cinematic photo band, and an
 *  optional silent field-footage clip that replaces the lead image. */
export const serviceMedia: Record<
  string,
  { stakes: string; reviewMatch: string; gallery: [string, string]; video?: string }
> = {
  "garage-floor-coatings": {
    stakes:
      "A bare or peeling garage floor traps dust, soaks up oil and road salt, and looks worse every year. Putting it off only makes the slab harder to save.",
    reviewMatch: "garage",
    gallery: ["/photos/gallery-real-22.jpg", "/photos/real-corvette-flake-floor.jpg"],
  },
  "basement-floor-coatings": {
    stakes:
      "Left bare, a basement stays cold, damp, and prone to musty smells, and the square footage you pay for every month goes to waste.",
    reviewMatch: "basement",
    gallery: ["/photos/gallery-real-36.jpg", "/photos/finish-solid.jpg"],
  },
  "commercial-industrial-epoxy": {
    stakes:
      "A worn or failing floor fails inspections, traps grime, and quietly tells every customer and inspector that the details here do not matter.",
    reviewMatch: "commercial",
    gallery: ["/photos/gallery-real-37.jpg", "/photos/gallery-real-11.jpg"],
  },
  "polyaspartic-coatings": {
    stakes:
      "Cheap epoxy and box-store kits look fine for a season, then peel, yellow, and bubble. Then you pay to do the entire floor a second time.",
    reviewMatch: "one day",
    gallery: ["/photos/process-top.jpg", "/photos/gallery-real-14.jpg"],
  },
  "polished-concrete": {
    stakes:
      "Tile cracks, carpet wears out, and replacement floors keep adding up. The slab you already own can outlast all of them with the right finish.",
    reviewMatch: "stained",
    gallery: ["/photos/finish-polished.jpg", "/photos/finish-stained.jpg"],
  },
  "residential-epoxy-flooring": {
    stakes:
      "Grout stains, vinyl peels, and the busiest rooms in the house never look truly clean no matter how hard you scrub.",
    reviewMatch: "floor",
    gallery: ["/photos/gallery-real-25.jpg", "/photos/gallery-real-23.jpg"],
  },
  "custom-logo-floors": {
    stakes:
      "A blank floor is a missed first impression. People remember a branded entry long after they forget the sign on the wall.",
    reviewMatch: "garage",
    gallery: ["/photos/gallery-real-28.jpg", "/photos/real-corvette-flake-floor.jpg"],
  },
  "surface-prep-and-repair": {
    stakes:
      "Skip the prep and even the most beautiful coating peels within a winter or two. Proper prep is the difference between a 15-year floor and a callback.",
    reviewMatch: "pitted",
    gallery: ["/photos/process-grind.jpg", "/photos/process-crack.jpg"],
    video: "/video/grind-loop.mp4",
  },
};

export type Finish = {
  slug: string;
  name: string;
  tagline: string;
  body: string;
  priceNote?: string;
  bestFor: string;
  image: string;
};

export const finishes: Finish[] = [
  {
    slug: "epoxy-flake",
    name: "Epoxy Flake",
    tagline: "The garage favorite",
    body: "Decorative vinyl flakes broadcast into the coating add color, texture, and traction while hiding minor imperfections in the slab. Endlessly customizable and the most popular choice for garages and basements.",
    bestFor: "Garages, basements, high-traffic rooms",
    image: "/photos/finish-flake.jpg",
  },
  {
    slug: "metallic",
    name: "Metallic",
    tagline: "The marble look, at a fraction of the cost",
    body: "Metallic pigments are worked into the resin to create flowing, three-dimensional effects that mimic marble, lava, or rippled water. A bold statement floor, no two are ever exactly alike, and far more durable than real stone.",
    bestFor: "Showpiece garages, basements, retail, man caves",
    image: "/photos/finish-metallic.jpg",
  },
  {
    slug: "quartz",
    name: "Ceramic Carpet / Quartz",
    tagline: "Commercial-grade and slip-resistant",
    body: "Colored quartz granules build a thick, textured, ergonomic surface that resists slips and heavy traffic. A commercial favorite for kitchens, workspaces, and anywhere safety and durability come first.",
    bestFor: "Commercial kitchens, workspaces, wet areas",
    image: "/photos/finish-quartz.jpg",
  },
  {
    slug: "glitter",
    name: "Glitter",
    tagline: "Make it sparkle",
    body: "A metallic-and-mica finish flecked with glitter that catches the light. A head-turning floor for a home bar, salon, basement, or boutique.",
    bestFor: "Home bars, salons, boutiques, feature rooms",
    image: "/photos/finish-glitter.jpg",
  },
  {
    slug: "solid-clear",
    name: "Solid Color & Clear",
    tagline: "Classic, clean, affordable",
    body: "A clean solid color or a clear coat over your concrete, the timeless, budget-friendly choice. Simple, durable, and easy to clean, with residential pricing that starts low.",
    priceNote: "Residential from about $2.75 / sq ft",
    bestFor: "Budget garages, shops, utility spaces",
    image: "/photos/finish-solid.jpg",
  },
  {
    slug: "polished-concrete",
    name: "Polished Concrete",
    tagline: "Refine what you already have",
    body: "Mechanically ground and polished to a smooth, reflective sheen. An eco-friendly, low-maintenance, modern look that uses the slab you already own.",
    bestFor: "Retail, offices, modern interiors",
    image: "/photos/finish-polished.jpg",
  },
  {
    slug: "stained",
    name: "Stained Concrete",
    tagline: "Color with depth",
    body: "Stains add rich, variegated color and depth to concrete before sealing, for a warm, custom, one-of-a-kind floor.",
    bestFor: "Patios, interiors, accent areas",
    image: "/photos/finish-stained.jpg",
  },
  {
    slug: "custom-logos",
    name: "Personalized Logos",
    tagline: "Your brand in the floor",
    body: "We build your business logo, team emblem, or car badge directly into the floor and seal it under a clear topcoat. Impressive, durable, and easy to maintain.",
    bestFor: "Storefronts, showrooms, man caves",
    image: "/photos/finish-logo.jpg",
  },
];

export type ServiceArea = {
  slug: string;
  city: string;
  county: string;
  blurb: string;
  /** real GBP job photo for the city page hero (county-level work, no per-town claim) */
  image: string;
};

export const serviceAreas: ServiceArea[] = [
  {
    slug: "flint",
    city: "Flint",
    county: "Genesee County",
    blurb:
      "Our home turf. David has spent the better part of two decades working in and around Flint, and we know exactly how the slabs, salt, and seasons here treat a floor.",
    image: "/photos/gallery-real-12.jpg",
  },
  {
    slug: "grand-blanc",
    city: "Grand Blanc",
    county: "Genesee County",
    blurb:
      "From custom homes to busy commercial spaces, Grand Blanc owners trust us for showroom-quality garage and interior floors with a 15-year warranty.",
    image: "/photos/gallery-real-13.jpg",
  },
  {
    slug: "fenton",
    city: "Fenton",
    county: "Genesee County",
    blurb:
      "Lakeside garages, finished basements, and downtown businesses in Fenton get the same one-day install and meticulous prep we are known for.",
    image: "/photos/gallery-real-14.jpg",
  },
  {
    slug: "davison",
    city: "Davison",
    county: "Genesee County",
    blurb:
      "Davison homeowners call us to turn dusty garages and damp basements into clean, bright, easy-care living and working space.",
    image: "/photos/gallery-real-15.jpg",
  },
  {
    slug: "burton",
    city: "Burton",
    county: "Genesee County",
    blurb:
      "Hardworking garages and shops across Burton get floors that stand up to tools, tires, and Michigan winters without peeling.",
    image: "/photos/gallery-real-16.jpg",
  },
  {
    slug: "flushing",
    city: "Flushing",
    county: "Genesee County",
    blurb:
      "Flushing families choose flake and metallic finishes that make the garage the cleanest room in the house, installed in a single day.",
    image: "/photos/gallery-real-17.jpg",
  },
  {
    slug: "swartz-creek",
    city: "Swartz Creek",
    county: "Genesee County",
    blurb:
      "We coat garages, basements, and small commercial floors throughout Swartz Creek with premium polyaspartic systems and an honest quote.",
    image: "/photos/gallery-real-18.jpg",
  },
  {
    slug: "linden",
    city: "Linden",
    county: "Genesee County",
    blurb:
      "Linden and the Lake Fenton area trust us for durable, beautiful floors that hold up to lake-house traffic and sandy boots.",
    image: "/photos/gallery-real-19.jpg",
  },
  {
    slug: "clio",
    city: "Clio",
    county: "Genesee County",
    blurb:
      "From Clio garages to pole barns and shops, we deliver tough, good-looking floors with prep that is done right the first time.",
    image: "/photos/gallery-real-20.jpg",
  },
  {
    slug: "lapeer",
    city: "Lapeer",
    county: "Lapeer County",
    blurb:
      "Just east of home, Lapeer County customers get the same owner-on-site service for garages, basements, and commercial floors.",
    image: "/photos/gallery-real-21.jpg",
  },
];

/** Counties served, for the schema areaServed and the service-area hub. */
export const counties = [
  "Genesee County",
  "Lapeer County",
  "Livingston County",
  "Shiawassee County",
  "Saginaw County",
  "Oakland County",
  "Tuscola County",
];

/** Verified Google rating from the Google Business Profile (read live). */
export const googleRating = {
  score: "5.0",
  count: 86,
  url: "https://www.google.com/maps?cid=6168379335963790622",
} as const;

/** Real, verbatim 5-star reviews from the Google Business Profile. Excerpts of
 *  real customer reviews; wording is not altered. Do not invent reviews. */
export const testimonials = [
  {
    quote:
      "If you want a floor to look like a Lexus showroom floor, David (the Epoxy Guy) is the guy to see. David and Dave worked on our three car garage and it looks terrific. Both are extremely knowledgeable and willing to do whatever it takes to make you a satisfied customer.",
    name: "Sally",
    detail: "Three-car garage floor",
  },
  {
    quote:
      "I called The Epoxy Guys after seeing great reviews on Google. David came out to the house and gave great detail on what his team would do. Our garage had severe pitting from salt and cracks in a few areas. His team sanded and fixed all of those areas before applying the flake. It came out great and it was done in one day.",
    name: "Tim Balkus",
    detail: "One-day flake garage floor",
  },
  {
    quote:
      "From the initial consultation to the end product David explained the process and made sure that everything was done to perfection. He communicated flawlessly and delivered exactly as he said he would, even coming to deliver samples on a Sunday to meet our deadline! The crew worked hard and delivered an awesome finished product on our basement floor.",
    name: "Colin Clements",
    detail: "Basement floor",
  },
  {
    quote:
      "I could not be happier with my commercial kitchen floor. They went above and beyond and exceeded my expectations. They were professional and even followed up to make sure that I was happy with my floor, which I am! I would HIGHLY recommend them! Great service!!",
    name: "Tina Thompson",
    detail: "Commercial kitchen floor",
  },
  {
    quote:
      "Our garage floor was pitted and the Home Depot epoxy paint was chipping off. The Epoxy Guys refinished the floor and it is beautiful. Highly recommend them for their professional work. They came with all the machinery, the supplies, everything to do the job right. They cleaned up and did not leave any mess.",
    name: "Robert Miles",
    detail: "Garage floor refinish",
  },
  {
    quote:
      "The Epoxy Guys do great work. David was very helpful with selecting the right colors for my garage floor and making recommendations such as also covering the steps into my home. The guys were on time, kept me informed about the progress of the job and cleaned up after completion. The floor looks wonderful and will last many years.",
    name: "Laura Torian",
    detail: "Garage floor and steps",
  },
  {
    quote:
      "The Epoxy Guys did a remarkable job on my garage floor. From the beginning through the completed project, David and his staff were extremely professional with maximum attention to detail. Looks incredible. They used the BEST products and provided a 15 year guarantee to boot.",
    name: "Darran McLenon",
    detail: "Garage floor, 15-year guarantee",
  },
  {
    quote:
      "Called for an estimate, Dave came out the very next day with quote and color samples and scheduled the job a few days later. We had a garage floor and porch epoxy coated. The crew arrived on the scheduled morning and the entire job was done in 1 day including cleanup. Our garage is hardly recognizable.",
    name: "Aaron Brown",
    detail: "One-day garage and porch",
  },
  {
    quote:
      "Absolutely love our stained concrete basement floor from The Epoxy Guys! David and his crew were extremely knowledgeable and professional and took their time answering all our questions and making sure we got exactly what we envisioned. Our custom floor is so stunning and adds so much character to the space!",
    name: "Katelyn Dunlap",
    detail: "Stained concrete basement",
  },
] as const;

export const faqs = [
  {
    q: "How long does an epoxy floor take to install?",
    a: "Most residential floors are done in a single day. Because we finish with fast-curing polyaspartic, which cures in about 45 to 60 minutes, you can usually walk on your new floor the same evening and park on it within a day or two.",
  },
  {
    q: "What is the difference between epoxy and polyaspartic?",
    a: "Epoxy is the base coat that bonds to the concrete. Polyaspartic is a fast-curing aliphatic polyurea we use as the topcoat. It cures in under an hour instead of days, never yellows in sunlight, and resists hot tires, chemicals, and abrasion better than epoxy. Together they make a floor that installs fast and lasts.",
  },
  {
    q: "Will my floor peel like cheap epoxy or a box-store kit?",
    a: "Not when it is prepped correctly. Coating failure almost always comes from skipped prep. We diamond grind every floor to a proper profile, fix cracks, and address moisture before any coating goes down. That bond is why we can back every floor with a 15-year warranty.",
  },
  {
    q: "Do you offer free quotes?",
    a: "Yes. We come to you, look at your space and the condition of the slab, talk through colors and finishes, and give you an honest quote with no pressure and no obligation.",
  },
  {
    q: "How much does an epoxy floor cost?",
    a: "It depends on the size of the space, the condition of the concrete, and the finish you choose. Coatings start around $2.75 per square foot, with simple clear and solid color systems among the most affordable. You get an exact price at your free consultation.",
  },
  {
    q: "Can you coat a floor in the winter?",
    a: "Yes. Polyaspartic can be applied across a wide temperature range, so we install floors year round in Michigan, including heated garages and basements through the winter.",
  },
  {
    q: "What finishes can I choose from?",
    a: "Plenty. Popular options include flake, metallic, ceramic carpet and quartz, glitter, solid color, clear coat, polished concrete, stained concrete, and custom logos. We can match nearly any taste and budget.",
  },
  {
    q: "What areas do you serve?",
    a: "We are based in Genesee County and serve Flint, Grand Blanc, Fenton, Davison, Burton, Flushing, Swartz Creek, Linden, Clio, Lapeer, and the surrounding mid-Michigan communities.",
  },
];

/** Primary navigation. Services and Finishes open dropdowns in the header. */
export const nav = [
  { label: "Services", href: "/services" },
  { label: "Finishes", href: "/finishes" },
  { label: "Gallery", href: "/gallery" },
  { label: "Service Area", href: "/service-area" },
  { label: "Reviews", href: "/reviews" },
  { label: "About", href: "/about" },
];
