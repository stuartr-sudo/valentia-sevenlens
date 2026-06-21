import { credentials } from "@/lib/pages";
import { siteConfig } from "@/lib/site";

export type JsonLdNode = Record<string, unknown>;

export type JsonLdDocument = {
  "@context": "https://schema.org";
  "@graph": JsonLdNode[];
};

type BreadcrumbItem = {
  name: string;
  path: string;
};

type PageNodeOptions = {
  path: string;
  name: string;
  description: string;
  type?: string;
  image?: string;
  mainEntity?: JsonLdNode;
  about?: Array<string | JsonLdNode>;
  audience?: JsonLdNode | JsonLdNode[];
};

type ProgrammaticSchemaInput = {
  slug: string;
  title: string;
  metaDescription?: string | null;
  body?: string | null;
  structuredData?: Record<string, unknown> | null;
};

type CorePageSchemaOptions = {
  path?: string;
};

const baseUrl = siteConfig.url.replace(/\/$/, "");
const organizationId = `${baseUrl}/#organization`;
const founderId = `${baseUrl}/#davina-hearne`;
const brandId = `${baseUrl}/#brand`;
const websiteId = `${baseUrl}/#website`;
const productId = `${baseUrl}/#product-vitamin-c-serum`;

const productImages = [
  "/valentia/allisonharp_valentiaseptember-64-mqk5osc8.jpeg",
  "/valentia/brand/product-vitc.png",
  "/valentia/brand/packaging.png",
].map(absoluteUrl);

export function absoluteUrl(path = "/") {
  if (/^https?:\/\//.test(path)) {
    return path;
  }

  if (path === "" || path === "/") {
    return `${baseUrl}/`;
  }

  return `${baseUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

export function jsonLdScriptContent(data: JsonLdDocument | JsonLdNode) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export function siteJsonLd() {
  return homePageJsonLd();
}

export function corePageJsonLd(
  fileName: "index.html" | "about.html" | "quiz.html",
  options: CorePageSchemaOptions = {},
) {
  switch (fileName) {
    case "about.html":
      return aboutPageJsonLd(options.path);
    case "quiz.html":
      return quizPageJsonLd(options.path);
    case "index.html":
    default:
      return homePageJsonLd(options.path);
  }
}

export function homePageJsonLd(path = "/") {
  const page = webPageNode({
    path,
    name: "Valentia | Plant-led skincare for skin in transition",
    description:
      "Naturopath-formulated, plant-led skincare for hormonally changing skin. For the woman whose old routine stopped working. Start with the five-minute self-audit.",
    image: "/valentia/allisonharp_valentiaseptember-64-mqk5osc8.jpeg",
    mainEntity: { "@id": productId },
    about: [
      { "@id": brandId },
      { "@id": productId },
      "plant-led vitamin C serum",
      "naturopath-formulated skincare",
      "ingredient transparency",
    ],
    audience: [
      audienceNode(
        "Women 35 to 55 seeking plant-led, ingredient-transparent skincare and a clear self-audit first step",
      ),
      {
        "@type": "BusinessAudience",
        audienceType: "Wholesale skincare buyers and practitioner stockists",
      },
    ],
  });

  return graph([
    breadcrumbNode(path, [{ name: "Home", path: "/" }]),
    page,
    productNode("/#pricing"),
  ]);
}

export function aboutPageJsonLd(path = "/about") {
  const page = webPageNode({
    path,
    type: "AboutPage",
    name: "About Valentia",
    description:
      "Meet Valentia founder Davina Hearne and the practitioner-led philosophy behind the brand.",
    image: "/valentia/brand/photo-2.jpg",
    mainEntity: { "@id": founderId },
    about: [
      { "@id": founderId },
      { "@id": organizationId },
      "naturopathy",
      "perimenopausal transition",
      "clinically meaningful skincare formulation",
    ],
  });

  return graph(
    [
      breadcrumbNode(path, [
        { name: "Home", path: "/" },
        { name: "About", path },
      ]),
      page,
    ],
    { detailedFounder: true },
  );
}

export function quizPageJsonLd(path = "/quiz") {
  const questionnaireId = `${absoluteUrl(path)}#self-audit`;
  const page = webPageNode({
    path,
    name: "Hormonal symptom quiz | Valentia",
    description:
      "A free five-minute self-audit from Valentia founder and naturopath Davina Hearne.",
    mainEntity: { "@id": questionnaireId },
    about: [
      "perimenopause self-audit",
      "hormonal skin changes",
      "sleep disruption",
      "skin in transition",
    ],
  });

  return graph([
    breadcrumbNode(path, [
      { name: "Home", path: "/" },
      { name: "Hormonal symptom quiz", path },
    ]),
    page,
    {
      "@type": "CreativeWork",
      "@id": questionnaireId,
      name: "Valentia hormonal symptom self-audit",
      description:
        "A five-minute educational self-audit that helps visitors identify symptom clusters across skin, sleep, mood, body and stress before joining the Valentia founding list.",
      creator: { "@id": founderId },
      publisher: { "@id": organizationId },
      inLanguage: "en-NZ",
      isPartOf: { "@id": websiteId },
      about: [
        "perimenopause",
        "hormonal symptoms",
        "skin in transition",
        "naturopath-led education",
      ],
    },
  ]);
}

