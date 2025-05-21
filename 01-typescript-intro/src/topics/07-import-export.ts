import {
  taxCalculation,
  type Product,
  type TaxCalculationOptions,
} from './06-function-destructuring';

const shoppingCart: Product[] = [
  {
    description: 'Headphones',
    price: 12.0,
  },
  {
    description: 'Keyboard',
    price: 25.0,
  },
];

const options: TaxCalculationOptions = {
  products: shoppingCart,
  tax: 0.15,
};
const result = taxCalculation(options);
console.log([...result]);
