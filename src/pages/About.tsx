import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Newsletter } from "@/components/Newsletter";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import lifestyle1 from "@/assets/lifestyle-1.jpg";
import lifestyle2 from "@/assets/lifestyle-2.jpg";

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
      <section className="pt-24 pb-16 md:pb-20 bg-foreground text-background">
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

      <Newsletter />
      <Footer />
    </div>
  );
};

export default About;
