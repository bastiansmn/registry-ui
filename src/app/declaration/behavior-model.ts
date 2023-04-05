import {BehaviorSubject} from "rxjs";

export class ModelSubject<T> extends BehaviorSubject<T> {

  constructor(initialValue: T) {
    super(initialValue);
  }

  set model(value: T) {
    this.next(value);
  }

  get model(): T {
    return this.value;
  }
}
