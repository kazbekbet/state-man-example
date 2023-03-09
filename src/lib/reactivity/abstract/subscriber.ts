export abstract class Subscriber<Val> {
  public abstract notify(value?: Val): void;

  public abstract listen<Res>(
    fn: (value?: Val) => Res
  ): ThisType<Subscriber<Val>>;

  public abstract pause(): ThisType<Subscriber<Val>>;

  public abstract resume(): ThisType<Subscriber<Val>>;

  public abstract cancel(): ThisType<Subscriber<Val>>;
}
