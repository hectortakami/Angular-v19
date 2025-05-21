interface Passenger {
  name: string;
  children?: string[];
}

const passenger1: Passenger = {
  name: 'Bob',
};
const passenger2: Passenger = {
  name: 'Helen',
  children: ['Violet', 'Dash', 'Jack'],
};

const printChildren = (passenger: Passenger) => {
  const howManyChildren = passenger.children?.length || 0;
  console.log(passenger.name, howManyChildren);
};

printChildren(passenger2);
printChildren(passenger1);
