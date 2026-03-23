// Humanized DTC copy for TRETRA product categories
// Voice: Conversational, real, confident — like a friend who knows fashion

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
    hook: "You know that hoodie you reach for every single time? This is it — but better.",
    benefits: [
      "380gsm heavy cotton that feels like a warm hug (seriously, you'll get it when you touch it)",
      "Half-zip so you can throw it on over anything without messing up your hair",
      "Oversized drop-shoulder — looks intentional, never sloppy, trust us on this",
      "Pre-shrunk already, so what you get is what you keep. No surprises.",
      "Double-stitched everywhere because we hate it when things fall apart too",
    ],
    specs: {
      material: "100% Premium Heavy Cotton, 380gsm",
      size: "S – 3XL · Oversized drop-shoulder (go one size down if you want it fitted)",
      care: "Machine wash cold · Tumble dry low · Skip the bleach",
      shipping: "Free over 1,500 EGP · 2–4 days in Egypt · 7–14 days international",
    },
    faqs: [
      { q: "Will it shrink on me?", a: "Nope. We pre-shrink everything before it ships. The fit you try on is the fit you'll have 50 washes from now. We promise." },
      { q: "Is the oversized fit gonna look weird on me?", a: "Honestly? It looks good on everyone. The drop-shoulder gives it structure so it drapes right — you'll look like you planned it, not like you borrowed your older brother's hoodie." },
      { q: "Why half-zip instead of a regular hoodie?", a: "Because one piece, three vibes — zip it up for a clean look, pop the collar for some edge, or leave it open over a tee. You basically get three outfits in one." },
    ],
    collectionIntro: "Okay so here's the deal — we took 380gsm heavy cotton, gave it a drop-shoulder cut that actually flatters, and added a half-zip because honestly, pullover hoodies can be annoying. The result? Something that looks like it costs way more than it does. Layer it, wear it solo, throw it on for a late-night run — it just works.",
  },
  "fur-lined": {
    hook: "Put this on once and you'll never want to take it off. We're not exaggerating.",
    benefits: [
      "Faux fur lining inside that genuinely feels ridiculous (in the best way)",
      "Heavy cotton outside so it still looks clean and structured",
      "Oversized fit that makes cold-weather dressing actually exciting",
      "Warm enough for the coldest nights without looking like a sleeping bag",
      "Double-stitched construction — built to last, not just one winter",
    ],
    specs: {
      material: "Heavy Cotton Shell · Premium Faux Fur Lining · 380gsm+",
      size: "S – 3XL · Oversized fit (size down one for snug)",
      care: "Wash inside-out on cold · Hang dry for best results · Don't iron the fur part",
      shipping: "Free over 1,500 EGP · 2–4 days in Egypt · 7–14 days international",
    },
    faqs: [
      { q: "Is the fur real?", a: "It's faux — and honestly, it's softer than most real fur we've felt. Ethically made, impossibly cozy. You won't be able to tell the difference." },
      { q: "Won't I overheat in this?", a: "The cotton shell breathes, so it balances out. Think of it as your perfect layer for anything below 20°C — you stay warm without turning into a radiator." },
      { q: "How do I wash it without ruining the fur?", a: "Just flip it inside-out, wash on cold, and hang dry. The fur is made to stay plush — we tested it. No pilling, no flattening." },
    ],
    collectionIntro: "We wanted to make something you'd actually be excited to wear when it gets cold. So we lined our heavyweight cotton with the softest faux fur we could find and gave it an oversized cut that looks as good as it feels. It's warm, it's cozy, and people will ask you where you got it. Every time.",
  },
  "dtf-printed": {
    hook: "Not just a hoodie — it's a conversation starter you can wear.",
    benefits: [
      "DTF prints that stay sharp and vivid, no cracking or peeling ever",
      "380gsm heavy cotton base — the kind that makes you go 'oh wow' when you hold it",
      "Prints tested to 100+ washes because we're a little obsessive like that",
      "Drop-shoulder oversized fit for that effortless street look",
      "Limited runs — once a design sells out, it's gone for real",
    ],
    specs: {
      material: "100% Premium Heavy Cotton, 380gsm · DTF Transfer Print",
      size: "S – 3XL · Oversized drop-shoulder (size down for fitted)",
      care: "Wash inside-out on cold · Tumble dry low · Don't iron directly on the print",
      shipping: "Free over 1,500 EGP · 2–4 days in Egypt · 7–14 days international",
    },
    faqs: [
      { q: "Will the print crack over time?", a: "Nah. DTF technology bonds into the fabric fiber — it literally becomes part of the hoodie. It flexes, stretches, and washes without cracking. Ever." },
      { q: "Are these actually limited edition?", a: "Yes, for real. We do small production runs and when they sell out, we move on to the next design. No restocks, no 'back by popular demand.' If you like it, grab it." },
      { q: "How long will the colors stay bright?", a: "We've tested them past 100 washes and the colors still pop. Wash inside-out on cold if you want to be safe, but honestly — these prints are stubborn in the best way." },
    ],
    collectionIntro: "Each piece in this collection is basically a canvas. We put serious time into the graphics, print them using DTF tech that doesn't crack or fade, and put it all on our signature 380gsm cotton. Every design is a limited run — once they're gone, they're gone. No regrets, yeah?",
  },
  sweatpants: {
    hook: "The kind of sweatpants you can actually wear outside the house and feel good about.",
    benefits: [
      "Wide-leg cut that looks cool with literally everything — sneakers, slides, whatever",
      "380gsm cotton fleece that has weight to it but still breathes",
      "Elastic waistband with drawstring because comfort is non-negotiable",
      "Deep side pockets — your phone, keys, wallet, all secure",
      "Pre-shrunk so they won't surprise you after the first wash",
    ],
    specs: {
      material: "100% Premium Heavy Cotton Fleece, 380gsm",
      size: "M – 2XL · Relaxed wide-leg fit",
      care: "Machine wash cold · Tumble dry low · Skip the bleach",
      shipping: "Free over 1,500 EGP · 2–4 days in Egypt · 7–14 days international",
    },
    faqs: [
      { q: "Won't they be too hot for summer?", a: "Surprisingly no. The wide leg lets air flow and the cotton breathes. They're perfect for cool evenings and AC weather — which, let's be honest, is most of the time." },
      { q: "Will they bag out at the knees?", a: "Not these. The heavyweight cotton holds its shape and the wide-leg design means there's no stretching at pressure points. They drape the same on day 100 as day 1." },
      { q: "What should I wear on my feet with these?", a: "Literally anything. Chunky sneakers look fire, slides keep it casual, even boots work for a streetwear vibe. The wide leg makes everything look proportional." },
    ],
    collectionIntro: "We made these because we were tired of sweatpants that look lazy. These ones? 380gsm cotton fleece, wide-leg cut, deep pockets. They're comfortable enough for your couch but styled enough for the street. Wear them with confidence — you'll get compliments, we guarantee it.",
  },
  "oversized-tee": {
    hook: "Once you wear a 280gsm tee, every other t-shirt feels like tissue paper.",
    benefits: [
      "280gsm heavyweight cotton — it has that satisfying weight you didn't know you needed",
      "Drop-shoulder oversized cut that just... works on everyone",
      "Pre-washed so it's soft from day one, not day twenty",
      "Ribbed crew neck that stays put and doesn't stretch out",
      "Slightly curved hem because we're detail nerds like that",
    ],
    specs: {
      material: "100% Premium Heavy Cotton, 280gsm",
      size: "M – 2XL · Oversized drop-shoulder fit",
      care: "Machine wash cold · Tumble dry low · No bleach please",
      shipping: "Free over 1,500 EGP · 2–4 days in Egypt · 7–14 days international",
    },
    faqs: [
      { q: "How oversized are we talking?", a: "Think relaxed but intentional. Drop shoulders, boxy body, but it still has shape. For a more fitted vibe, just size down one. For that street silhouette, go true to size." },
      { q: "Is 280gsm actually heavy for a tee?", a: "For a t-shirt? It's a game-changer. Most fast-fashion tees are 160-180gsm. At 280gsm you get structure, drape, and that 'premium' feel you can't fake." },
      { q: "Will the color stay?", a: "Yep. We use a colorfast process that locks the dye in deep. Your black stays black, your colors stay rich. Wash after wash." },
    ],
    collectionIntro: "We spent months getting this tee right. 280gsm cotton with a drop-shoulder cut, pre-washed for immediate softness, and a ribbed neck that actually holds up. It's the kind of tee that replaces five lesser tees in your wardrobe. Simple? Yes. Basic? Absolutely not.",
  },
  "basic-tee": {
    hook: "The everyday tee that quietly makes everything else you own look better.",
    benefits: [
      "220gsm soft cotton that breathes all day without going see-through",
      "Classic fit that flatters without being tight — or boxy",
      "Ribbed crew neck built to survive the washing machine",
      "Pre-shrunk so you can stop worrying and just wear it",
      "Works solo, works layered — it's the Swiss Army knife of your wardrobe",
    ],
    specs: {
      material: "100% Soft Cotton, 220gsm",
      size: "M – 2XL · Classic regular fit",
      care: "Machine wash cold or warm · Tumble dry low · Iron safe",
      shipping: "Free over 1,500 EGP · 2–4 days in Egypt · 7–14 days international",
    },
    faqs: [
      { q: "What makes this better than a regular tee?", a: "The fit took us dozens of iterations. The cotton is premium 220gsm — thick enough to feel substantial, soft enough to forget you're wearing it. And the stitching? Reinforced everywhere. You'll feel it." },
      { q: "Is it see-through?", a: "Not even close. 220gsm gives you enough weight for full opacity. Wear it in white with confidence." },
      { q: "Can I layer it under hoodies?", a: "That's literally what it was designed for. The classic fit slides perfectly under any TRETRA hoodie without bunching. Layer up and thank us later." },
    ],
    collectionIntro: "Some pieces don't need to shout. Our Basic Tee is 220gsm soft cotton, cut to flatter, built to last, and designed to make every other piece in your wardrobe work harder. It's the foundation. And once you have a good one, everything else falls into place.",
  },
  default: {
    hook: "Built for people who'd rather be noticed than fit in.",
    benefits: [
      "380gsm premium cotton that feels as good as it looks (maybe better)",
      "Oversized drop-shoulder cut that flatters without trying too hard",
      "Pre-shrunk & colorfast — what you see is what you get, forever",
      "Double-stitched seams because quality isn't just a buzzword for us",
      "Unisex sizing from S to 3XL — made for everybody, literally",
    ],
    specs: {
      material: "100% Premium Heavy Cotton, 380gsm",
      size: "S – 3XL · Oversized fit (size down for fitted)",
      care: "Machine wash cold · Tumble dry low · No bleach",
      shipping: "Free over 1,500 EGP · 2–4 days in Egypt · 7–14 days international",
    },
    faqs: [
      { q: "Will this shrink?", a: "Nope. Everything is pre-shrunk before it ships. The fit you receive is the fit you keep — we made sure of that." },
      { q: "Is oversized really for me?", a: "If you've never tried it, prepare to be converted. Our cut is structured — relaxed body, defined shoulders. It looks intentional on every body type." },
      { q: "What if I need to return it?", a: "14 days, no drama. If it's unworn with tags on, send it back and we'll sort it out. We want you to love what you wear." },
    ],
    collectionIntro: "TRETRA is what happens when you stop chasing trends and start building a wardrobe that actually means something. 380gsm cotton, obsessive attention to fit, and designs that feel as good on day 300 as they do on day 1. This isn't fast fashion. This is the stuff you keep.",
  },
};

