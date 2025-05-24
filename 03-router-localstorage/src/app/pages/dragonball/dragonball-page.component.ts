import { NgClass } from '@angular/common';
import { Component, signal } from '@angular/core';

interface Character {
  id: number;
  name: string;
  power: number;
}

@Component({
  templateUrl: './dragonball-page.component.html',
  imports: [NgClass],
})
export class DragonballPageComponent {
  name = signal('Gohan');
  power = signal(1000);

  characters = signal<Character[]>([
    { id: 1, name: 'Goku', power: 9001 },
    { id: 2, name: 'Vegeta', power: 8000 },
    { id: 3, name: 'Piccoro', power: 3000 },
    { id: 4, name: 'Yamcha', power: 500 },
  ]);

  constructor() {}

  addCharacter(name: string, power: number) {
    if (!this.name() || !this.power() || this.power() <= 0) {
      return;
    }
    const newCharacter: Character = {
      id: this.characters.length - 1,
      name,
      power,
    };
    this.characters.update((list) => [...list, newCharacter]);
  }
}
