import { Injectable, Inject } from '@nestjs/common';
import { ApplicationService } from '../../shared/contracts/application-service';
import { TypeormRegionRepository } from '../infrastructure/repositories/typeorm-region.repository';
import { Coordinate } from '../domain/model/coordinate';
import { REGION_REPOSITORY } from '../../shared/injection-tokens';
import { UpdateRegionCommand } from './update-region.command';

@Injectable()
export class UpdateRegionService implements ApplicationService<UpdateRegionCommand> {
  constructor(
    @Inject(REGION_REPOSITORY)
    private readonly regionRepository: TypeormRegionRepository,
  ) {}

  async process(command: UpdateRegionCommand): Promise<any> {
    const region = await this.regionRepository.byIdOrFail(command.id);

    await this.assertThatEntityNameNotExist(command.name, region.name);

    region.setName(command.name);

    region.setCoordinates(
      new Coordinate(
        command.boundingBox.bottomLeft.longitude,
        command.boundingBox.bottomLeft.latitude,
      ),
      new Coordinate(
        command.boundingBox.upperRight.longitude,
        command.boundingBox.upperRight.latitude,
      ),
    );

    return this.regionRepository.update(region);
  }

  /**
   * Assert that a region name does not exist preventing a collision
   * @param newName new name to use
   * @param oldName region name in persistence system
   */
  private async assertThatEntityNameNotExist(newName: string, oldName: string) {
    if (oldName === newName) {
      return;
    }

    const result = await this.regionRepository.byName(newName);

    if (result !== null) {
      throw new Error(`The region name already exist`);
    }
  }
}
