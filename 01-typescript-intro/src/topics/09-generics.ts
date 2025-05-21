export function whatsMyType<T>(argument: T): T {
  return argument;
}

const amIString = whatsMyType<string>('Hello World!');
amIString.charAt(0);

const amINumber = whatsMyType<number>(100);
amINumber.toExponential();

const amIBoolean = whatsMyType<number[]>([1, 2, 3]);
amIBoolean.push(4);
