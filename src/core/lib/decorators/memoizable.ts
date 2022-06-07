function memoizable(
  target: any,
  methodName: string,
  descriptor: PropertyDescriptor
) {
  const originalMethod = descriptor.value;
  let memoizedValue;

  descriptor.value = function (...args: any[]) {
    return (memoizedValue ||= originalMethod.apply(this, args));
  };
}

export default memoizable;
