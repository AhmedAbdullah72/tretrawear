import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { trackMetaPageView } from '@/lib/metaPixel';

/**
 * Fires a Meta `PageView` on every genuine route navigation (path or query
 * change), including browser Back/Forward.
 *
 * The initial document PageView is already sent by initMetaPixel(), so the
 * first render is skipped here. A ref guard keeps StrictMode double-invokes,
 * rerenders and modal/drawer state changes from producing duplicates —
 * drawers don't change the URL, so they never reach this effect.
 */
export function useMetaPageViews(): void {
  const location = useLocation();
  const lastPath = useRef<string | null>(null);

  useEffect(() => {
    const path = location.pathname + location.search;
    if (lastPath.current === null) {
      // First mount: initMetaPixel() already tracked this page.
      lastPath.current = path;
      return;
    }
    if (lastPath.current === path) return;
    lastPath.current = path;
    trackMetaPageView();
  }, [location.pathname, location.search]);
}
