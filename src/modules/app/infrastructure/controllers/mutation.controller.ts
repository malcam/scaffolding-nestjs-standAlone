import { Controller, Post, Body, HttpCode, HttpException, HttpStatus } from '@nestjs/common';
import { HasMutationCommand } from '../../application/has-mutation.command';
import { HasMutationService } from '../../application/has-mutation.service';
import { CreateDnaService } from '../../application/create-dna.service';
import { CreateDnaCommand } from '../../application/create-dna.command';
import { DnaChainDto } from './dto/dna-chain.dto';

@Controller()
export class MutationController {
  constructor(
    private readonly hasMutationService: HasMutationService,
    private readonly createDnaService: CreateDnaService,
  ) {}

  @Post('/mutation')
  @HttpCode(200)
  async hasMutation(@Body() command: HasMutationCommand): Promise<any> {
    try {
      const model = await this.hasMutationService.process(command);

      // TODO: refactor to use events
      const createCommand = new CreateDnaCommand();
      createCommand.dna = model.toArray();
      createCommand.hasMutation = model.hasMutation;

      const result = await this.createDnaService.process(createCommand);

      if (!result.hasMutation) {
        throw new Error('Mutacion no encontrada');
      }

      return new DnaChainDto(result);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: error.message,
        },
        HttpStatus.FORBIDDEN,
      );
    }
  }
}
