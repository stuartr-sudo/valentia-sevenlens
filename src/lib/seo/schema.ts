import { faqs, siteConfig } from "@/lib/site";

export function siteJsonLd() {
  const formulaUrl = `${siteConfig.url}/#formula`;
  const auditUrl = `${siteConfig.url}/hormonal-skin-check-in`;

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
          "skin in transition",
          "perimenopause education",
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
        name: "Valentia | Wellness built on patience",
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
            "@id": `${siteConfig.url}/hormonal-skin-check-in#questionnaire`,
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
              "Women 35 to 55 exploring skin, sleep, mood, and hormonal transition signals",
          },
          {
            "@type": "BusinessAudience",
            audienceType: "Wholesale skincare buyers and practitioner stockists",
          },
        ],
        speakable: {
          "@type": "SpeakableSpecification",
          cssSelector: ["h1", "#approach", "#formula", "#audit"],
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
          "A plant-led vitamin C serum in validation, formulated with Kakadu plum, ferulic acid, hyaluronic acid, rosehip oil, and vitamin E.",
        category: "Skin care serum",
        sku: "VAL-VITC-30ML",
        url: formulaUrl,
        subjectOf: {
          "@id": `${siteConfig.url}/#webpage`,
        },
      },
      {
        "@type": "WebPage",
        "@id": `${siteConfig.url}/hormonal-skin-check-in#webpage`,
        url: auditUrl,
        name: "Hormonal symptom self-audit",
        isPartOf: {
          "@id": `${siteConfig.url}/#website`,
        },
        mainEntity: {
          "@id": `${siteConfig.url}/hormonal-skin-check-in#questionnaire`,
        },
        description:
          "A free five-minute self-audit from Valentia founder and naturopath Davina Hearne.",
      },
      {
        "@type": "CreativeWork",
        "@id": `${siteConfig.url}/hormonal-skin-check-in#questionnaire`,
        name: "The Hormonal Skin Check-In",
        description:
          "A five-question preview that helps visitors understand whether sleep, mood, skin, stress, and normal lab results may fit a hormonal transition pattern.",
        about: [
          "perimenopause education",
          "skin in transition",
          "sleep changes",
          "mood changes",
          "reactive skin",
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
              "Valentia is a naturopath-led wellness and skincare brand using a self-audit and founding list before broad product launch.",
          },
          {
            "@type": "DefinedTerm",
            name: "Authority",
            description:
              "The brand is led by Davina Hearne, a naturopath, with disclosed ingredients, educational content, and compliance-conscious structure and function language.",
          },
          {
            "@type": "DefinedTerm",
            name: "Commercial model",
            description:
              "The public site is validation-first: self-audit, education, founding list, and wholesale interest before live cart or checkout sales.",
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
