import { Component, signal } from "@angular/core";

@Component({
  templateUrl: './counter-mvc-page.component.html'
})
export class CounterMVCPageComponent {
  counter = 0;

  counterSignal = signal(10);

  increaseCounter(value: number) {
    this.counter += value;
    this.counterSignal.update(currentValue => currentValue + value)
  }
  decreaseCounter(value: number) {
    this.counter -= value;
    this.counterSignal.update(currentValue => currentValue - value)
  }
  resetCounter() {
    this.counter = 0;
    this.counterSignal.set(0);
  }
}
