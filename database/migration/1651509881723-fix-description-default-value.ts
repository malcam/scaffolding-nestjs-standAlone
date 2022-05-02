/* eslint-disable max-len */
import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddPropertyDescriptionDefaultValue1651509881723 implements MigrationInterface {
  name = 'AddPropertyDescriptionDefaultValue1651509881723';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`property\` DROP FOREIGN KEY \`FK_9c031caafbc3892ad5401197c34\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`property\` CHANGE \`description\` \`description\` text NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`property\` ADD CONSTRAINT \`FK_9c031caafbc3892ad5401197c34\` FOREIGN KEY (\`price_id\`) REFERENCES \`price\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`property\` DROP FOREIGN KEY \`FK_9c031caafbc3892ad5401197c34\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`property\` CHANGE \`description\` \`description\` text NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`property\` ADD CONSTRAINT \`FK_9c031caafbc3892ad5401197c34\` FOREIGN KEY (\`price_id\`) REFERENCES \`price\`(\`id\`) ON DELETE RESTRICT ON UPDATE RESTRICT`,
    );
  }
}
