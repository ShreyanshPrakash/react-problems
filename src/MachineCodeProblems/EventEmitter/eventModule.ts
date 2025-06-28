// @ts-nocheck

let instance = null;

export class EventEmitter {
  constructor() {
    if(instance){
        return instance;
    }
    this._events = Object.create(null);
    instance = this;
  }

  on(eventName, listener) {
    if (!Object.hasOwn(this._events, eventName)) {
      this._events[eventName] = [];
    }

    this._events[eventName].push(listener);
    return this;
  }

  off(eventName, listener) {
    if (!Object.hasOwn(this._events, eventName)) {
      return this;
    }

    const listeners = this._events[eventName];

    const index = listeners.findIndex(
      (listenerItem) => listenerItem === listener,
    );

    if (index < 0) {
      return this;
    }

    this._events[eventName].splice(index, 1);
    return this;
  }

  emit(eventName, ...args) {
    if (
      !Object.hasOwn(this._events, eventName) ||
      this._events[eventName].length === 0
    ) {
      return false;
    }

    const listeners = this._events[eventName].slice();
    listeners.forEach((listener) => {
      try{
        listener.apply(null, args);
      }catch(error){
        listener.apply(null, args, error);
      }
    });

    return true;
  }
}
