import { Store, StoreOptions } from './store';
import { StreamImpl } from '../../reactivity';

export function setStore<Val>(initialValue: Val, options?: StoreOptions) {
  return new Store(initialValue, options);
}

export function setEvent<Payload>() {
  const event = new StreamImpl<Payload>();

  function fire(payload: Payload) {
    return event.fire(payload);
  }

  fire.event = event;

  return fire;
}

type AsyncFn<Args, Payload> = (...args: Args[]) => Promise<Payload>;

export function setAsyncEvent<Args, Payload>(asyncFn: AsyncFn<Args, Payload>) {
  const pendingEvent = new StreamImpl<void>(),
    fulfilledEvent = new StreamImpl<Payload>(),
    rejectedEvent = new StreamImpl<Error>();

  async function fireAsync(...args: Args[]) {
    pendingEvent.fire();

    promisifyFn(asyncFn, ...args)
      .then(res => fulfilledEvent.fire(res))
      .catch(error => rejectedEvent.fire(error));
  }

  fireAsync.pending = pendingEvent;
  fireAsync.fulfilled = fulfilledEvent;
  fireAsync.rejected = rejectedEvent;

  return fireAsync;
}

async function promisifyFn<Args, Payload>(
  asyncFn: AsyncFn<Args, Payload>,
  ...args: Args[]
) {
  return await asyncFn(...args);
}
