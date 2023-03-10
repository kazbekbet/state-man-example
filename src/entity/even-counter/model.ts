import { setComputedStore } from '../../lib/re-event';
import { counterStore } from '../counter/model';

export const evenCounterStore = setComputedStore({
  store: counterStore,
  condition: value => value % 2 === 0,
});
