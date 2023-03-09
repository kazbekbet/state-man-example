import { setAsyncEvent, setEvent, setStore } from '../../lib';
import { asyncCount } from './api';

export const increment = setEvent<void>();
export const decrement = setEvent<void>();
export const clear = setEvent<void>();
export const unmount = setEvent<void>();

interface AsyncIncrementPayload {
  countTo: number;
  delay: number;
  isReject: boolean;
}

export const asyncIncrement = setAsyncEvent(
  ({ countTo, delay, isReject }: AsyncIncrementPayload) =>
    asyncCount(countTo, delay, isReject)
);

export const counterStore = setStore(0)
  .on(increment.event, state => state + 1)
  .on(decrement.event, state => state - 1)
  //@ts-expect-error
  .on(asyncIncrement.fulfilled, (state, payload) => state + payload)
  .watch(val => console.info('New value is: ', val))
  .clear(clear.event)
  .destroy(unmount.event);

export const isLoadingStore = setStore(false)
  .on(asyncIncrement.pending, () => true)
  .on(asyncIncrement.fulfilled, () => false)
  .on(asyncIncrement.rejected, () => false)
  .clear(clear.event);

export const errorReasonStore = setStore('')
  //@ts-expect-error
  .on(asyncIncrement.pending, (_, initialValue) => initialValue)
  //@ts-expect-error
  .on(asyncIncrement.rejected, (_, error) => error.message)
  .clear(clear.event);
