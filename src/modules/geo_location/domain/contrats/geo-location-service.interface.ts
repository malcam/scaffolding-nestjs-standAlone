import { Coordinate } from '../../../region/domain/model/coordinate';

export interface GeoLocationServiceInterface {
  isInSavedRegion(location: Coordinate): Promise<boolean>;
  regionNamesFromPoint(location: Coordinate): Promise<string[] | undefined>;
}
