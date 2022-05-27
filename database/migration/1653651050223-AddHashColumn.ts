import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddHashColumn1653651050223 implements MigrationInterface {
  name = 'AddHashColumn1653651050223';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`dna_chain\` ADD \`hash\` varchar(255) NOT NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`dna_chain\` DROP COLUMN \`hash\``);
  }
}
