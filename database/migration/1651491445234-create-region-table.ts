import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateRegionTable1651491445234 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE \`price\`  (
  \`id\` int UNSIGNED NOT NULL AUTO_INCREMENT,
  \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  \`rental_price\` decimal(10, 0) NOT NULL,
  \`administrative_fee\` decimal(10, 0) NULL DEFAULT NULL,
  PRIMARY KEY (\`id\`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci;`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS \`price\``);
  }
}