export function contactPageJsonLd() {
  const path = "/contact";

  return graph([
    breadcrumbNode(path, [
      { name: "Home", path: "/" },
      { name: "Contact", path },
    ]),
    webPageNode({
      path,
      type: "ContactPage",
      name: "Contact Valentia",
      description:
        "Contact Valentia for product questions, order support, wholesale, press and partnerships.",
      mainEntity: { "@id": organizationId },
    }),
  ]);
}

export function wholesalePageJsonLd() {
  const path = "/wholesale";
  const serviceId = `${absoluteUrl(path)}#wholesale-service`;

  return graph([
    breadcrumbNode(path, [
      { name: "Home", path: "/" },
      { name: "Wholesale", path },
    ]),
    webPageNode({
      path,
      name: "Valentia Wholesale",
      description:
        "Wholesale and practitioner partnerships for Valentia stockists, clinics, pharmacies and considered retailers.",
      image: "/valentia/brand/packaging.png",
      mainEntity: { "@id": serviceId },
      audience: {
        "@type": "BusinessAudience",
        audienceType: "Clinics, pharmacies, considered retailers and practitioner stockists",
      },
    }),
    {
      "@type": "Service",
      "@id": serviceId,
      name: "Valentia wholesale and practitioner partnerships",
      description:
        "Reviewed wholesale access for practitioners, clinics, pharmacies and considered retailers that want to stock Valentia products.",
      provider: { "@id": organizationId },
      serviceType: "Wholesale skincare stockist partnership",
      areaServed: ["NZ", "AU"],
      audience: {
        "@type": "BusinessAudience",
        audienceType: "Wholesale and practitioner buyers",
      },
      potentialAction: {
        "@type": "ApplyAction",
        target: absoluteUrl("/wholesale#apply"),
        name: "Apply to stock Valentia",
      },
    },
    tradeRangeItemList(path),
  ]);
}

export function wholesalePortalPageJsonLd() {
  const path = "/wholesale/portal";
  const appId = `${absoluteUrl(path)}#stockist-portal`;

  return graph([
    breadcrumbNode(path, [
      { name: "Home", path: "/" },
      { name: "Wholesale", path: "/wholesale" },
      { name: "Stockist Portal", path },
    ]),
    webPageNode({
      path,
      name: "Valentia Stockist Portal",
      description: "Valentia stockist login and wholesale ordering portal preview.",
      image: "/valentia/brand/photo-2.jpg",
      mainEntity: { "@id": appId },
      audience: {
        "@type": "BusinessAudience",
        audienceType: "Approved Valentia stockists and wholesale operators",
      },
    }),
    {
      "@type": "WebApplication",
      "@id": appId,
      name: "Valentia stockist portal",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      description:
        "Owner and stockist access for trade pricing, stock visibility, and wholesale order controls.",
      provider: { "@id": organizationId },
      audience: {
        "@type": "BusinessAudience",
        audienceType: "Approved stockists",
      },
      isAccessibleForFree: false,
    },
  ]);
}

