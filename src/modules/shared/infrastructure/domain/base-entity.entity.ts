import { PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

export abstract class BaseEntity {
  constructor(data?) {
    if (typeof data !== 'undefined' || data !== null) {
      Object.assign(this, data);
    }
  }

  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @CreateDateColumn({
    type: 'timestamp',
    name: 'created_at',
  })
  createdAt: Date;
}
