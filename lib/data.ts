/* ---------------------------------------------------------------------------
   LUXEN content. Research-peptide / laboratory R&D vertical.
   For laboratory research and in-vitro studies only — not for human or
   veterinary consumption. All imagery routed through Unsplash CDN; swap the
   IDs in IMG to change art.
--------------------------------------------------------------------------- */

/* All imagery is saved locally under /public/images and themed to the
   research-peptide / laboratory vertical. */
export const IMG = {
  heroPeople: "/images/hero-2.jpeg",
  discover: "/images/about.jpeg",
  alex: "/images/team-1.jpg",
  statLab: "/images/lab-bench.jpg",
  statDiag: "/images/molecular.jpg",
  process: "/images/process-dna.jpg",
  appointment: "/images/order-team.jpg",
  doc1: "/images/team-1.jpg",
  doc2: "/images/team-2.jpg",
  doc3: "/images/team-3.jpg",
  doc4: "/images/team-4.jpg",
  blog1: "/images/blog-1.jpg",
  blog2: "/images/blog-2.jpg",
  blog3: "/images/blog-3.jpg",
  av1: "/images/avatar-1.jpg",
  av2: "/images/avatar-2.jpg",
  av3: "/images/avatar-3.jpg",
  av4: "/images/avatar-4.jpg",
  av5: "/images/avatar-1.jpg",
};