export function journalPageJsonLd() {
  const path = "/journal";
  const listId = `${absoluteUrl(path)}#articles`;

  return graph([
    breadcrumbNode(path, [
      { name: "Home", path: "/" },
      { name: "Journal", path },
    ]),
    webPageNode({
      path,
      type: "CollectionPage",
      name: "Valentia Journal",
      description:
        "Clinical writing from Valentia on perimenopausal hormones, sleep, skin, dosing and daily basics.",
      image: "/valentia/brand/photo-2.jpg",
      mainEntity: { "@id": listId },
      about: ["perimenopause", "sleep and cortisol", "skin in transition", "clinical dosing"],
    }),
    {
      "@type": "ItemList",
      "@id": listId,
      name: "Valentia journal articles",
      numberOfItems: 2,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          url: absoluteUrl("/journal/why-you-wake-at-3am"),
          name: "Why you wake at 3am, and what is actually happening to your cortisol.",
        },
        {
          "@type": "ListItem",
          position: 2,
          url: absoluteUrl("/journal/why-your-skin-changed-at-40"),
          name: "Why your skin changed at 40, and how to formulate for it.",
        },
      ],
    },
  ]);
}

export function wakeAt3amArticleJsonLd() {
  const path = "/journal/why-you-wake-at-3am";
  const articleId = `${absoluteUrl(path)}#article`;

  return graph([
    breadcrumbNode(path, [
      { name: "Home", path: "/" },
      { name: "Journal", path: "/journal" },
      { name: "Why You Wake at 3am", path },
    ]),
    webPageNode({
      path,
      name: "Why You Wake at 3am",
      description:
        "Davina Hearne explains the cortisol and progesterone pattern behind 3am waking in perimenopause.",
      image: "/valentia/brand/photo-2.jpg",
      mainEntity: { "@id": articleId },
      about: ["3am waking", "cortisol", "progesterone", "perimenopause sleep"],
    }),
    {
      "@type": "Article",
      "@id": articleId,
      headline: "Why you wake at 3am, and what is actually happening to your cortisol.",
      description:
        "A naturopath-written educational article on the cortisol and progesterone pattern behind 3am waking in perimenopause.",
      image: absoluteUrl("/valentia/brand/photo-2.jpg"),
      author: { "@id": founderId },
      publisher: { "@id": organizationId },
      mainEntityOfPage: { "@id": pageId(path) },
      inLanguage: "en-NZ",
      articleSection: "Sleep and cortisol",
      about: ["perimenopause", "sleep disruption", "cortisol rhythm", "progesterone"],
    },
  ]);
}

export function skinChangedAt40ArticleJsonLd() {
  const path = "/journal/why-your-skin-changed-at-40";
  const articleId = `${absoluteUrl(path)}#article`;

  return graph([
    breadcrumbNode(path, [
      { name: "Home", path: "/" },
      { name: "Journal", path: "/journal" },
      { name: "Why Your Skin Changed at 40", path },
    ]),
    webPageNode({
      path,
      name: "Why Your Skin Changed at 40",
      description:
        "Davina Hearne explains why skin can become drier, more reactive and less predictable through the perimenopausal transition.",
      image: "/valentia/brand/photo-3.jpg",
      mainEntity: { "@id": articleId },
      about: [
        "skin in transition",
        "perimenopause skin changes",
        "skin barrier",
        "hydration",
      ],
    }),
    {
      "@type": "Article",
      "@id": articleId,
      headline: "Why your skin changed at 40, and how to formulate for it.",
      description:
        "A naturopath-written educational article on barrier, hydration and antioxidant support for skin in transition.",
      image: absoluteUrl("/valentia/brand/photo-3.jpg"),
      author: { "@id": founderId },
      publisher: { "@id": organizationId },
      mainEntityOfPage: { "@id": pageId(path) },
      inLanguage: "en-NZ",
      articleSection: "Skin",
      about: ["perimenopause", "skin barrier", "hydration", "antioxidants"],
    },
  ]);
}

