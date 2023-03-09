import { Store } from './store';
import { StreamImpl } from '../../reactivity';

export function setStore<Val>(initialValue: Val) {
  return new Store(initialValue);
}

export function setEvent<Payload>() {
  const event = new StreamImpl<Payload>();

  function fire() {
    return event.fire();
  }

  fire.event = event;

  return fire;
}

type AsyncFn<Args, Payload> = (...args: Args[]) => Promise<Payload>;

export function setAsyncEvent<Args, Payload>(asyncFn: AsyncFn<Args, Payload>) {
  const pendingEvent = new StreamImpl<void>(),
    fulfilledEvent = new StreamImpl<Payload>(),
    rejectedEvent = new StreamImpl<Error>();

  async function fireAsync(...args: Parameters<typeof asyncFn>) {
    pendingEvent.fire();
    asyncFn(...args)
      .then(res => fulfilledEvent.fire(res))
      .catch(error => rejectedEvent.fire(error));
  }

  fireAsync.pending = pendingEvent;
  fireAsync.fulfilled = fulfilledEvent;
  fireAsync.rejected = rejectedEvent;

  return fireAsync;
}
