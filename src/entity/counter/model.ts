import { setAsyncEvent, setEvent, setStore } from '../../lib';
import { asyncCount } from './api';

interface AsyncIncrementPayload {
  countTo: number;
  delay: number;
  isReject: boolean;
}

export const increment = setEvent<void>();
export const decrement = setEvent<void>();
export const clear = setEvent<void>();
export const unmount = setEvent<void>();

export const asyncIncrement = setAsyncEvent(
  ({ countTo, delay, isReject }: AsyncIncrementPayload) =>
    asyncCount(countTo, delay, isReject)
);

export const counterStore = setStore(0, {
  attachLogger: false,
  name: 'counterStore',
})
  .on(increment.event, state => state + 1)
  .on(decrement.event, state => state - 1)
  .on(asyncIncrement.fulfilled, (state, payload) => state + payload)
  .clear(clear.event)
  .destroy(unmount.event);

export const statusStore = setStore(
  {
    isLoading: false,
    isFulfilled: false,
    isError: false,
    errorReason: '',
  },
  { attachLogger: false, name: 'statusStore' }
)
  .on(asyncIncrement.pending, (_state, _, initialValue) => ({
    ...initialValue,
    isLoading: true,
  }))
  .on(asyncIncrement.fulfilled, state => ({
    ...state,
    isLoading: false,
    isFulfilled: true,
  }))
  .on(asyncIncrement.rejected, (_, payload, initialValue) => ({
    ...initialValue,
    isError: true,
    errorReason: payload.message,
  }))
  .clear(clear.event);
