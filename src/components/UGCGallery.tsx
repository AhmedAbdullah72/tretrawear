import { motion } from "framer-motion";
import { Instagram } from "lucide-react";
import ugc1 from "@/assets/ugc-1.jpg";
import ugc2 from "@/assets/ugc-2.jpg";
import ugc3 from "@/assets/ugc-3.jpg";
import ugc4 from "@/assets/ugc-4.jpg";
import ugc5 from "@/assets/ugc-5.jpg";
import ugc6 from "@/assets/ugc-6.jpg";

const ugcPhotos = [
  { src: ugc1, handle: "@ahmed.k", alt: "Customer wearing TRETRA oversized hoodie on the street", tall: true },
  { src: ugc2, handle: "@nour.m", alt: "Customer in TRETRA oversized cream tee", tall: false },
  { src: ugc3, handle: "@omar.s", alt: "Customer in full TRETRA outfit at golden hour", tall: true },
  { src: ugc4, handle: "@youssef.r", alt: "Close-up of TRETRA half-zip hoodie detail", tall: false },
  { src: ugc5, handle: "@kareem.a", alt: "Customer walking in TRETRA t-shirt and sweatpants", tall: true },
  { src: ugc6, handle: "@mostafa.h", alt: "Flat lay of TRETRA outfit with accessories", tall: false },
];

export const UGCGallery = () => {
  return (
    <section className="py-16 md:py-24 bg-background overflow-hidden">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <p className="font-body text-xs tracking-[0.3em] uppercase text-primary mb-3">
            Real People. Real Fits.
          </p>
          <h2 className="font-heading text-3xl md:text-4xl text-foreground mb-3">
            Worn by You<span className="text-primary">.</span>
          </h2>
          <p className="font-body text-sm text-muted-foreground max-w-md mx-auto">
            Our community styles TRETRA their way. No models, no scripts — just real people looking fire.
          </p>
        </motion.div>

        {/* Masonry Grid */}
        <div className="columns-2 md:columns-3 gap-3 md:gap-4 space-y-3 md:space-y-4">
          {ugcPhotos.map((photo, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="relative group break-inside-avoid rounded-xl overflow-hidden"
            >
              <img
                src={photo.src}
                alt={photo.alt}
                loading="lazy"
                decoding="async"
                className={`w-full object-cover transition-transform duration-700 group-hover:scale-105 ${
                  photo.tall ? "aspect-[3/4]" : "aspect-square"
                }`}
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/40 transition-all duration-300 flex items-end justify-between p-4 opacity-0 group-hover:opacity-100">
                <span className="font-body text-xs text-background/90 flex items-center gap-1.5">
                  <Instagram className="h-3.5 w-3.5" />
                  {photo.handle}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-8 font-body text-xs text-muted-foreground"
        >
          Tag <span className="text-primary font-heading">@tretrawear</span> to be featured
        </motion.p>
      </div>
    </section>
  );
};
