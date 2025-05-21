export interface Product {
  description: string;
  price: number;
}

const phone: Product = {
  description: 'Nokia A1',
  price: 150.0,
};

const tablet: Product = {
  description: 'iPad Air',
  price: 250.0,
};

const shoppingCart = [phone, tablet];
const tax = 0.15;

export interface TaxCalculationOptions {
  tax: number;
  products: Product[];
}

export function taxCalculation(
  options: TaxCalculationOptions
): [number, number] {
  let total = 0;
  const { products, tax } = options;
  products.forEach(({ price }) => {
    total += price;
  });
  return [total, total * tax];
}

const result = taxCalculation({
  products: shoppingCart,
  tax,
});

const [total, taxTotal] = result;
console.log(`Total: ${total} Tax: ${taxTotal}`);
