export class DnaChain {
  private readonly validTokens = ['A', 'T', 'C', 'G'];

  private _id: number;
  private _createdAt: Date;
  private _hasMutation: boolean;
  private _uniqueId: string;
  private _sequence: string[] = [];

  get id(): number {
    return this._id;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get sequence(): string[] {
    return this._sequence;
  }

  get hasMutation(): boolean {
    return this._hasMutation;
  }

  get uniqueId(): string {
    return this._uniqueId;
  }

  dimension() {
    return { m: this._sequence.length, n: this._sequence[0].length };
  }

  add(stringSequence: string) {
    for (let i = 0; i < stringSequence.length; i++) {
      if (!this.isValidToken(stringSequence.charAt(i))) {
        throw new Error(
          'Las letras de los caracteres solo pueden ser: ' + this.validTokens.join(', '),
        );
      }
    }

    this._sequence.push(stringSequence);
  }

  markMutationWith(hasMutation: boolean) {
    this._hasMutation = hasMutation;
  }

  makeUnique(hash: string) {
    this._uniqueId = hash;
  }

  private isValidToken(character) {
    return this.validTokens.includes(character);
  }

  hydrate(root) {
    const props = {
      _id: 'id',
      _createdAt: 'createdAt',
      _hasMutation: 'hasMutation',
      _uniqueId: 'uniqueId',
      _sequence: 'sequence',
    };

    Object.entries(props).forEach((item) => {
      if (typeof root[item[1]] !== 'undefined') {
        this[item[0]] = root[item[1]];
      }
    });
  }

  public toArray() {
    return this._sequence;
  }
}
