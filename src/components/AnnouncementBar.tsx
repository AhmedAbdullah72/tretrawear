/**
 * Global announcement bar — static, no state, no motion, no timers.
 * Height is fixed via the --banner-offset token so the fixed Navbar and all
 * page top paddings stay in sync without any runtime measurement (no CLS).
 */
export const AnnouncementBar = () => (
  <div
    role="complementary"
    aria-label="Store announcement"
    className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center bg-primary text-primary-foreground overflow-hidden"
    style={{ height: "var(--banner-offset)" }}
  >
    <p className="font-body font-medium text-[11.5px] md:text-[12.5px] tracking-[0.06em] whitespace-nowrap px-3">
      FREE SHIPPING OVER 1,500 EGP · CASH ON DELIVERY
    </p>
  </div>
);
