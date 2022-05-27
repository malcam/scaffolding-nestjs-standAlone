export class DnaChain {
  private _id: number;
  private _createdAt: Date;
  private _hasMutation: boolean;

  private readonly validTokens = ['A', 'T', 'C', 'G'];
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

  private isValidToken(character) {
    return this.validTokens.includes(character);
  }

  hydrate(root) {
    const props = {
      _id: 'id',
      _createdAt: 'createdAt',
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
