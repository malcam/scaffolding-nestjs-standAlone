import { Region } from '../../../domain/model/region';
import { CoordinateDto } from './coordinate.dto';

export class RegionDto {
  public id: number;
  public name: string;
  public boundingBox: {
    bottomLeft: CoordinateDto;
    upperRight: CoordinateDto;
  };

  constructor(model: Region) {
    this.id = model.id;
    this.name = model.name;
    this.boundingBox = {
      bottomLeft: {
        longitude: model.left(),
        latitude: model.bottom(),
      },
      upperRight: {
        longitude: model.right(),
        latitude: model.top(),
      },
    };
  }
}
