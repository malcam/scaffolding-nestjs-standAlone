export class Longitude {
  constructor(public readonly value: number) {
    if (value < -180 || value > 180) {
      throw new Error(`Longitude must be a decimal number between -180.0 and 180.0`);
    }
  }

  toNumber() {
    return this.value;
  }
}
