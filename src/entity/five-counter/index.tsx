import { divideByFiveStore } from './model';
import { useStore } from 'lib/re-event/react';

export default function FiveCounter() {
  const counter = useStore(divideByFiveStore);

  return (
    <p>
      Divide by five count = <span>{counter}</span>
    </p>
  );
}
