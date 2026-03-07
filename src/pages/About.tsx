import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Newsletter } from "@/components/Newsletter";
import lifestyle1 from "@/assets/lifestyle-1.jpg";
import lifestyle2 from "@/assets/lifestyle-2.jpg";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="py-20 md:py-28">
        <div className="container max-w-3xl text-center">
          <p className="font-body text-xs tracking-[0.3em] uppercase text-muted-foreground mb-4">About Us</p>
          <h1 className="font-heading text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
            We Are Tretra<span className="text-primary">.</span>
          </h1>
          <p className="font-body text-base md:text-lg text-muted-foreground leading-relaxed">
            A streetwear brand born in Egypt, designed for the bold and fearless youth of the MENA region and beyond.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 bg-card">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="aspect-square rounded-lg overflow-hidden">
              <img src={lifestyle1} alt="Our mission" className="w-full h-full object-cover" />
            </div>
            <div>
              <p className="font-body text-xs tracking-[0.3em] uppercase text-muted-foreground mb-3">Our Mission</p>
              <h2 className="font-heading text-3xl font-bold text-foreground mb-4">Clothing That Speaks</h2>
              <p className="font-body text-sm text-muted-foreground leading-relaxed mb-4">
                We believe fashion is a form of self-expression. Every hoodie, every stitch, every design is crafted to help you tell your story without saying a word.
              </p>
              <p className="font-body text-sm text-muted-foreground leading-relaxed">
                From the streets of Cairo to the urban landscapes of the Arab world, Tretra Wear represents a generation that's bold, creative, and unapologetically real.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Culture */}
      <section className="py-16">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <p className="font-body text-xs tracking-[0.3em] uppercase text-muted-foreground mb-3">Community</p>
              <h2 className="font-heading text-3xl font-bold text-foreground mb-4">More Than a Brand</h2>
              <p className="font-body text-sm text-muted-foreground leading-relaxed mb-4">
                Tretra is a community of creatives, dreamers, and hustlers. We're building a culture around comfort, confidence, and authenticity.
              </p>
              <p className="font-body text-sm text-muted-foreground leading-relaxed">
                Join thousands of young Arabs who wear Tretra not just as clothing, but as an identity.
              </p>
            </div>
            <div className="order-1 md:order-2 aspect-square rounded-lg overflow-hidden">
              <img src={lifestyle2} alt="Our community" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      <Newsletter />
      <Footer />
    </div>
  );
};

export default About;
