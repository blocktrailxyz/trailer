export class Factory<T> {
  constructor(private readonly defaults: () => T) {}

  build(overrides?: Partial<T>): T {
    return { ...this.defaults(), ...overrides };
  }

  async create(overrides?: Partial<T>, model?: any): Promise<T> { // eslint-disable-line @typescript-eslint/no-explicit-any
    const data = this.build(overrides);
    return model.create(data);
  }
}
