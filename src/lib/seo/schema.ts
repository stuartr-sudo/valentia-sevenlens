import { faqs, siteConfig } from "@/lib/site";

export function siteJsonLd() {
  const productUrl = `${siteConfig.url}/#pricing`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteConfig.url}/#organization`,
        name: siteConfig.name,
        url: siteConfig.url,
        founder: {
          "@type": "Person",
          name: siteConfig.founder,
          jobTitle: "Naturopath and founder",
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
          "one-product skincare routines",
          "wholesale skincare distribution",
        ],
      },
      {
        "@type": "Brand",
        "@id": `${siteConfig.url}/#brand`,
        name: siteConfig.name,
        slogan: "One serum. One ritual.",
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
        name: "Valentia Vitamin C Serum",
        isPartOf: {
          "@id": `${siteConfig.url}/#website`,
        },
        about: [
          {
            "@id": `${siteConfig.url}/#product`,
          },
          {
            "@id": `${siteConfig.url}/#organization`,
          },
        ],
        mainEntity: {
          "@id": `${siteConfig.url}/#product`,
        },
        audience: [
          {
            "@type": "Audience",
            audienceType: "Skincare customers seeking a simple daily serum",
          },
          {
            "@type": "BusinessAudience",
            audienceType: "Wholesale skincare buyers and stockists",
          },
        ],
        speakable: {
          "@type": "SpeakableSpecification",
          cssSelector: ["h1", "#benefits", "#ingredients", "#faq"],
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
        url: productUrl,
        offers: [
          {
            "@type": "Offer",
            url: productUrl,
            price: "38.00",
            priceCurrency: "USD",
            availability: "https://schema.org/PreOrder",
            itemCondition: "https://schema.org/NewCondition",
          },
          {
            "@type": "Offer",
            url: productUrl,
            price: "32.00",
            priceCurrency: "USD",
            availability: "https://schema.org/PreOrder",
            itemCondition: "https://schema.org/NewCondition",
            eligibleCustomerType: "subscription customer",
          },
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
              "Valentia sells and supports a one-product skincare line centered on a naturopath-formulated vitamin C serum.",
          },
          {
            "@type": "DefinedTerm",
            name: "Authority",
            description:
              "The brand emphasizes founder formulation, disclosed ingredients, customer education, and structured product data.",
          },
          {
            "@type": "DefinedTerm",
            name: "Commercial model",
            description:
              "Direct customer sales, founding-list subscriptions, and a wholesale stockist platform share one Supabase-backed data model.",
          },
        ],
      },
    ],
  };
}
