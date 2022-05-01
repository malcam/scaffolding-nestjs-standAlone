import { Latitude } from './latitude';
import { Longitude } from './longitude';

/**
 * Include information on the coordinate range for its Geometries.
 * The "bbox" values define shapes with edges that follow lines of
 * constant longitude and latitude.
 */
export class BoundingBox {
  private _west: Longitude;
  private _south: Latitude;
  private _east: Longitude;
  private _north: Latitude;

  constructor(west: Longitude, south: Latitude, east: Longitude, north: Latitude) {
    this._west = west;
    this._south = south;
    this._east = east;
    this._north = north;
  }

  get west(): Longitude {
    return this._west;
  }

  get south(): Latitude {
    return this._south;
  }

  get east(): Longitude {
    return this._east;
  }

  get north(): Latitude {
    return this._north;
  }
}
