export const siteConfig = {
  name: "Valentia",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://valentia.co.nz",
  description:
    "A naturopath-formulated one-product skincare line built around a plant-led vitamin C serum and long-term skin balance.",
  founder: "Davina Hearne",
  productName: "Valentia Vitamin C Serum",
  productSlug: "vitamin-c-serum",
  contactEmail: "hello@valentia.co.nz",
};

export const navLinks = [
  { href: "/about", label: "About" },
  { href: "/journal", label: "Journal" },
  { href: "/#pricing", label: "Shop" },
  { href: "/wholesale", label: "Wholesale" },
  { href: "/contact", label: "Contact" },
];

export const benefitCards = [
  {
    title: "Brightens and evens",
    copy: "Kakadu plum delivers plant-derived vitamin C to support a more even, luminous tone over time.",
  },
  {
    title: "Firms and supports",
    copy: "Ferulic acid and vitamin E work with the skin to support natural firmness and resilience.",
  },
  {
    title: "Softens fine lines",
    copy: "Daily antioxidant support helps soften the look of fine lines for a smoother surface.",
  },
  {
    title: "Hydrates and comforts",
    copy: "Hyaluronic acid and rosehip oil bring lasting moisture for skin that feels calm and comfortable.",
  },
  {
    title: "Strengthens the barrier",
    copy: "Cold-pressed botanicals work alongside the skin microbiome to support the natural barrier.",
  },
  {
    title: "Defends daily",
    copy: "Antioxidant support helps protect skin from pollutants and the stress of everyday life.",
  },
];

export const ingredientRows = [
  {
    name: "Kakadu plum",
    copy: "Rich plant source of vitamin C for brightness and tone.",
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
    title: "Cleanse",
    copy: "Start with freshly washed, towel-dried skin so the serum can absorb fully.",
  },
  {
    title: "Apply",
    copy: "Press three or four drops over your face and neck. A little goes a long way.",
  },
  {
    title: "Protect",
    copy: "Follow with moisturizer and SPF. Consistency, not intensity, is what changes skin.",
  },
];

export const testimonials = [
  {
    quote:
      "It took a few weeks, and then one morning my skin just looked calmer and brighter. I trust that it is actually doing something.",
    name: "Maya R.",
  },
  {
    quote:
      "I read the full ingredient list before I bought it. Everything is there, in plain language. That is rare, and it is why I stayed.",
    name: "Priya S.",
  },
  {
    quote:
      "One considered step replaced a shelf of half-used bottles. It has become the part of the morning I look forward to.",
    name: "Jordan L.",
  },
];

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
    question: "How does monthly delivery work?",
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
    copy: "Products, variants, stock movements, media, and wholesale price lists share one backend model.",
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
