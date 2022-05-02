import { Coordinate } from '../../region/domain/model/coordinate';
import { Price } from './price';

export class Property {
  private _id: number;
  private _title: string;
  private _description: string;
  private _location: Coordinate;
  private _bedrooms: number;
  private _bathrooms: number;
  private _pricing: Price;
  private _area: number;
  private photos: string[];
  private _regions: string[] = [];

  private _createdAt;
  private _updatedAt;

  constructor(title: string, location: Coordinate, description?: string) {
    this._title = title;
    this._location = location;
    this._description = description;
  }

  get id(): number {
    return this._id;
  }

  get title(): string {
    return this._title;
  }

  get description(): string {
    return this._description;
  }

  get location(): Coordinate {
    return this._location;
  }

  get bedrooms(): number {
    return this._bedrooms;
  }

  get bathrooms(): number {
    return this._bathrooms;
  }

  get pricing(): Price {
    return this._pricing;
  }

  get area(): number {
    return this._area;
  }

  get createdAt() {
    return this._createdAt;
  }

  get updatedAt() {
    return this._updatedAt;
  }

  get regions(): string[] {
    return this._regions;
  }

  appendToRegion(regionName: string) {
    this._regions.push(regionName);
  }

  addPrice(rentalPrice: number, administrativeFee?: number) {
    this._pricing = new Price(rentalPrice, administrativeFee);
  }

  addRooms(bedrooms: number, bathrooms: number, area: number) {
    if (bedrooms < 1 || bedrooms > 6) {
      throw new Error('The bedrooms field has a minimum value of 1 and a maximum value of 6');
    }

    if (bathrooms < 1 || bathrooms > 4) {
      throw new Error('The bathrooms field has a minimum value of 1 and a maximum value of 4');
    }

    if (area < 15 || area > 300) {
      throw new Error('The area field has a minimum value of 15 and a maximum value of 300');
    }

    this._bedrooms = bedrooms;
    this._bathrooms = bathrooms;
    this._area = area;
  }

  hydrate(root) {
    const props = {
      _id: 'id',
      _createdAt: 'createdAt',
      _updatedAt: 'updatedAt',
      _title: 'title',
      _description: 'description',
      _location: 'location',
      _bedrooms: 'bedrooms',
      _bathrooms: 'bathrooms',
      _pricing: 'pricing',
      _area: 'area',
    };

    Object.entries(props).forEach((item) => {
      if (typeof root[item[1]] != 'undefined') {
        this[item[0]] = root[item[1]];
      }
    });
  }
}
