import { Subscriber, Stream, SubscriberImpl } from '../../reactivity';

export class Store<Val> {
  constructor(private value: Val) {
    this.initialValue = value;
  }

  private readonly initialValue;

  private watcherFn: (val: Val) => void = () => {};

  private subscribers = new Set<Subscriber<unknown>>();

  //TODO: привязка к реакту, избавиться
  private listeners: Function[] = [];

  //TODO: привязка к реакту, избавиться
  getSnapshot = () => {
    return this.value;
  }

  //TODO: привязка к реакту, избавиться
  subscribe = (listener: Function) => {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  //TODO: привязка к реакту, избавиться
  notifyReactListeners() {
   this.listeners.forEach(listener => listener());
  }

  public on<Payload>(event: Stream<Payload>, reducer: (state: Val, value?: Payload, initialValue?: Val) => Val) {
    const subscriber = new SubscriberImpl(event);
    this.subscribers.add(subscriber);

    subscriber.listen(val => {
      this.value = reducer(this.value, val);
      this.watcherFn(this.value);
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
      this.notifyReactListeners();
    });

    return this;
  }
}
