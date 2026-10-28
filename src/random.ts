// Exact rejection sampling: the accepted space is divisible by the range size.
export function randomInteger(min: number, max: number, fill: (a: Uint32Array) => Uint32Array = a => crypto.getRandomValues(a)): number {
  if (!Number.isSafeInteger(min) || !Number.isSafeInteger(max) || min > max) throw new Error('Введите целые числа от −9007199254740991 до 9007199254740991. Минимум должен быть не больше максимума.');
  const width = BigInt(max) - BigInt(min) + 1n, space = 1n << 64n, limit = space - space % width;
  let value: bigint;
  do { const a = fill(new Uint32Array(2)); value = (BigInt(a[0]) << 32n) | BigInt(a[1]); } while (value >= limit);
  return Number(BigInt(min) + value % width);
}
export function landingRotation(current: number, index: number, count: number): number {
  const target = (360 - (index + 0.5) * 360 / count) % 360;
  return current + 2160 + ((target - current % 360 + 360) % 360);
}
export function sectorAtPointer(rotation: number, count: number): number { return Math.floor(((360 - rotation % 360) % 360) / (360 / count)); }
