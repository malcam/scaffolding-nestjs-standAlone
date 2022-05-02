import { CoordinateDto } from '../../../../region/infrastructure/controllers/dto/coordinate.dto';
import { Property } from '../../../domain/property';

export class PropertyDto {
  public id: number;
  public title: string;
  public description: string;
  public location: CoordinateDto;
  public pricing: {
    rentalPrice: number;
    administrativeFee: number;
  };
  public bedrooms: number;
  public bathrooms: number;
  public area: number;
  public photos: string[];
  public createdAt: string;
  public updatedAt: string;

  public regions: string[];

  constructor(model: Property) {
    this.id = model.id;
    this.title = model.title;
    this.description = model.description;
    this.location = {
      longitude: model.location.x,
      latitude: model.location.y,
    };
    this.pricing = {
      rentalPrice: model.pricing.rentalPrice,
      administrativeFee: model.pricing.administrativeFee,
    };
    this.bedrooms = model.bedrooms;
    this.bathrooms = model.bathrooms;
    this.area = model.area;
    this.createdAt = model.createdAt.toISOString();
    this.updatedAt = model.updatedAt.toISOString();

    this.photos = [];
    this.regions = model.regions;
  }
}
