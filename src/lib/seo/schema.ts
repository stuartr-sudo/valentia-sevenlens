import { faqs, siteConfig } from "@/lib/site";

export function siteJsonLd() {
  const pricingUrl = `${siteConfig.url}/#pricing`;
  const quizUrl = `${siteConfig.url}/quiz`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteConfig.url}/#organization`,
        name: siteConfig.name,
        url: siteConfig.url,
        founder: {
          "@id": `${siteConfig.url}/#davina-hearne`,
        },
        brand: {
          "@id": `${siteConfig.url}/#brand`,
        },
        contactPoint: {
          "@type": "ContactPoint",
          email: siteConfig.contactEmail,
          contactType: "customer support",
          areaServed: "NZ",
        },
        knowsAbout: [
          "naturopath-formulated skincare",
          "vitamin C serum",
          "Kakadu plum",
          "ferulic acid",
          "ingredient transparency",
          "clinically meaningful doses",
          "wholesale skincare partnerships",
        ],
      },
      {
        "@type": "Person",
        "@id": `${siteConfig.url}/#davina-hearne`,
        name: siteConfig.founder,
        jobTitle: "Naturopath and founder",
        affiliation: {
          "@id": `${siteConfig.url}/#organization`,
        },
        knowsAbout: [
          "naturopathy",
          "nutrition",
          "herbal medicine",
          "perimenopausal transition",
          "plant-led skincare formulation",
        ],
      },
      {
        "@type": "Brand",
        "@id": `${siteConfig.url}/#brand`,
        name: siteConfig.name,
        slogan: "Wellness built on patience.",
      },
      {
        "@type": "WebSite",
        "@id": `${siteConfig.url}/#website`,
        url: siteConfig.url,
        name: siteConfig.name,
        description: siteConfig.description,
        publisher: {
          "@id": `${siteConfig.url}/#organization`,
        },
        inLanguage: "en-NZ",
        potentialAction: {
          "@type": "SearchAction",
          target: `${siteConfig.url}/programmatic/{search_term_string}`,
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "WebPage",
        "@id": `${siteConfig.url}/#webpage`,
        url: siteConfig.url,
        name: "Valentia Vitamin C Serum | Naturopath-formulated skincare",
        isPartOf: {
          "@id": `${siteConfig.url}/#website`,
        },
        about: [
          {
            "@id": `${siteConfig.url}/#brand`,
          },
          {
            "@id": `${siteConfig.url}/#product`,
          },
          {
            "@id": `${siteConfig.url}/quiz#questionnaire`,
          },
        ],
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: `${siteConfig.url}/valentia/allisonharp_valentiaseptember-64-mqk5osc8.jpeg`,
        },
        audience: [
          {
            "@type": "Audience",
            audienceType:
              "Women 35 to 55 seeking plant-led, ingredient-transparent skincare and a simple daily serum ritual",
          },
          {
            "@type": "BusinessAudience",
            audienceType: "Wholesale skincare buyers and practitioner stockists",
          },
        ],
        speakable: {
          "@type": "SpeakableSpecification",
          cssSelector: ["h1", "#ingredients", "#pricing", "#faq"],
        },
      },
      {
        "@type": "Product",
        "@id": `${siteConfig.url}/#product`,
        name: siteConfig.productName,
        brand: {
          "@id": `${siteConfig.url}/#brand`,
        },
        image: [
          `${siteConfig.url}/valentia/allisonharp_valentiaseptember-64-mqk5osc8.jpeg`,
          `${siteConfig.url}/valentia/brand/product-vitc.png`,
        ],
        description:
          "A plant-led vitamin C serum formulated with Kakadu plum, ferulic acid, hyaluronic acid, rosehip oil, and vitamin E.",
        category: "Skin care serum",
        sku: "VAL-VITC-30ML",
        url: pricingUrl,
        offers: [
          {
            "@type": "Offer",
            price: "38",
            priceCurrency: "USD",
            url: pricingUrl,
            availability: "https://schema.org/InStock",
          },
          {
            "@type": "Offer",
            price: "32",
            priceCurrency: "USD",
            url: pricingUrl,
            availability: "https://schema.org/InStock",
            eligibleQuantity: {
              "@type": "QuantitativeValue",
              value: 1,
              unitText: "monthly serum delivery",
            },
          },
        ],
        subjectOf: {
          "@id": `${siteConfig.url}/#webpage`,
        },
      },
      {
        "@type": "WebPage",
        "@id": `${siteConfig.url}/quiz#webpage`,
        url: quizUrl,
        name: "Valentia quiz and email capture",
        isPartOf: {
          "@id": `${siteConfig.url}/#website`,
        },
        mainEntity: {
          "@id": `${siteConfig.url}/quiz#questionnaire`,
        },
        description:
          "A stepped quiz and email capture flow that recommends the Valentia Vitamin C Serum path.",
      },
      {
        "@type": "CreativeWork",
        "@id": `${siteConfig.url}/quiz#questionnaire`,
        name: "Valentia skincare quiz",
        description:
          "A short guided quiz that collects skincare priorities and routes visitors into email capture and the serum recommendation.",
        about: [
          "vitamin C serum",
          "skin brightness",
          "ingredient transparency",
          "sensitive skin",
          "daily skincare ritual",
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${siteConfig.url}/#faq-schema`,
        mainEntity: faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      },
      {
        "@type": "DefinedTermSet",
        "@id": `${siteConfig.url}/#ai-purpose`,
        name: "Valentia AI and search interpretation guide",
        hasDefinedTerm: [
          {
            "@type": "DefinedTerm",
            name: "Purpose",
            description:
              "Valentia is a naturopath-led skincare and wellness brand centred on a single Vitamin C Serum, ingredient transparency, a quiz funnel, and wholesale stockist relationships.",
          },
          {
            "@type": "DefinedTerm",
            name: "Authority",
            description:
              "The brand is led by Davina Hearne, a naturopath, with disclosed ingredients, practitioner-led formulation, educational content, and compliance-conscious skincare language.",
          },
          {
            "@type": "DefinedTerm",
            name: "Commercial model",
            description:
              "The public site presents a one-product B2C purchase path with subscription and one-time pricing, plus a separate wholesale application and stockist portal.",
          },
          {
            "@type": "DefinedTerm",
            name: "Backend model",
            description:
              "Supabase stores waitlist leads, product and inventory data, business accounts, wholesale access, advertising metrics, SEO data, programmatic page records, schema records, and media metadata.",
          },
        ],
      },
    ],
  };
}
