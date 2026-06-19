export const siteConfig = {
  name: "Valentia",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://valentia.com",
  description:
    "Naturopath-formulated, plant-led skincare for the woman whose body has stopped making sense.",
  founder: "Davina Hearne",
  productName: "Valentia Vitamin C Serum",
  productSlug: "vitamin-c-serum",
  contactEmail: "hello@valentia.com",
};

export const navLinks = [
  { href: "/about", label: "About" },
  { href: "/journal", label: "Journal" },
  { href: "/#formula", label: "The formula" },
  { href: "/wholesale", label: "Wholesale" },
  { href: "/contact", label: "Contact" },
];

export const benefitCards = [
  {
    title: "Barrier first",
    copy: "Built for skin that feels drier, more reactive, or suddenly less predictable.",
  },
  {
    title: "Comfort over speed",
    copy: "The formula favours steady daily use over sharp actives and fast promises.",
  },
  {
    title: "Disclosed ingredients",
    copy: "Kakadu plum, ferulic acid, hyaluronic acid, rosehip oil, and vitamin E are named plainly.",
  },
  {
    title: "Plant-led support",
    copy: "Botanicals are selected for what they do over weeks and months.",
  },
  {
    title: "No synthetic fragrance",
    copy: "Nothing added that does not need to be there.",
  },
  {
    title: "Validation first",
    copy: "The first public flow is the self-audit and founding list, not a live cart.",
  },
];

export const ingredientRows = [
  {
    name: "Kakadu plum",
    copy: "Rich plant source of vitamin C for brightness and tone over time.",
  },
  {
    name: "Ferulic acid",
    copy: "Stabilises vitamin C and supports antioxidant action.",
  },
  {
    name: "Rosehip oil",
    copy: "Cold-pressed oil selected for suppleness and comfort.",
  },
  {
    name: "Hyaluronic acid",
    copy: "Helps hold moisture in the skin for lasting hydration.",
  },
  {
    name: "Vitamin E",
    copy: "Nourishes and supports skin against everyday stress.",
  },
];

export const ritualSteps = [
  {
    title: "Recognise",
    copy: "Start by naming the pattern across skin, sleep, mood, and stress.",
  },
  {
    title: "Simplify",
    copy: "Use fewer moving parts while the skin barrier settles.",
  },
  {
    title: "Return",
    copy: "Build a daily rhythm that supports comfort and consistency.",
  },
];

export const testimonials: Array<{ quote: string; name: string }> = [];

export const faqs = [
  {
    question: "Where should I start?",
    answer:
      "Start with the free Hormonal Skin Check-In. It shows a likely stage on screen and gives you the option to receive the full result by email.",
  },
  {
    question: "Can I buy the serum today?",
    answer:
      "The public site is validation-first. The serum is shown as the formula Valentia is starting with, while the founding list helps decide what returns first.",
  },
  {
    question: "Is this medical advice?",
    answer:
      "No. Valentia publishes educational content only. Always speak to your healthcare provider about symptoms, medication, or diagnosis.",
  },
  {
    question: "What makes the formula different?",
    answer:
      "It is practitioner-formulated, plant-led, and built around disclosed ingredients rather than proprietary blends or fast transformation claims.",
  },
  {
    question: "Do you support wholesale clients?",
    answer:
      "Yes. Wholesale interest and stockist accounts are part of the platform foundation, with access reviewed before trade ordering opens.",
  },
];

export const platformPillars = [
  {
    title: "Inventory truth",
    copy: "Products, variants, stock movements, media, and wholesale access share one backend model.",
  },
  {
    title: "Customer levels",
    copy: "Profiles, business memberships, and role-based access separate retail, wholesale, content, ads, SEO, and admin work.",
  },
  {
    title: "Agent-readable growth",
    copy: "Programmatic pages, schema records, SEO keywords, media metadata, and ad metrics are stored in structured tables.",
  },
];
