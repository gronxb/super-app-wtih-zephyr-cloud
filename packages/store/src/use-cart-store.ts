import { useSyncExternalStore } from 'react';
import { cartStore } from './store';

export function useCartStore() {
  return useSyncExternalStore(cartStore.subscribe, cartStore.getSnapshot);
}
