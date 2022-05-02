import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreatePriceTable1651491461148 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE \`region\`  (
  \`id\` int UNSIGNED NOT NULL AUTO_INCREMENT,
  \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  \`name\` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  \`bottom_left_location\` geometry NOT NULL,
  \`upper_right_location\` geometry NOT NULL,
  PRIMARY KEY (\`id\`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS \`region\``);
  }
}