export const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Products", href: "#services" },
  { label: "Our Team", href: "#team" },
  { label: "Order", href: "#appointment" },
  { label: "Reviews", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

export const BRAND_LOGOS = [
  "BioAssay",
  "PureChem",
  "LabVerify",
  "Cryologix",
  "AnalytiQ",
  "PeptiServe",
  "Verispec",
  "Helix Labs",
];

/* Research-grade compounds. Catalog. Every batch independently lab tested.
   Supplied lyophilised for in-vitro research only. */
export type Product = {
  slug: string;
  title: string;
  desc: string;
  long: string;
  img: string;
  gallery?: string[];
  icon: string;
  price: number;
  specs: { label: string; value: string }[];
};

export const SERVICES: Product[] = [
  {
    slug: "bpc-157-tb-500",
    title: "BPC-157 & TB-500",
    desc: "A regenerative research blend studied across tissue-repair and motility models. Supplied lyophilised at ≥99% HPLC-verified purity.",
    long: "A combined research blend of BPC-157 (a pentadecapeptide) and TB-500 (a synthetic thymosin beta-4 fragment), widely used in tissue-repair, angiogenesis, and motility research models. Each lyophilised vial is independently assayed for purity, content, and identity, and ships with a certificate of analysis.",
    img: "/images/bpc/bpcfrontnew.jpg",
    gallery: [
      "/images/bpc/bpcfrontnew.jpg",
      "/images/bpc/bpcpen.jpg",
      "/images/bpc/bpcopen.jpg",
      "/images/bpc/uvbpc.jpg",
    ],
    icon: "flask",
    price: 130,
    specs: [
      { label: "Quantity", value: "40 mg" },
      { label: "Purity", value: "≥99% (HPLC)" },
      { label: "Form", value: "Lyophilised powder" },
      { label: "Testing", value: "Janoshik third-party" },
    ],
  },
  {
    slug: "retatrutide",
    title: "Retatrutide",
    desc: "Triple-agonist research peptide for metabolic-pathway investigation. Batch-tested for purity, content, and stability.",
    long: "A triple-agonist research peptide used to investigate GLP-1 / GIP / glucagon receptor pathways in controlled metabolic studies. Every batch is independently verified for purity, content, and long-term stability, with documentation provided per lot.",
    img: "/images/retafourty/retafrontnew.jpg",
    gallery: [
      "/images/retafourty/retafrontnew.jpg",
      "/images/retafourty/retpen.jpg",
      "/images/retafourty/retaopen.jpg",
      "/images/retafourty/retauv.jpg",
    ],
    icon: "dna",
    price: 180,
    specs: [
      { label: "Quantity", value: "20–40 mg" },
      { label: "Purity", value: "≥99% (HPLC)" },
      { label: "Form", value: "Lyophilised powder" },
      { label: "Testing", value: "Janoshik third-party" },
    ],
  },
  {
    slug: "tirzepatide",
    title: "Tirzepatide",
    desc: "Dual GIP/GLP-1 receptor research compound for in-vitro metabolic studies. Each lot ships with a certificate of analysis.",
    long: "A dual GIP/GLP-1 receptor research compound for in-vitro metabolic-pathway investigation. Synthesised to research-grade standards and independently assayed, each lot ships with a certificate of analysis confirming purity and content.",
    img: "/images/tirzepetide/Artboard2.jpg",
    gallery: [
      "/images/tirzepetide/Artboard2.jpg",
      "/images/tirzepetide/Artboard2copy.jpg",
      "/images/tirzepetide/trizyopen.jpg",
      "/images/tirzepetide/trizyuv.jpg",
    ],
    icon: "microscope",
    price: 100,
    specs: [
      { label: "Quantity", value: "40 mg" },
      { label: "Purity", value: "≥99% (HPLC)" },
      { label: "Form", value: "Lyophilised powder" },
      { label: "Testing", value: "Janoshik third-party" },
    ],
  },
  {
    slug: "glow-ghk-cu",
    title: "Glow (GHK-Cu)",
    desc: "Copper-binding tripeptide explored in matrix and skin-model research. Precisely measured and third-party verified.",
    long: "A copper-binding tripeptide (GHK-Cu) explored in extracellular-matrix and skin-model research. Precisely measured, lyophilised, and independently verified for purity and identity so results stay reproducible across batches.",
    img: "/images/glow/glowfrontnew.jpg",
    gallery: [
      "/images/glow/glowfrontnew.jpg",
      "/images/glow/glowpen.jpg",
      "/images/glow/glowopen.jpg",
      "/images/glow/glowuv.jpg",
    ],
    icon: "droplet",
    price: 100,
    specs: [
      { label: "Quantity", value: "70 mg" },
      { label: "Purity", value: "≥99% (HPLC)" },
      { label: "Form", value: "Lyophilised powder" },
      { label: "Testing", value: "Janoshik third-party" },
    ],
  },
];

export const getProduct = (slug: string) => SERVICES.find((p) => p.slug === slug);

export const WHY = [
  { title: "Independently verified", desc: "Every batch is third-party lab tested for purity and content before release.", icon: "flask" },
  { title: "Cold-chain integrity", desc: "Temperature-controlled handling from synthesis through to your bench.", icon: "snowflake" },
  { title: "Tracked global shipping", desc: "Discreet, fully tracked dispatch with chain-of-custody on every order.", icon: "truck" },
  { title: "Research-grade purity", desc: "≥99% HPLC-verified peptides for reproducible, dependable results.", icon: "shield" },
];

export const PROCESS = [
  { step: "Step", num: "1", title: "Select & Order", desc: "Browse the catalog and choose your research-grade compounds with confidence." },
  { step: "Step", num: "2", title: "Verify & Test", desc: "Each batch is independently lab tested — certificates of analysis included." },
  { step: "Step", num: "3", title: "Cold-Chain Delivery", desc: "Tracked, temperature-controlled shipping straight to your laboratory." },
];

export const TEAM = [
  { name: "Dr. Elena Voss", role: "Head of Peptide Synthesis", img: IMG.doc1 },
  { name: "Dr. Marcus Hale", role: "Analytical Chemistry Lead", img: IMG.doc4 },
  { name: "Dr. Priya Nair", role: "Quality & Compliance Director", img: IMG.doc3 },
  { name: "Dr. Adrian Kovač", role: "Research Operations Lead", img: IMG.doc2 },
];

export const VALUE_CHIPS = [
  "Purity First",
  "Independent Testing",
  "Cold-Chain",
  "Transparency",
  "Reproducibility",
  "Compliance",
  "Batch Traceability",
  "Discreet Shipping",
  "Research Integrity",
];

export const TESTIMONIALS = [
  {
    quote:
      "The certificates of analysis matched our own HPLC results to the decimal. Reordering has become the easiest part of running the lab.",
    name: "Research Associate, Cell Biology Lab",
    avatar: IMG.av1,
  },
  {
    quote:
      "Consistent purity across batches is what we care about most, and LUXEN delivers it every single time. Cold-chain arrived intact.",
    name: "Principal Investigator",
    avatar: IMG.av2,
  },
  {
    quote:
      "Transparent testing and fast, tracked shipping. Procurement used to be a headache — now it's a two-minute task.",
    name: "Lab Procurement Manager",
    avatar: IMG.av3,
  },
  {
    quote:
      "Reproducible results start with reliable reagents. The documentation and batch traceability give us complete peace of mind.",
    name: "Biochemistry PhD Candidate",
    avatar: IMG.av4,
  },
];

export const POSTS = [
  {
    title: "Understanding Peptide Purity: Why HPLC Verification Matters",
    category: "Lab Standards",
    date: { day: "20", dow: "TUE" },
    img: IMG.blog1,
  },
  {
    title: "Cold-Chain Logistics for Temperature-Sensitive Research Compounds",
    category: "Logistics",
    date: { day: "20", dow: "TUE" },
    img: IMG.blog2,
  },
  {
    title: "Reading a Certificate of Analysis: A Researcher's Quick Guide",
    category: "Quality",
    date: { day: "20", dow: "TUE" },
    img: IMG.blog3,
  },
];

export const STATS = {
  consultations: { pct: 99, label: "Verified Purity", desc: "Every batch is independently tested by accredited third-party laboratories, with HPLC purity verification documented on each certificate of analysis." },
  treatments: { pct: 98, label: "Batch Consistency", desc: "Our synthesis and quality controls keep content and identity consistent from lot to lot, so your research stays reproducible." },
  diagnostics: { pct: 96, label: "On-Time Delivery", desc: "Cold-chain tracked shipping keeps temperature-sensitive compounds stable and arriving on schedule, anywhere in the world." },
};