export function wakeAt3amTopicJsonLd() {
  const path = "/topics/why-do-i-wake-at-3am";
  const articleId = `${absoluteUrl(path)}#article`;

  return graph([
    breadcrumbNode(path, [
      { name: "Home", path: "/" },
      { name: "Journal", path: "/journal" },
      { name: "Why Do I Wake at 3am in Perimenopause?", path },
    ]),
    webPageNode({
      path,
      name: "Why Do I Wake at 3am in Perimenopause?",
      description:
        "A naturopath's direct answer to 3am waking in perimenopause, with practical next steps.",
      mainEntity: { "@id": articleId },
      about: ["3am waking", "perimenopause", "magnesium glycinate", "ashwagandha"],
    }),
    {
      "@type": "Article",
      "@id": articleId,
      headline: "Why do I wake at 3am in perimenopause?",
      description:
        "A direct educational answer to the hormonal sleep pattern behind 3am waking in perimenopause.",
      author: { "@id": founderId },
      publisher: { "@id": organizationId },
      mainEntityOfPage: { "@id": pageId(path) },
      inLanguage: "en-NZ",
      articleSection: "Sleep and cortisol",
      about: ["perimenopause", "3am waking", "cortisol", "progesterone"],
    },
  ]);
}

export function cartPageJsonLd() {
  const path = "/cart";
  const listId = `${absoluteUrl(path)}#cart-items`;

  return graph([
    breadcrumbNode(path, [
      { name: "Home", path: "/" },
      { name: "Cart", path },
    ]),
    webPageNode({
      path,
      name: "Valentia Cart",
      description: "Valentia cart for serum subscription and one-time orders.",
      mainEntity: { "@id": listId },
    }),
    productNode("/cart"),
    {
      "@type": "ItemList",
      "@id": listId,
      name: "Valentia cart items",
      numberOfItems: 1,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          item: { "@id": productId },
        },
      ],
    },
  ]);
}

export function checkoutPageJsonLd() {
  const path = "/checkout";

  return graph([
    breadcrumbNode(path, [
      { name: "Home", path: "/" },
      { name: "Cart", path: "/cart" },
      { name: "Checkout", path },
    ]),
    webPageNode({
      path,
      name: "Valentia Checkout",
      description: "Valentia secure checkout layout for Stripe payments.",
      mainEntity: { "@id": productId },
    }),
    productNode("/checkout"),
  ]);
}

export function accountPageJsonLd() {
  const path = "/account";
  const appId = `${absoluteUrl(path)}#account-access`;

  return graph([
    breadcrumbNode(path, [
      { name: "Home", path: "/" },
      { name: "Customer Account", path },
    ]),
    webPageNode({
      path,
      name: "Valentia Customer Account",
      description:
        "Valentia customer account foundation for founding-list members, retail customers, and wholesale-approved buyers.",
      mainEntity: { "@id": appId },
      audience: [
        audienceNode("Retail customers"),
        {
          "@type": "BusinessAudience",
          audienceType: "Wholesale buyers",
        },
      ],
    }),
    {
      "@type": "WebApplication",
      "@id": appId,
      name: "Valentia customer and business account access",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      description:
        "Role-scoped account foundation for retail customers, wholesale buyers and internal Valentia operators.",
      provider: { "@id": organizationId },
      isAccessibleForFree: false,
    },
  ]);
}

