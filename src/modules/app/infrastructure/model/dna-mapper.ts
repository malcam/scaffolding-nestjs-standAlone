export class DnaMapper {
  private readonly totalRows: number;
  public points: { x: number; y: number }[][] = [];

  constructor(dna: string[]) {
    this.totalRows = dna.length;
    this.processTopLeft();
    this.processBottomRight();
    this.processTopRight();
    this.processBottomLeft();
    this.processTopDown();
    this.processLeftRight();
  }

  public mappedDnaChain() {
    return this.points;
  }

  private processTopDown() {
    let iterator = 0;
    const limitIterations = this.totalRows;

    while (iterator < limitIterations) {
      const accumulator: { x: number; y: number }[] = [];
      for (let x = iterator, y = 0; y < this.totalRows; y++) {
        accumulator.push({ x, y });
      }
      this.points.push(accumulator);
      iterator++;
    }
  }

  private processLeftRight() {
    let iterator = 0;
    const limitIterations = this.totalRows;

    while (iterator < limitIterations) {
      const accumulator: { x: number; y: number }[] = [];
      for (let x = 0, y = iterator; x < this.totalRows; x++) {
        accumulator.push({ x, y });
      }
      this.points.push(accumulator);
      iterator++;
    }
  }

  private processTopLeft() {
    let iterator = 0;
    const limitIterations = this.totalRows;

    while (iterator < limitIterations) {
      const accumulator: { x: number; y: number }[] = [];
      for (let x = iterator, y = 0; x >= 0; x--, y++) {
        accumulator.push({ x, y });
      }
      if (accumulator.length >= 4) {
        this.points.push(accumulator);
      }
      iterator++;
    }
  }

  private processTopRight() {
    let iterator = 0;
    const limitIterations = this.totalRows;

    while (iterator < limitIterations) {
      const accumulator: { x: number; y: number }[] = [];
      for (let x = this.totalRows - iterator - 1, y = 0; x < this.totalRows; x++, y++) {
        accumulator.push({ x, y });
      }
      if (accumulator.length >= 4) {
        this.points.push(accumulator);
      }
      iterator++;
    }
  }

  private processBottomLeft() {
    let iterator = 0;
    const limitIterations = this.totalRows;

    while (iterator < limitIterations) {
      const accumulator: { x: number; y: number }[] = [];
      for (let x = iterator, y = limitIterations - 1; x >= 0; x--, y--) {
        accumulator.push({ x, y });
      }
      if (accumulator.length >= 4) {
        this.points.push(accumulator);
      }
      iterator++;
    }
  }

  private processBottomRight() {
    let iterator = 0;
    const limitIterations = this.totalRows;

    while (iterator < limitIterations) {
      const accumulator: { x: number; y: number }[] = [];
      for (let x = this.totalRows - iterator, y = limitIterations; x <= this.totalRows; x++, y--) {
        accumulator.push({ x: x - 1, y: y - 1 });
      }

      if (accumulator.length >= 4) {
        this.points.push(accumulator);
      }
      iterator++;
    }
  }
}
