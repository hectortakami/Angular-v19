import { Component } from "@angular/core";


@Component({
  template: `
  <h1>Counter Component Page</h1>
  <p>Count: {{counter}}</p>
  <button (click)="increaseCounter(1)" >+1</button>
  `
})
export class CounterPageComponent {

  counter = 10;

  increaseCounter(value: number){
    this.counter += value
  }
}