export function programmaticPageJsonLd(page: ProgrammaticSchemaInput) {
  const path = `/programmatic/${page.slug}`;
  const articleId = `${absoluteUrl(path)}#article`;
  const suppliedNode = normalizeStructuredNode(page.structuredData);
  const description =
    page.metaDescription ||
    page.body ||
    "A Valentia buyer-intent guide for ingredient-transparent skincare education.";
  const articleNode = {
    "@type": "Article",
    "@id": articleId,
    headline: page.title,
    description,
    author: { "@id": founderId },
    publisher: { "@id": organizationId },
    mainEntityOfPage: { "@id": pageId(path) },
    inLanguage: "en-NZ",
    about: ["Valentia", "vitamin C serum", "ingredient-transparent skincare"],
    ...suppliedNode,
  };

  return graph([
    breadcrumbNode(path, [
      { name: "Home", path: "/" },
      { name: "Programmatic guides", path: "/programmatic" },
      { name: page.title, path },
    ]),
    webPageNode({
      path,
      name: page.title,
      description,
      mainEntity: { "@id": String(articleNode["@id"] || articleId) },
      about: ["vitamin C serum", "sensitive skin", "ingredient transparency"],
    }),
    articleNode,
  ]);
}

function graph(nodes: JsonLdNode[], options: { detailedFounder?: boolean } = {}): JsonLdDocument {
  return {
    "@context": "https://schema.org",
    "@graph": [...identityNodes(options), ...nodes],
  };
}

function identityNodes({ detailedFounder = false }: { detailedFounder?: boolean } = {}) {
  return [
    organizationNode(),
    founderPersonNode(detailedFounder),
    {
      "@type": "Brand",
      "@id": brandId,
      name: siteConfig.name,
      slogan: "Wellness built on patience.",
      logo: absoluteUrl("/valentia/brand/logo-grey.png"),
    },
    {
      "@type": "WebSite",
      "@id": websiteId,
      url: absoluteUrl("/"),
      name: siteConfig.name,
      description: siteConfig.description,
      publisher: { "@id": organizationId },
      inLanguage: "en-NZ",
    },
  ];
}

function organizationNode() {
  return {
    "@type": "Organization",
    "@id": organizationId,
    name: siteConfig.name,
    url: absoluteUrl("/"),
    logo: absoluteUrl("/valentia/brand/logo-grey.png"),
    image: absoluteUrl("/valentia/brand/packaging.png"),
    founder: { "@id": founderId },
    brand: { "@id": brandId },
    email: siteConfig.contactEmail,
    contactPoint: [
      {
        "@type": "ContactPoint",
        email: siteConfig.contactEmail,
        contactType: "customer support",
        areaServed: ["NZ", "AU"],
        availableLanguage: "en",
      },
      {
        "@type": "ContactPoint",
        email: "trade@valentia.com.au",
        contactType: "wholesale partnerships",
        areaServed: ["NZ", "AU"],
        availableLanguage: "en",
      },
      {
        "@type": "ContactPoint",
        email: "press@valentia.com.au",
        contactType: "press and partnerships",
        areaServed: ["NZ", "AU"],
        availableLanguage: "en",
      },
    ],
    knowsAbout: [
      "naturopath-formulated skincare",
      "vitamin C serum",
      "Kakadu plum",
      "ferulic acid",
      "ingredient transparency",
      "clinically meaningful doses",
      "wholesale skincare partnerships",
    ],
  };
}

function founderPersonNode(detailed = false) {
  return {
    "@type": "Person",
    "@id": founderId,
    name: siteConfig.founder,
    jobTitle: "Naturopath and founder",
    affiliation: { "@id": organizationId },
    worksFor: { "@id": organizationId },
    knowsAbout: [
      "naturopathy",
      "nutrition",
      "herbal medicine",
      "perimenopausal transition",
      "plant-led skincare formulation",
    ],
    ...(detailed
      ? {
          description:
            "Davina Hearne is the naturopath founder behind Valentia's practitioner-led skincare and perimenopause education.",
          hasCredential: credentials.map((credential) => ({
            "@type": "EducationalOccupationalCredential",
            name: credential.title,
            description: credential.copy,
          })),
        }
      : {}),
  };
}

