/* eslint-disable max-len */
import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreatePropertyTable1651491470295 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE \`property\`  (
  \`id\` int UNSIGNED NOT NULL AUTO_INCREMENT,
  \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  \`title\` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  \`description\` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  \`location\` geometry NOT NULL,
  \`bedrooms\` int NOT NULL,
  \`bathrooms\` int NOT NULL,
  \`area\` int NOT NULL,
  \`regions\` json NOT NULL,
  \`migration\` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  \`price_id\` int UNSIGNED NOT NULL,
  PRIMARY KEY (\`id\`) USING BTREE,
  UNIQUE INDEX \`REL_9c031caafbc3892ad5401197c3\`(\`price_id\`) USING BTREE,
  CONSTRAINT \`FK_9c031caafbc3892ad5401197c34\` FOREIGN KEY (\`price_id\`) REFERENCES \`price\` (\`id\`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci;`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS \`region\``);
  }
}
