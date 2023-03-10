import { setStore, setEvent, setAsyncEvent } from 'lib/re-event';
import { useStore } from 'lib/re-event/react';

const ev = setEvent<number>();
const asEv = setAsyncEvent(() => Promise.resolve(1));

const st = setStore(0)
  .on(ev.event, (_, p) => p)
  .on(asEv.fulfilled, (_, p) => p);

export default function Void() {
  const store = useStore(st);
  console.log(store);

  return 1;
}