export function getProductCopy(title: string, handle: string): ProductCopy {
  const category = detectCategory(title, handle);
  const data = categoryData[category];

  const cleanTitle = title.replace(/^Oversized Heavy Cotton Hoodie – DTF Printed – /, "").replace(/ Edition$/, "");
  const seoKeyword = cleanTitle.length < 40 ? cleanTitle : title.split(" ").slice(0, 5).join(" ");

  return {
    ...data,
    seo: {
      title: `${seoKeyword} | TRETRA Premium Fashion`.slice(0, 60),
      metaDescription: `Shop the ${cleanTitle} from TRETRA. ${data.hook} Free shipping over 1,500 EGP. Premium Egyptian streetwear.`.slice(0, 155),
    },
    imageAlts: [
      `${title} - Front view | TRETRA`,
      `${title} - Detail shot | Premium cotton`,
      `${title} - Side angle | ${category === "sweatpants" ? "Wide-leg fit" : category === "oversized-tee" ? "Oversized drop-shoulder" : "Oversized fit"}`,
      `${title} - Lifestyle | TRETRA ${category === "half-zip" ? "Half-Zip" : category === "sweatpants" ? "Sweatpants" : category.includes("tee") ? "T-Shirt" : "Hoodie"} Collection`,
    ],
  };
}
