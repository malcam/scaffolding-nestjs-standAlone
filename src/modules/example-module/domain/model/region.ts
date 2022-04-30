import { Coordinate } from './coordinate';
import { BoundingBox } from './bounding-box';
import { Longitude } from './longitude';
import { Latitude } from './latitude';

/**
 * Represents a geographic area
 */
export class Region {
  private _id: number;
  private _name: string;
  private boundingBox: BoundingBox;

  constructor(name: string, bottomLeft: Coordinate, upperRight: Coordinate) {
    if (name === '') {
      throw new Error(`Region Name cant be empty`);
    }

    this.setName(name);
    this.setCoordinates(bottomLeft, upperRight);
  }

  get id(): number {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get bottomLeft(): Coordinate {
    return new Coordinate(this.boundingBox.west.toNumber(), this.boundingBox.south.toNumber());
  }

  get upperRight(): Coordinate {
    return new Coordinate(this.boundingBox.east.toNumber(), this.boundingBox.north.toNumber());
  }

  left() {
    return this.boundingBox.west.toNumber();
  }

  bottom() {
    return this.boundingBox.south.toNumber();
  }

  right() {
    return this.boundingBox.east.toNumber();
  }

  top() {
    return this.boundingBox.north.toNumber();
  }

  setName(name: string) {
    this._name = name;
  }

  setCoordinates(bottomLeft: Coordinate, upperRight: Coordinate) {
    this.boundingBox = new BoundingBox(
      new Longitude(bottomLeft.x),
      new Latitude(bottomLeft.y),
      new Longitude(upperRight.x),
      new Latitude(upperRight.y),
    );
  }

  /**
   * Filling an object with data from a persistence system
   * @param root
   */
  public hydrate(root) {
    this._id = root.id;
  }
}
