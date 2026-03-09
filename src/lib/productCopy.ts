// Premium DTC copy for TRETRA product categories
// Voice: Premium — elevated, confident, luxury-adjacent

export interface ProductCopy {
  hook: string;
  benefits: string[];
  specs: { material: string; size: string; care: string; shipping: string };
  faqs: Array<{ q: string; a: string }>;
  seo: { title: string; metaDescription: string };
  imageAlts: string[];
  collectionIntro: string;
}

type CategoryKey = "half-zip" | "fur-lined" | "dtf-printed" | "sweatpants" | "oversized-tee" | "basic-tee" | "default";

function detectCategory(title: string, handle: string): CategoryKey {
  const lower = (title + " " + handle).toLowerCase();
  if (lower.includes("half-zip")) return "half-zip";
  if (lower.includes("fur-lined") || lower.includes("fur lined") || lower.includes("miu miu")) return "fur-lined";
  if (lower.includes("dtf") || lower.includes("edition") || lower.includes("embroidered")) return "dtf-printed";
  if (lower.includes("sweatpants") || lower.includes("wide-leg")) return "sweatpants";
  if (lower.includes("oversized") && (lower.includes("t-shirt") || lower.includes("tee"))) return "oversized-tee";
  if (lower.includes("basic") && (lower.includes("t-shirt") || lower.includes("tee"))) return "basic-tee";
  return "default";
}

