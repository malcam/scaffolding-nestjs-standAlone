import { PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export abstract class BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({
    type: 'timestamp',
    name: 'created_at',
    //default: () => 'NOW()',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    name: 'updated_at',
    //default: () => 'NOW()',
  })
  updatedAt: Date;

  constructor(data?) {
    if (typeof data !== 'undefined' || data !== null) {
      Object.assign(this, data);
    }
  }
}
