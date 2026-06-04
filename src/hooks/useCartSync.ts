import { useEffect } from 'react';
import { useCartStore } from '@/stores/cartStore';

const noop = async () => {};

export function useCartSync() {
  // Defensive selector: during initial hydration the persisted state may not
  // be ready, so fall back to a noop instead of returning null/undefined.
  const syncCart = useCartStore(state => state?.syncCart ?? noop);

  useEffect(() => {
    if (typeof syncCart !== 'function') return;
    syncCart();
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') syncCart();
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [syncCart]);
}
