import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Newsletter } from "@/components/Newsletter";
import { FAQSection } from "@/components/FAQSection";
import { motion, useScroll, useTransform, useInView, useMotionValue, useSpring } from "framer-motion";
import { useRef, useEffect } from "react";
import lifestyle1 from "@/assets/lifestyle-1.webp";
import lifestyle2 from "@/assets/lifestyle-2.webp";

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

/* ── Timeline data ── */
const timeline = [
  { year: "2023", title: "The Idea", desc: "Frustrated with overpriced, low-quality streetwear — we decided to make our own." },
  { year: "2023", title: "First Drop", desc: "Our debut collection of heavyweight hoodies sold out within the first week." },
  { year: "2024", title: "Community Growth", desc: "10,000+ customers joined the TRETRA movement across Egypt and the Arab world." },
  { year: "2025", title: "What's Next", desc: "Expanding categories, new fabrics, and building the brand Egypt deserves." },
];

const stats = [
  { value: 10, suffix: "K+", label: "Happy Customers" },
  { value: 50, suffix: "K+", label: "Pieces Sold" },
  { value: 4.9, suffix: "★", label: "Average Rating" },
  { value: 380, suffix: "gsm", label: "Heavy Cotton" },
];

const About = () => {
  const img1Ref = useRef<HTMLDivElement>(null);
  const img2Ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress: img1Progress } = useScroll({ target: img1Ref, offset: ["start end", "end start"] });
  const { scrollYProgress: img2Progress } = useScroll({ target: img2Ref, offset: ["start end", "end start"] });
  const img1Y = useTransform(img1Progress, [0, 1], ["6%", "-6%"]);
  const img2Y = useTransform(img2Progress, [0, 1], ["6%", "-6%"]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="pb-16 md:pb-20 bg-foreground text-background" style={{ paddingTop: 'calc(96px + var(--banner-offset))' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="container max-w-3xl text-center py-12"
        >
          <p className="font-body text-xs tracking-[0.3em] uppercase text-background/50 mb-4">About Us</p>
          <h1 className="font-heading text-5xl md:text-7xl text-background mb-6 leading-tight">
            We Are Tretra<span className="text-primary">.</span>
          </h1>
          <p className="font-body text-base md:text-lg text-background/60 leading-relaxed">
            A fashion brand born in Egypt, designed for the bold and fearless.
          </p>
        </motion.div>
      </section>

      {/* Stats */}
      <section className="py-14 bg-card border-b border-border">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="text-center"
              >
                <p className="font-heading text-4xl md:text-5xl text-primary">
                  {typeof s.value === "number" && s.value >= 10 ? (
                    <CountUp target={s.value} suffix={s.suffix} />
                  ) : (
                    <>{s.value}{s.suffix}</>
                  )}
                </p>
                <p className="font-body text-xs tracking-[0.2em] uppercase text-muted-foreground mt-2">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
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
              <motion.img src={lifestyle1} alt="Our mission" className="w-full h-full object-cover" style={{ y: img1Y }} />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6 }}
            >
              <p className="font-body text-xs tracking-[0.3em] uppercase text-primary mb-3">Our Mission</p>
              <h2 className="font-heading text-3xl text-foreground mb-4">Clothing That Speaks</h2>
              <p className="font-body text-sm text-muted-foreground leading-relaxed mb-4">
                We believe fashion is a form of self-expression. Every hoodie, every stitch, every design is crafted to help you tell your story without saying a word.
              </p>
              <p className="font-body text-sm text-muted-foreground leading-relaxed">
                From the streets of Cairo to the urban landscapes of the Arab world, Tretra Wear represents a generation that's bold, creative, and unapologetically real.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 md:py-28 bg-foreground text-background overflow-hidden">
        <div className="container max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <p className="font-body text-xs tracking-[0.3em] uppercase text-background/50 mb-3">Our Journey</p>
            <h2 className="font-heading text-4xl md:text-5xl text-background">
              How We Got Here<span className="text-primary">.</span>
            </h2>
          </motion.div>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-background/20 md:-translate-x-px" />

            {timeline.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`relative flex items-start gap-8 mb-12 last:mb-0 ${
                  i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Dot */}
                <div className="absolute left-4 md:left-1/2 w-3 h-3 rounded-full bg-primary -translate-x-1/2 mt-1.5 ring-4 ring-foreground z-10" />

                {/* Content */}
                <div className={`ml-12 md:ml-0 md:w-1/2 ${i % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"}`}>
                  <span className="font-heading text-sm text-primary">{item.year}</span>
                  <h3 className="font-heading text-xl text-background mt-1">{item.title}</h3>
                  <p className="font-body text-sm text-background/60 mt-2 leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Culture */}
      <section className="py-16 bg-card overflow-hidden">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6 }}
              className="order-2 md:order-1"
            >
              <p className="font-body text-xs tracking-[0.3em] uppercase text-primary mb-3">Community</p>
              <h2 className="font-heading text-3xl text-foreground mb-4">More Than a Brand</h2>
              <p className="font-body text-sm text-muted-foreground leading-relaxed mb-4">
                Tretra is a community of creatives, dreamers, and hustlers. We're building a culture around comfort, confidence, and authenticity.
              </p>
              <p className="font-body text-sm text-muted-foreground leading-relaxed">
                Join thousands of young Arabs who wear Tretra not just as clothing, but as an identity.
              </p>
            </motion.div>
            <motion.div
              ref={img2Ref}
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6 }}
              className="order-1 md:order-2 aspect-square rounded-2xl overflow-hidden shadow-lg"
            >
              <motion.img src={lifestyle2} alt="Our community" className="w-full h-full object-cover" style={{ y: img2Y }} />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why TRETRA? */}
      <section className="py-20 md:py-28 bg-background overflow-hidden">
        <div className="container max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <p className="font-body text-xs tracking-[0.3em] uppercase text-primary mb-3">The Real Story</p>
            <h2 className="font-heading text-4xl md:text-5xl text-foreground">
              Why TRETRA<span className="text-primary">?</span>
            </h2>
          </motion.div>

          <div className="space-y-12">
            {[
              {
                title: "We got tired of settling.",
                body: "Every hoodie we bought was either overpriced and overhyped, or cheap and falling apart after two washes. We thought — what if we just made the thing we actually wanted to wear? 380gsm cotton, real construction, a fit that flatters without trying too hard. That's how TRETRA started. Not with a business plan, but with frustration.",
              },
              {
                title: "We design for real life, not runways.",
                body: "Our clothes are made for Cairo traffic, late-night cafés, early morning lectures, and everything in between. We don't chase seasonal trends or what's 'in' in Paris. We make pieces that work for your life — right here, right now. If it doesn't survive a regular rotation of wear, wash, repeat — we don't ship it.",
              },
              {
                title: "Quality isn't a marketing word for us.",
                body: "When we say 380gsm heavy cotton, we mean you'll feel the difference the second you hold it. When we say pre-shrunk, we mean you won't open the dryer to a nasty surprise. When we say double-stitched, we mean these seams aren't going anywhere. We're obsessive about this stuff because we wear it ourselves.",
              },
              {
                title: "We'd rather be honest than impressive.",
                body: "We're not the biggest brand. We don't have celebrity endorsements or billboards on the ring road. What we have is a community of people who tried one piece and kept coming back. That means more to us than any campaign ever could. Every review, every reorder, every DM saying 'bro where did you get that' — that's our proof.",
              },
            ].map((block, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="relative pl-6 border-l-2 border-primary/30"
              >
                <h3 className="font-heading text-xl md:text-2xl text-foreground mb-3">{block.title}</h3>
                <p className="font-body text-sm md:text-base text-muted-foreground leading-relaxed">{block.body}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-16 text-center"
          >
            <p className="font-heading text-lg md:text-xl text-foreground">
              This isn't fast fashion. This is the stuff you keep<span className="text-primary">.</span>
            </p>
          </motion.div>
        </div>
      </section>

      <FAQSection />
      <Newsletter />
      <Footer />
    </div>
  );
};

export default About;
