import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateDnaChainTable1653635835606 implements MigrationInterface {
  name = 'CreateDnaChainTable1653635835606';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      // eslint-disable-next-line max-len
      `CREATE TABLE \`dna_chain\` (\`id\` int UNSIGNED NOT NULL AUTO_INCREMENT, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`columns\` int NOT NULL, \`rows\` int NOT NULL, \`sequence\` json NOT NULL, \`has_mutation\` tinyint NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`dna_chain\``);
  }
}
