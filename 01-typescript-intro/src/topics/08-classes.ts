export class Person {
  constructor(
    public name: string,
    public address: string = 'No address by default'
  ) {}
}

export class Hero extends Person {
  constructor(
    public alterEgo: string,
    public age: number,
    public realName: string
  ) {
    super(realName, '101 Brooklyn St, NY, USA');
  }
}

const hero = new Hero('Spider Man', 17, 'Peter Parker');
console.table({ ...hero });
console.log(hero.address);
