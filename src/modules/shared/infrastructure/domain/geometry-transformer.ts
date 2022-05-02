import * as wkx from 'wkx';
import { Geometry, Point } from 'geojson';
import { ValueTransformer } from 'typeorm/decorator/options/ValueTransformer';

// https://datatracker.ietf.org/doc/html/rfc7946#appendix-A
// eslint-disable-next-line max-len
// https://gis.stackexchange.com/questions/366853/wkt-coordinate-inner-order-long-lat
// eslint-disable-next-line max-len
// https://dba.stackexchange.com/questions/242001/mysql-8-st-geomfromtext-giving-error-latitude-out-of-range-in-function-st-geomfr
/**
 * TypeORM transformer to convert GeoJSON to MySQL WKT (Well Known Text)
 */
export class GeometryTransformer implements ValueTransformer {
  to(geojson: Geometry): string {
    const geojsonPoint = geojson as Point;

    // The WKT output shows that for EPSG:4326 the axis order is lat/long
    const point = {
      type: 'Point',
      coordinates: [geojsonPoint.coordinates[1], geojsonPoint.coordinates[0]],
    };

    return wkx.Geometry.parseGeoJSON(point).toWkt();
  }

  from(wkb: string): Record<string, any> | undefined {
    if (!wkb) return;

    const result = wkx.Geometry.parse(wkb).toGeoJSON() as Point;

    // The WKT output shows that for EPSG:4326 the axis order is lat/long

    return {
      type: 'Point',
      coordinates: [result.coordinates[1], result.coordinates[0]],
    };
  }
}
