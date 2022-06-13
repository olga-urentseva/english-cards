function memoizable(
  target: any,
  methodName: string,
  descriptor: PropertyDescriptor
) {
  const originalMethod = descriptor.value;
  const sym = Symbol();

  descriptor.value = function (...args: any[]) {
    return (this[sym] ||= originalMethod.apply(this, args));
  };
}

export default memoizable;
