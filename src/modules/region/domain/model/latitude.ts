export class Latitude {
  constructor(public readonly value: number) {
    if (value < -90 || value > 90) {
      throw new Error(`Latitude must be a decimal number between -90.0 and 90.0`);
    }
  }

  toNumber() {
    return this.value;
  }
}
