import { Stream } from '../../reactivity';

export namespace SetEvent {
  export interface Return<Payload> {
    (payload: Payload): Stream<Payload>;

    event: Stream<Payload>;
  }
}

export namespace SetAsyncEvent {
  export type ArgFn<Args, Payload> = (...args: Args[]) => Promise<Payload>

  export interface Return<Args, Payload> {
    (...args: Args[]): Promise<unknown>;

    pending: Stream<void>;
    fulfilled: Stream<Payload>;
    rejected: Stream<Error>;
  }
}
