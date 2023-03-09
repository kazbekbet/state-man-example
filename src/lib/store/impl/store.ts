import { Subscriber, Stream, SubscriberImpl } from '../../reactivity';

export interface StoreOptions {
  attachLogger?: boolean;
  name?: string;
}

export class Store<Val> {
  constructor(private value: Val, options?: StoreOptions) {
    this.initialValue = value;
    this.prevValue = value;
    this.isLoggerAttached = Boolean(options?.attachLogger);
    this.name = options?.name;
  }

  public prevValue;
  private readonly initialValue;
  private readonly isLoggerAttached;
  private readonly name;
  private watcherFn: (val: Val) => void = () => {};
  private subscribers = new Set<Subscriber<unknown>>();

  //TODO: подумать.
  private computedListeners: Set<Function> = new Set();

  //TODO: привязка к реакту, избавиться
  private reactListeners: Function[] = [];

  public getState = () => {
    return this.value;
  };

  //TODO: привязка к реакту, избавиться
  subscribe = (listener: Function) => {
    this.reactListeners.push(listener);
    return () => {
      this.reactListeners = this.reactListeners.filter(l => l !== listener);
    };
  };

  //TODO: привязка к реакту, избавиться
  private notifyReactListeners() {
    this.reactListeners.forEach(listener => listener());
  }

  public on<Payload>(
    event: Stream<Payload>,
    reducer: (state: Val, value: Payload, initialValue: Val) => Val
  ) {
    const subscriber = new SubscriberImpl(event);
    this.subscribers.add(subscriber);

    subscriber.listen<void, Payload>(val => {
      this.prevValue = this.value;
      this.value = reducer(this.value, val, this.initialValue);
      this.watcherFn(this.value);
      this.log();
      this.notifyReactListeners();
    });

    return this;
  }

  public watch(fn: (val: Val) => void) {
    this.watcherFn = fn;
    return this;
  }

  public destroy(event: Stream<void>) {
    const subscriber = new SubscriberImpl(event);

    subscriber.listen(_ => {
      this.subscribers.forEach(sub => {
        sub.cancel();
      });

      this.subscribers.clear();
      this.value = this.initialValue;
    });

    return this;
  }

  public clear(event: Stream<void>) {
    const subscriber = new SubscriberImpl(event);

    subscriber.listen(_ => {
      this.value = this.initialValue;
      this.watcherFn(this.value);
      this.log();
      this.notifyReactListeners();
    });

    return this;
  }

  private log() {
    if (this.isLoggerAttached) {
      const name = this.name ?? '';

      if (typeof this.value === 'object') {
        console.log(`Current state of %c${name}:`, 'color: green');
        console.table(this.value);

        return;
      }

      console.log(`Current state of %c${name}:`, 'color: green', this.value);
    }
  }
}
