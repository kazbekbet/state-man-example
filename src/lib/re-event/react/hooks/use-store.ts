import type { Store } from '../../core/store';
import { useSyncExternalStore } from 'react';

export function useStore<Val>(store: Store<Val>) {
  return useSyncExternalStore(store.subscribe, store.getState);
}
