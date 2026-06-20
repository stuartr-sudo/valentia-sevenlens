export const siteConfig = {
  name: "Valentia",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://valentia.com",
  description:
    "Naturopath-formulated, plant-led skincare centred on the Valentia Vitamin C Serum, ingredient transparency, and long-term skin balance.",
  founder: "Davina Hearne",
  productName: "Valentia Vitamin C Serum",
  productSlug: "vitamin-c-serum",
  contactEmail: "hello@valentia.com.au",
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
    title: "One daily ritual",
    copy: "A single serum built for consistent morning use, with subscription and one-time purchase paths.",
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
    question: "How is this different from other vitamin C serums?",
    answer:
      "Most serums rely on synthetic L-ascorbic acid, which oxidises quickly. Valentia uses plant-derived vitamin C from Kakadu plum, stabilised with ferulic acid, so it stays gentle and effective with daily use.",
  },
  {
    question: "When will I see a difference?",
    answer:
      "Skincare works on rhythm, not speed. Most people notice a calmer, more comfortable complexion within the first weeks; a more even tone tends to follow with consistent daily use.",
  },
  {
    question: "Is it suitable for sensitive skin?",
    answer:
      "Yes. The formula is free of synthetic fragrance, parabens, and silicones. As with any new product, a short patch test over the first few days is a sensible place to start.",
  },
  {
    question: "How does the monthly delivery work?",
    answer:
      "Your serum arrives every month at the founding price. You can pause, adjust, or stop it at any time from your account. There are no fees and no commitment.",
  },
  {
    question: "What is your guarantee?",
    answer:
      "Every order is backed by a 60-day money-back guarantee. If it is not right for you, reach out and we will make it right.",
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
