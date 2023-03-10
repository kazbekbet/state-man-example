import { useStore } from '../../lib/re-event/react';
import { evenCounterStore } from './model';

export default function EvenCounter() {
  const evenCounter = useStore(evenCounterStore);
  return (
    <p>
      Even count = <span>{evenCounter}</span>
    </p>
  );
}
