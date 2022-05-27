import { Controller, Post, Body, HttpCode, HttpException, HttpStatus } from '@nestjs/common';
import { HasMutationCommand } from '../../application/has-mutation.command';
import { HasMutationService } from '../../application/has-mutation.service';

@Controller()
export class MutationController {
  constructor(private readonly hasMutationService: HasMutationService) {}

  @Post('/mutation')
  @HttpCode(200)
  async hasMutation(@Body() command: HasMutationCommand): Promise<any> {
    try {
      const model = await this.hasMutationService.process(command);

      if (!model.hasMutation) {
        throw new Error('Mutacion no encontrada');
      }

      return model;
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
