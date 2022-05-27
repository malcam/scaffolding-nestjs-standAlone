export class Stat {
  private _total: number;
  private _countMutations: number;
  private _countNoMutations: number;

  get total(): number {
    return this._total;
  }

  get countMutations(): number {
    return this._countMutations;
  }

  get countNoMutations(): number {
    return this._countNoMutations;
  }

  get ratio(): number {
    return this._countMutations / this._countNoMutations;
  }

  hydrate(root) {
    const props = {
      _total: 'total',
      _countMutations: 'countMutations',
      _countNoMutations: 'countNoMutations',
    };

    Object.entries(props).forEach((item) => {
      if (typeof root[item[1]] !== 'undefined') {
        this[item[0]] = root[item[1]];
      }
    });
  }
}
