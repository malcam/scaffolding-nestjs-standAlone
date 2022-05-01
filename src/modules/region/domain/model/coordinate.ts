/**
 * Point coordinates are in x, y order (easting, northing for projected
 * coordinates, longitude, and latitude for geographic coordinates)
 */
export class Coordinate {
  private _x: number;
  private _y: number;

  constructor(x: number, y: number) {
    this._x = x;
    this._y = y;
  }

  get x(): number {
    return this._x;
  }

  get y(): number {
    return this._y;
  }
}
