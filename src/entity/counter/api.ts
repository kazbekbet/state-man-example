export function asyncCount(
  countTo: number,
  delay: number,
  isReject: boolean
): Promise<number> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      isReject
        ? reject({ message: 'Произошла ошибка 500!' })
        : resolve(countTo);
    }, delay);
  });
}
