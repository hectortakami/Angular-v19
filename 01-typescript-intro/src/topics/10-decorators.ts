function classDecorator<T extends { new (...args: any[]): {} }>(
  constructor: T
) {
  return class extends constructor {
    newProperty = 'New Property';
    hello = 'Override';
  };
}

@classDecorator
class SuperClass {
  public myProperty: string = 'ABC123';

  print() {
    console.log('Hello SuperClass!');
  }
}

console.log(SuperClass);

const myClass = new SuperClass();
console.log(myClass);