const categoryData: Record<CategoryKey, Omit<ProductCopy, "seo" | "imageAlts">> = {
  "half-zip": {
    hook: "The hoodie that turns heads before you even speak.",
    benefits: [
      "380gsm heavy-weight cotton that drapes with authority",
      "Half-zip closure for effortless layering versatility",
      "Oversized drop-shoulder cut — moves with you, never against",
      "Pre-shrunk fabric that holds its shape wash after wash",
      "Reinforced double-stitched seams built for years, not seasons",
    ],
    specs: {
      material: "100% Premium Heavy Cotton, 380gsm",
      size: "S – 3XL · Oversized drop-shoulder fit (size down for fitted)",
      care: "Machine wash cold · Tumble dry low · Do not bleach",
      shipping: "Free shipping over 1,500 EGP · 2–4 days domestic · 7–14 days international",
    },
    faqs: [
      { q: "Will this shrink after washing?", a: "No. Every piece is pre-shrunk before it reaches you. The fit you try on is the fit you keep — wash after wash, guaranteed." },
      { q: "Is the oversized fit too baggy?", a: "Our drop-shoulder silhouette is engineered, not accidental. It's relaxed through the body with a structured shoulder line that keeps you looking intentional, never sloppy." },
      { q: "How does the half-zip compare to a full hoodie?", a: "The half-zip gives you range — layer it over a tee, pop the collar for edge, or zip it down for a relaxed look. It's three silhouettes in one piece." },
    ],
    collectionIntro: "The Half-Zip Collection is where function meets refined fashion from 380gsm heavy cotton with a precision-cut oversized silhouette, each piece delivers the weight and presence of luxury outerwear — without the pretense. Designed for those who dress with intention, not trend. Available in a curated palette that pairs back to everything in your rotation.",
  },
  "fur-lined": {
    hook: "Luxury you can feel before you even put it on.",
    benefits: [
      "Plush fur-lined interior for unmatched warmth and comfort",
      "Premium heavy cotton exterior with a refined drape",
      "Oversized silhouette that elevates any cold-weather fit",
      "Statement-level design rooted in everyday wearability",
      "Double-stitched construction for enduring quality",
    ],
    specs: {
      material: "Heavy Cotton Shell · Faux Fur Lining · 380gsm+",
      size: "S – 3XL · Oversized fit (size down for fitted)",
      care: "Machine wash cold inside-out · Hang dry recommended · Do not iron fur lining",
      shipping: "Free shipping over 500 EGP · 2–4 days domestic · 7–14 days international",
    },
    faqs: [
      { q: "Is the fur lining real or faux?", a: "We use premium faux fur — ethically crafted, impossibly soft. You get the luxury feel without compromise." },
      { q: "Will it be too warm for mild weather?", a: "The breathable cotton shell balances the fur interior. It's your ideal layer for cool-to-cold temperatures — not a furnace, just perfectly insulated." },
      { q: "How do I maintain the fur lining?", a: "Wash inside-out on cold, hang dry. The fur is engineered to stay plush and pill-free through regular wear. Avoid direct heat or ironing the interior." },
    ],
    collectionIntro: "The Fur-Lined Collection redefines winter strfasfasfashionairs a heavy cotton exterior with a sumptuous faux-fur interior — delivering warmth that feels like an indulgence, not a necessity. Bold enough to make a statement, refined enough for every day. This is cold-weather dressing elevated to its highest form.",
  },
  "dtf-printed": {
    hook: "Wearable art that refuses to fade into the background.",
    benefits: [
      "DTF-printed graphics with razor-sharp detail and zero cracking",
      "380gsm heavy cotton base for a premium, weighted feel",
      "Vibrant prints engineered to outlast 100+ washes",
      "Oversized drop-shoulder fit for effortless street presence",
      "Limited-edition designs — once they're gone, they're gone",
    ],
    specs: {
      material: "100% Premium Heavy Cotton, 380gsm · DTF Transfer Print",
      size: "S – 3XL · Oversized drop-shoulder fit (size down for fitted)",
      care: "Machine wash cold inside-out · Tumble dry low · Do not iron over print",
      shipping: "Free shipping over 500 EGP · 2–4 days domestic · 7–14 days international",
    },
    faqs: [
      { q: "Will the print crack or peel over time?", a: "Never. Our DTF transfer technology bonds at the fiber level — it flexes with the fabric, doesn't sit on top. No cracking, no peeling, period." },
      { q: "Are these truly limited edition?", a: "Yes. Each edition has a finite production run. When a design sells out, it doesn't come back. What you're buying is exclusivity." },
      { q: "How vibrant will the colors stay after washing?", a: "Our prints are tested to 100+ wash cycles with zero color degradation. Wash inside-out on cold for best results, but even without that — these colors hold." },
    ],
    collectionIntro: "The DTF Printed Collection is where streetfashiofashionble art. Each edition features meticulously crafted graphics on our signature 380gsm heavy cotton canvas — bold, vivid, and built to last. These aren't mass-produced prints. They're limited runs designed for individuals who wear their identity, not follow it.",
  },
  "sweatpants": {
    hook: "Wide-leg comfort that commands the street.",
    benefits: [
      "Wide-leg relaxed silhouette for effortless movement",
      "380gsm heavyweight cotton fleece — substantial without bulk",
      "Elastic waistband with drawstring for the perfect fit",
      "Deep side pockets for everyday utility",
      "Pre-shrunk fabric that holds its shape",
    ],
    specs: {
      material: "100% Premium Heavy Cotton Fleece, 380gsm",
      size: "M – 2XL · Relaxed wide-leg fit",
      care: "Machine wash cold · Tumble dry low · Do not bleach",
      shipping: "Free shipping over 500 EGP · 2–4 days domestic · 7–14 days international",
    },
    faqs: [
      { q: "Are these too warm for summer?", a: "The cotton fleece is breathable despite its weight. They're perfect for cool evenings and air-conditioned spaces — plus the wide leg allows maximum airflow." },
      { q: "Will they bag out at the knees?", a: "No. Our pre-shrunk heavyweight cotton holds its shape. The wide-leg cut is designed to drape clean, not stretch out." },
      { q: "What shoes work best with wide-leg?", a: "Everything from chunky sneakers to slides. The wide silhouette creates a balanced, proportional look with any footwear." },
    ],
    collectionIntro: "The Wide-Leg Sweatpants are summer streetweaessentialsd. Cut from 380gsm heavyweight cotton fleece with a relaxed wide-leg silhouette that moves with intention. Elastic waistband, deep pockets, and a drape that commands attention without trying.",
  },
  "oversized-tee": {
    hook: "The tee that makes everything else in your wardrobe irrelevant.",
    benefits: [
      "280gsm heavyweight cotton with a premium hand-feel",
      "Drop shoulder oversized cut for street-ready presence",
      "Pre-washed for instant softness and zero shrinkage",
      "Ribbed crew neck that holds its shape",
      "Slightly curved hem for a modern silhouette",
    ],
    specs: {
      material: "100% Premium Heavy Cotton, 280gsm",
      size: "M – 2XL · Oversized drop-shoulder fit",
      care: "Machine wash cold · Tumble dry low · Do not bleach",
      shipping: "Free shipping over 500 EGP · 2–4 days domestic · 7–14 days international",
    },
    faqs: [
      { q: "How oversized is the fit?", a: "Intentionally relaxed with drop shoulders and a boxy body. If you want a more fitted look, size down one. For the street silhouette, go true to size." },
      { q: "Is 280gsm heavy enough?", a: "For a tee, 280gsm is premium territory. It has weight and structure without being stiff — drapes beautifully while maintaining its shape all day." },
      { q: "Will the color fade after washing?", a: "Our colorfast process locks the dye deep into the fiber. Machine wash cold and your color stays rich wash after wash." },
    ],
    collectionIntro: "The Oversized Tee Collection is TRETRA's answer to summer. 280gsm heavyweight cotton, drop-shoulder engineering, and a relaxed silhouette that pairs with everything. Pre-washed for day-one softness. Built for heat, styled for the street.",
  },
  "basic-tee": {
    hook: "The foundation piece your wardrobe's been missing.",
    benefits: [
      "220gsm soft cotton for all-day breathable comfort",
      "Classic regular fit that flatters every body type",
      "Ribbed crew neck engineered for durability",
      "Pre-shrunk fabric — zero surprises after washing",
      "Versatile enough to layer or wear standalone",
    ],
    specs: {
      material: "100% Soft Cotton, 220gsm",
      size: "M – 2XL · Classic regular fit",
      care: "Machine wash cold or warm · Tumble dry low · Iron safe",
      shipping: "Free shipping over 500 EGP · 2–4 days domestic · 7–14 days international",
    },
    faqs: [
      { q: "What makes this different from a regular tee?", a: "The cut, the cotton, the construction. Premium 220gsm cotton with reinforced seams and a fit that was pattern-tested dozens of times. You'll feel the difference." },
      { q: "Is this see-through?", a: "No. At 220gsm, our cotton has enough weight to be fully opaque while still being breathable for summer." },
      { q: "Can I layer this under hoodies?", a: "Absolutely. The classic fit was designed as the perfect layering base. Pair it under any TRETRA hoodie for a complete look." },
    ],
    collectionIntro: "The Basics Collection strips everything back to what matters — perfect fit, premium cotton, and clean construction. 220gsm soft cotton in classic silhouettes that form the foundation of any wardrobe. Simple by design, exceptional by craft.",
  },
  default: {
    hook: "Engineered for those who refuse to blend in.",
    benefits: [
      "380gsm heavy-weight premium cotton construction",
      "Oversized drop-shoulder silhouette for effortless presence",
      "Pre-shrunk & colorfast — built to endure",
      "Reinforced double-stitched seams throughout",
      "Unisex fit across sizes S to 3XL",
    ],
    specs: {
      material: "100% Premium Heavy Cotton, 380gsm",
      size: "S – 3XL · Oversized fit (size down for fitted)",
      care: "Machine wash cold · Tumble dry low · Do not bleach",
      shipping: "Free shipping over 500 EGP · 2–4 days domestic · 7–14 days international",
    },
    faqs: [
      { q: "Will this shrink after washing?", a: "No. Every piece is pre-shrunk before shipping. The fit you receive is the fit you keep." },
      { q: "Is the oversized fit too baggy?", a: "Our silhouette is engineered — relaxed body, structured shoulders. Intentional, never sloppy." },
      { q: "What's your return policy?", a: "14-day returns on unworn items with tags attached. We want you confident in every purchase." },
    ],
    collectionIntro: "TRETRA is premium fashion for the self-assured. Crafted from 380gsm heavy cotton with obsessive attention to fit, fabric, and finish. Every piece is designed to be worn with conviction — season after season.",
  },
};

