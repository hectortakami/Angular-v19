const skills: string[] = ['Bash', 'Counter', 'Healing'];
console.log(skills);

interface Character {
  name: string;
  hp: number;
  skills: string[];
  homeTown?: string;
}

const character1: Character = {
  name: 'Strider',
  hp: 100,
  skills: ['Bash', 'Counter'],
  homeTown: 'London',
};

console.table(character1);
