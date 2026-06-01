import {
  counties,
  faqs as siteFaqs,
  finishes,
  googleRating,
  services,
  serviceAreas,
  site,
  testimonials,
} from "@/lib/site";

/** LocalBusiness schema. aggregateRating + review use the verified Google rating
 *  (5.0 / 86) read from googleRating in lib/site.ts. Never fabricate or pad ratings. */
export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "HomeAndConstructionBusiness"],
    "@id": `${site.url}/#business`,
    name: site.name,
    alternateName: "The Epoxy Guys Michigan",
    description: site.description,
    url: site.url,
    telephone: site.phone,
    email: site.email,
    image: `${site.url}/og/og-default.jpg`,
    logo: `${site.url}/brand/the-epoxy-guys-logo.png`,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.city,
      addressRegion: site.address.state,
      postalCode: site.address.zip,
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: site.geo.lat,
      longitude: site.geo.lng,
    },
    areaServed: [
      ...serviceAreas.map((a) => ({ "@type": "City", name: `${a.city}, MI` })),
      ...counties.map((c) => ({ "@type": "AdministrativeArea", name: `${c}, MI` })),
    ],
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "08:00",
      closes: "18:00",
    },
    sameAs: [site.facebook],
    knowsAbout: [
      ...services.map((s) => s.name),
      ...finishes.map((f) => f.name),
    ],
    makesOffer: services.map((s) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: s.name, description: s.promise },
    })),
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: googleRating.score,
      reviewCount: googleRating.count,
      bestRating: "5",
      worstRating: "1",
    },
    review: testimonials.slice(0, 6).map((t) => ({
      "@type": "Review",
      reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
      author: { "@type": "Person", name: t.name },
      reviewBody: t.quote,
    })),
  };
}

export function serviceSchema(slug: string) {
  const service = services.find((s) => s.slug === slug);
  if (!service) return null;
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.intro,
    serviceType: service.name,
    provider: { "@id": `${site.url}/#business` },
    areaServed: serviceAreas.map((a) => `${a.city}, MI`),
    url: `${site.url}/services/${service.slug}/`,
  };
}

export function cityServiceSchema(citySlug: string) {
  const area = serviceAreas.find((a) => a.slug === citySlug);
  if (!area) return null;
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `Epoxy Flooring in ${area.city}, MI`,
    serviceType: "Epoxy & Concrete Floor Coatings",
    description: `Epoxy garage floors, basement coatings, polished concrete, and decorative finishes in ${area.city}, ${area.county}, installed in a day with a 15-year warranty by The Epoxy Guys.`,
    provider: { "@id": `${site.url}/#business` },
    areaServed: { "@type": "City", name: `${area.city}, MI` },
    url: `${site.url}/service-area/${area.slug}/`,
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${site.url}${item.url}`,
    })),
  };
}

export function faqSchema(faqs: { q: string; a: string }[] = siteFaqs) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function JsonLd({ data }: { data: object | object[] }) {
  const items = Array.isArray(data) ? data : [data];
  return (
    <>
      {items.map((item, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
        />
      ))}
    </>
  );
}