export function getProductCopy(title: string, handle: string): ProductCopy {
  const category = detectCategory(title, handle);
  const data = categoryData[category];

  // Extract color/edition from title for SEO
  const cleanTitle = title.replace(/^Oversized Heavy Cotton Hoodie – DTF Printed – /, "").replace(/ Edition$/, "");
  const seoKeyword = cleanTitle.length < 40 ? cleanTitle : title.split(" ").slice(0, 5).join(" ");

  return {
    ...data,
    seo: {
      title: `${seoKeyword} | TRETRA Premium Fashion`.slice(0, 60),
      metaDescription: `Shop the ${cleanTitle} from TRETRA. ${data.hook} 380gsm heavy cotton, oversized fit, free shipping over 500 EGP. Premium Egyptian fashion.`.slice(0, 155),
    },
    imageAlts: [
      `${title} - Front view | TRETRA`,
      `${title} - Detail shot | Premium cotton`,
      `${title} - Side angle | ${category === "sweatpants" ? "Wide-leg fit" : category === "oversized-tee" ? "Oversized drop-shoulder" : "Oversized fit"}`,
      `${title} - Lifestyle | TRETRA ${category === "half-zip" ? "Half-Zip" : category === "sweatpants" ? "Sweatpants" : category.includes("tee") ? "T-Shirt" : "Hoodie"} Collection`,
    ],
  };
}
