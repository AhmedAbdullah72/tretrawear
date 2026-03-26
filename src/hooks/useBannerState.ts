import { useState, useEffect, useCallback } from "react";

// Simple global state for welcome banner visibility
type Listener = (visible: boolean) => void;
const listeners = new Set<Listener>();
let _bannerVisible = false;

export const setBannerVisible = (visible: boolean) => {
  _bannerVisible = visible;
  listeners.forEach(l => l(visible));
};

export const useBannerVisible = () => {
  const [visible, setVisible] = useState(_bannerVisible);
  useEffect(() => {
    const handler = (v: boolean) => setVisible(v);
    listeners.add(handler);
    // Sync on mount
    setVisible(_bannerVisible);
    return () => { listeners.delete(handler); };
  }, []);
  return visible;
};
