import { Stream } from '../abstract/stream';
import { Subscriber } from '../abstract/subscriber';

export class SubscriberImpl<Val> implements Subscriber<Val> {
  constructor(private stream: Stream<Val>) {
    stream.addSubscriber(this);
  }

  public listenFuncs = new Set<(value?: Val) => unknown>();

  public notify(value?: Val) {
    this.listenFuncs.forEach(fn => fn(value));
  }

  public listen<Res>(fn: (value?: Val) => Res) {
    this.listenFuncs.add(fn);
    return this;
  }

  pause() {
    this.stream.clearSubscriber(this);
    return this;
  }

  resume() {
    this.stream.addSubscriber(this);
    return this;
  }

  cancel() {
    this.listenFuncs.clear();
    this.stream.clearSubscriber(this);
    return this;
  }
}
