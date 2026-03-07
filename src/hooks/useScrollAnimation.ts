import { useEffect, useRef } from "react";

export function useScrollAnimation<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target); // Only animate once
          }
        });
      },
      { threshold: 0.05, rootMargin: "0px 0px -20px 0px" }
    );

    // Small delay to ensure elements are laid out
    requestAnimationFrame(() => {
      const children = el.querySelectorAll(".animate-on-scroll");
      children.forEach((child) => observer.observe(child));
      if (el.classList.contains("animate-on-scroll")) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return ref;
}
