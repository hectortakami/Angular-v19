function addNumbers(a: number, b: number) {
  return a + b;
}

let result = addNumbers(1, 2);
console.log(result);

const addNumbersArrow = (a: number, b: number) => a + b;

result = addNumbersArrow(3, 5);
console.log(result);

interface Character {
  name: string;
  hp: number;
  showHP: () => void;
}

const healCharacter = (character: Character, amount: number) =>
  (character.hp += amount);

const strider: Character = {
  name: 'Strider',
  hp: 30,
  showHP() {
    console.log(`Life points are: ${this.hp}`);
  },
};

strider.showHP();
healCharacter(strider, 70);
strider.showHP();
