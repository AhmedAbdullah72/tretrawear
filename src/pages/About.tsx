import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Newsletter } from "@/components/Newsletter";
import { FAQSection } from "@/components/FAQSection";
import { SEO } from "@/components/SEO";
import { motion, useScroll, useTransform, useInView, useMotionValue, useSpring } from "framer-motion";
import { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2, Star, Users, Package, Sparkles } from "lucide-react";
import lifestyle1 from "@/assets/lifestyle-1.webp";


/* ── Animated counter ── */
const CountUp = ({ target, suffix = "" }: { target: number; suffix?: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const motionVal = useMotionValue(0);
  const spring = useSpring(motionVal, { duration: 2000 });
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  useEffect(() => {
    if (isInView) motionVal.set(target);
  }, [isInView, motionVal, target]);

  useEffect(() => {
    const unsub = spring.on("change", (v) => {
      if (ref.current) ref.current.textContent = Math.round(v).toLocaleString() + suffix;
    });
    return unsub;
  }, [spring, suffix]);

  return <span ref={ref}>0{suffix}</span>;
};

/* ── CTA Block ── */
const CTABlock = ({ variant = "default" }: { variant?: "default" | "dark" }) => (
  <motion.div
    initial={{ opacity: 0, y: 15 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-40px" }}
    transition={{ duration: 0.4 }}
    className="flex flex-col sm:flex-row gap-3 justify-center mt-10"
  >
    <Link
      to="/shop"
      className="group inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-heading text-sm tracking-wider uppercase px-7 py-3.5 rounded-lg hover:bg-primary/90 transition-all duration-300 shadow-lg shadow-primary/20"
    >
      Shop Now
      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
    </Link>
    <Link
      to="/shop"
      className={`inline-flex items-center justify-center gap-2 border font-heading text-sm tracking-wider uppercase px-7 py-3.5 rounded-lg transition-all duration-300 ${
        variant === "dark"
          ? "border-background/30 text-background hover:bg-background/10"
          : "border-foreground/20 text-foreground hover:bg-foreground/5"
      }`}
    >
      Explore Collection
    </Link>
  </motion.div>
);

/* ── Stats data ── */
const stats = [
  { icon: Users, value: 10, suffix: "K+", label: "Happy Customers" },
  { icon: Package, value: 50, suffix: "K+", label: "Pieces Sold" },
  { icon: Star, value: 4.9, suffix: "★", label: "Avg. Rating" },
  { icon: Sparkles, value: 96, suffix: "%", label: "Reorder Rate" },
];

/* ── Timeline ── */
const timeline = [
  { year: "2023", title: "The Spark", desc: "Tired of overpriced, low-quality streetwear — we made our own." },
  { year: "2023", title: "First Drop", desc: "Debut heavyweight hoodies sold out in one week." },
  { year: "2024", title: "10K+ Community", desc: "Customers across Egypt & the Arab world joined TRETRA." },
  { year: "2025", title: "What's Next", desc: "New categories, new fabrics, bigger vision." },
];

const About = () => {
  const img1Ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress: img1Progress } = useScroll({ target: img1Ref, offset: ["start end", "end start"] });
  const img1Y = useTransform(img1Progress, [0, 1], ["6%", "-6%"]);
  

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* ═══ 1. HERO — Value Proposition ═══ */}
      <section className="pb-16 md:pb-20 bg-foreground text-background" style={{ paddingTop: 'calc(96px + var(--banner-offset))' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="container max-w-3xl text-center py-12"
        >
          <p className="font-body text-xs tracking-[0.3em] uppercase text-background/50 mb-4">Egyptian Streetwear, Redefined</p>
          <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl text-background mb-6 leading-tight">
            Premium Quality<span className="text-primary">.</span><br />
            Honest Prices<span className="text-primary">.</span><br />
            Made in Egypt<span className="text-primary">.</span>
          </h1>
          <p className="font-body text-sm md:text-base text-background/60 leading-relaxed max-w-xl mx-auto">
            Heavyweight oversized hoodies & streetwear built to last — no hype tax, no compromises.
          </p>
          <CTABlock variant="dark" />
        </motion.div>
      </section>

      {/* ═══ 2. PROOF — Stats ═══ */}
      <section className="py-12 bg-card border-b border-border">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="text-center"
              >
                <div className="w-10 h-10 mx-auto mb-3 flex items-center justify-center bg-primary/10 rounded-xl">
                  <s.icon className="h-4 w-4 text-primary" />
                </div>
                <p className="font-heading text-3xl md:text-4xl text-foreground">
                  {typeof s.value === "number" && s.value >= 10 ? (
                    <CountUp target={s.value} suffix={s.suffix} />
                  ) : (
                    <>{s.value}{s.suffix}</>
                  )}
                </p>
                <p className="font-body text-xs tracking-[0.15em] uppercase text-muted-foreground mt-1">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 3. STORY — The Real Origin ═══ */}
      <section className="py-16 bg-background overflow-hidden">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              ref={img1Ref}
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6 }}
              className="aspect-square rounded-2xl overflow-hidden shadow-lg"
            >
              <motion.img src={lifestyle1} alt="TRETRA Egyptian streetwear premium cotton hoodie" className="w-full h-full object-cover" style={{ y: img1Y }} />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6 }}
            >
              <p className="font-body text-xs tracking-[0.3em] uppercase text-primary mb-3">Our Story</p>
              <h2 className="font-heading text-3xl text-foreground mb-4">
                Born From Frustration<span className="text-primary">.</span>
              </h2>
              <p className="font-body text-sm text-muted-foreground leading-relaxed mb-4">
                Two friends in Cairo, tired of choosing between <strong className="text-foreground">overpriced hype</strong> and <strong className="text-foreground">cheap quality</strong>. We thought — why not make the hoodie we actually want to wear?
              </p>
              <ul className="space-y-2 mb-4">
                {[
                  "Premium heavyweight cotton that survives real life",
                  "Oversized fits designed for Egyptian streetwear culture",
                  "Pre-shrunk, double-stitched — no surprises after wash",
                  "Honest pricing, zero hype tax",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span className="font-body text-sm text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
              <p className="font-body text-xs text-muted-foreground italic">
                "أول هودي اشتريته من TRETRA — لسه بلبسه بعد سنة. الخامة فرق فعلاً."
                <span className="block mt-1 not-italic text-foreground font-medium">— أحمد، القاهرة</span>
              </p>
            </motion.div>
          </div>
        </div>
        <CTABlock />
      </section>

      {/* ═══ 4. TIMELINE — Journey ═══ */}
      <section className="py-20 md:py-24 bg-foreground text-background overflow-hidden">
        <div className="container max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <p className="font-body text-xs tracking-[0.3em] uppercase text-background/50 mb-3">Our Journey</p>
            <h2 className="font-heading text-3xl md:text-5xl text-background">
              From Idea to 10K+ Customers<span className="text-primary">.</span>
            </h2>
          </motion.div>

          <div className="relative">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-background/20 md:-translate-x-px" />
            {timeline.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`relative flex items-start gap-8 mb-10 last:mb-0 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
              >
                <div className="absolute left-4 md:left-1/2 w-3 h-3 rounded-full bg-primary -translate-x-1/2 mt-1.5 ring-4 ring-foreground z-10" />
                <div className={`ml-12 md:ml-0 md:w-1/2 ${i % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"}`}>
                  <span className="font-heading text-sm text-primary">{item.year}</span>
                  <h3 className="font-heading text-lg text-background mt-1">{item.title}</h3>
                  <p className="font-body text-sm text-background/60 mt-1">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <CTABlock variant="dark" />
        </div>
      </section>

      {/* ═══ 5. PRODUCT PROMISE — Why TRETRA ═══ */}
      <section className="py-16 bg-background overflow-hidden">
        <div className="container max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <p className="font-body text-xs tracking-[0.3em] uppercase text-primary mb-3">Why Us</p>
            <h2 className="font-heading text-3xl md:text-4xl text-foreground">
              What Makes TRETRA Different<span className="text-primary">?</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: "Heavyweight, Not Hype",
                points: ["Premium cotton that you feel instantly", "Pre-shrunk — same fit after every wash", "Double-stitched seams that last years"],
              },
              {
                title: "Designed for Real Life",
                points: ["Made for Cairo streets & late-night cafés", "Oversized fits that flatter without trying", "No seasonal trends — timeless pieces"],
              },
              {
                title: "Honest, Always",
                points: ["No celebrity markups or hype pricing", "96% of customers come back for more", "Every piece we sell, we wear ourselves"],
              },
              {
                title: "Community-First Brand",
                points: ["10K+ happy customers across the Arab world", "Built on word-of-mouth, not ad budgets", "Real reviews from real people"],
              },
            ].map((block, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="p-6 rounded-xl border border-border hover:border-primary/30 transition-all duration-300"
              >
                <h3 className="font-heading text-lg text-foreground mb-3">{block.title}</h3>
                <ul className="space-y-2">
                  {block.points.map((point, j) => (
                    <li key={j} className="flex items-start gap-2">
                      <CheckCircle2 className="h-3.5 w-3.5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="font-body text-sm text-muted-foreground">{point}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
          <CTABlock />
        </div>
      </section>


      <FAQSection />
      <Newsletter />
      <Footer />
    </div>
  );
};

export default About;
