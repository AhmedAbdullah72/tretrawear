import { useState, useEffect } from "react";

// Simple global state for welcome banner visibility
type Listener = (visible: boolean) => void;
const listeners = new Set<Listener>();
let _bannerVisible = false;

const BANNER_HEIGHT = 40; // px

export const setBannerVisible = (visible: boolean) => {
  _bannerVisible = visible;
  // Set CSS custom property so any page can respond
  if (typeof document !== "undefined") {
    document.documentElement.style.setProperty(
      "--banner-offset",
      visible ? `${BANNER_HEIGHT}px` : "0px"
    );
  }
  listeners.forEach(l => l(visible));
};

export const useBannerVisible = () => {
  const [visible, setVisible] = useState(_bannerVisible);
  useEffect(() => {
    const handler = (v: boolean) => setVisible(v);
    listeners.add(handler);
    setVisible(_bannerVisible);
    return () => { listeners.delete(handler); };
  }, []);
  return visible;
};
