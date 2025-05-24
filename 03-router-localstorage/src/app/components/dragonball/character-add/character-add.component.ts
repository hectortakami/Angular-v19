import {  Component, output, signal } from '@angular/core';
import { Character } from '../../../interfaces/character.interface';

@Component({
  selector: 'dragonball-character-add',
  imports: [],
  templateUrl: './character-add.component.html',
})
export class CharacterAddComponent {

  name = signal('');
  power = signal(0);
  newCharacter = output<Character>();

  addCharacter(name: string, power: number) {
    if (!this.name() || !this.power() || this.power() <= 0) {
      return;
    }
     const newCharacter: Character = {
       id: Math.floor(Math.random()*1000),
       name,
       power,
     };
     this.newCharacter.emit(newCharacter)
  }


 }
