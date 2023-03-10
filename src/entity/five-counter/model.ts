import { setComputedStore } from 'lib/re-event';
import { counterStore } from '../counter/model';

export const divideByFiveStore = setComputedStore({
  store: counterStore,
  condition: value => value % 5 === 0,
});