function productNode(urlPath: string) {
  return {
    "@type": "Product",
    "@id": productId,
    name: siteConfig.productName,
    brand: { "@id": brandId },
    sku: "VAL-VITC-30ML",
    category: "Skin care serum",
    size: "30 ml",
    image: productImages,
    description:
      "A plant-led vitamin C serum formulated with Kakadu plum, ferulic acid, hyaluronic acid, rosehip oil and vitamin E.",
    url: absoluteUrl(urlPath),
    additionalProperty: [
      propertyValue("Key ingredient", "Kakadu plum"),
      propertyValue("Key ingredient", "Ferulic acid"),
      propertyValue("Key ingredient", "Hyaluronic acid"),
      propertyValue("Key ingredient", "Rosehip oil"),
      propertyValue("Key ingredient", "Vitamin E"),
      propertyValue("Formula position", "No synthetic fragrance, parabens, silicones, drying alcohols or fillers"),
    ],
    offers: [
      {
        "@type": "Offer",
        "@id": `${baseUrl}/#offer-subscription`,
        name: "Monthly serum delivery",
        url: absoluteUrl(urlPath),
        price: "32.00",
        priceCurrency: "NZD",
        availability: "https://schema.org/PreOrder",
        seller: { "@id": organizationId },
      },
      {
        "@type": "Offer",
        "@id": `${baseUrl}/#offer-one-time`,
        name: "One-time 30 ml bottle",
        url: absoluteUrl(urlPath),
        price: "38.00",
        priceCurrency: "NZD",
        availability: "https://schema.org/PreOrder",
        seller: { "@id": organizationId },
      },
    ],
  };
}

function tradeRangeItemList(path: string) {
  const items = [
    "Vitamin C Serum",
    "Bakuchiol Serum",
    "Valentia Daily",
    "The 30-Day Protocol",
  ];

  return {
    "@type": "ItemList",
    "@id": `${absoluteUrl(path)}#trade-range`,
    name: "Valentia trade range",
    numberOfItems: items.length,
    itemListElement: items.map((name, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name,
    })),
  };
}

function webPageNode({
  path,
  name,
  description,
  type = "WebPage",
  image,
  mainEntity,
  about,
  audience,
}: PageNodeOptions) {
  return compact({
    "@type": type,
    "@id": pageId(path),
    url: absoluteUrl(path),
    name,
    description,
    isPartOf: { "@id": websiteId },
    inLanguage: "en-NZ",
    breadcrumb: { "@id": `${absoluteUrl(path)}#breadcrumb` },
    primaryImageOfPage: image
      ? {
          "@type": "ImageObject",
          url: absoluteUrl(image),
        }
      : undefined,
    mainEntity,
    about,
    audience,
  });
}

function breadcrumbNode(path: string, items: BreadcrumbItem[]) {
  return {
    "@type": "BreadcrumbList",
    "@id": `${absoluteUrl(path)}#breadcrumb`,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

function pageId(path: string) {
  return `${absoluteUrl(path)}#webpage`;
}

function audienceNode(audienceType: string) {
  return {
    "@type": "Audience",
    audienceType,
  };
}

function propertyValue(name: string, value: string) {
  return {
    "@type": "PropertyValue",
    name,
    value,
  };
}

function normalizeStructuredNode(data?: Record<string, unknown> | null) {
  if (!data || Array.isArray(data)) {
    return {};
  }

  const node = { ...data };
  delete node["@context"];
  delete node["@graph"];

  return node;
}

function compact(node: JsonLdNode) {
  return Object.fromEntries(
    Object.entries(node).filter(([, value]) => {
      if (value === undefined || value === null || value === "") {
        return false;
      }

      return !(Array.isArray(value) && value.length === 0);
    }),
  );
}
