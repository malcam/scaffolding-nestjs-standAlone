export class DnaChain {
  private readonly validTokens = ['A', 'T', 'C', 'G'];
  private map: string[] = [];

  add(stringSequence: string) {
    for (let i = 0; i < stringSequence.length; i++) {
      if (!this.isValidToken(stringSequence.charAt(i))) {
        throw new Error(
          'Las letras de los caracteres solo pueden ser: ' + this.validTokens.join(', '),
        );
      }
    }

    this.map.push(stringSequence);
  }

  private isValidToken(character) {
    return this.validTokens.includes(character);
  }

  public toArray() {
    return this.map;
  }
}
