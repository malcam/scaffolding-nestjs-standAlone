export class Price {
  private _id: number;
  private _rentalPrice: number;
  private _administrativeFee: number;

  private createdAt;
  private updatedAt;

  constructor(rentalPrice: number, administrativeFee?: number) {
    this._rentalPrice = rentalPrice;
    this._administrativeFee = administrativeFee;
  }

  get rentalPrice(): number {
    return this._rentalPrice;
  }

  get administrativeFee(): number {
    return this._administrativeFee;
  }

  hydrate(root) {
    const props = {
      _id: 'id',
      _createdAt: 'createdAt',
      _updatedAt: 'updatedAt',
    };

    Object.entries(props).forEach((item) => {
      if (typeof root[item[1]] != 'undefined') {
        this[item[0]] = root[item[1]];
      }
    });
  }
}
