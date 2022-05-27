import { Injectable } from '@nestjs/common';
import * as hasher from 'node-object-hash';
import { UniqueIdService as IUniqueIdService } from '../../domain/contracts/unique-id.service';

@Injectable()
export class UniqueIdService implements IUniqueIdService {
  public identityHashCode(object: unknown): string {
    return hasher().hash(object);
  }
}
