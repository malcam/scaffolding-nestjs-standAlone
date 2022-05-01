import { Injectable, Inject } from '@nestjs/common';
import { ApplicationService } from '../../shared/contracts/application-service';
import { CreateRegionCommand } from './create-region.command';
import { TypeormRegionRepository } from '../infrastructure/repositories/typeorm-region.repository';
import { Region } from '../domain/model/region';
import { Coordinate } from '../domain/model/coordinate';
import { REGION_REPOSITORY } from '../../shared/injection-tokens';

@Injectable()
export class CreateRegionService implements ApplicationService<CreateRegionCommand> {
  constructor(
    @Inject(REGION_REPOSITORY)
    private readonly regionRepository: TypeormRegionRepository,
  ) {}

  /**
   * Create a new region with unique name
   * @param command region data
   */
  async process(command: CreateRegionCommand): Promise<any> {
    await this.assertThatEntityNameNotExist(command.name);

    const region = new Region(
      command.name,
      new Coordinate(
        command.boundingBox.bottomLeft.longitude,
        command.boundingBox.bottomLeft.latitude,
      ),
      new Coordinate(
        command.boundingBox.upperRight.longitude,
        command.boundingBox.upperRight.latitude,
      ),
    );

    return this.regionRepository.create(region);
  }

  /**
   * Assert that a region name does not exist
   * @param name of region
   */
  private async assertThatEntityNameNotExist(name: string) {
    const result = await this.regionRepository.byName(name);

    if (result !== null) {
      throw new Error(`The region name already exist`);
    }
  }
}
