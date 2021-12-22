export default class Emitter<T> {
  #handlers: {
    [eventName in keyof T]?: Set<(value: T[eventName]) => void>;
  } = {};

  emit<K extends keyof T>(event: K, value: T[K]): void {
    this.#handlers[event]?.forEach((h) => h(value));
  }
  on<K extends keyof T>(event: K, handler: (value: T[K]) => void): void {
    const set = this.#handlers[event];
    if (set != null) {
      set.add(handler);
    } else {
      this.#handlers[event] = new Set([handler]);
    }
  }
  off<K extends keyof T>(event: K, handler: (value: T[K]) => void): void {
    this.#handlers[event]?.delete(handler);
  }
}
