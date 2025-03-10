import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1741583722527 implements MigrationInterface {
    name = 'Migration1741583722527'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`task\` DROP COLUMN \`status\``);
        await queryRunner.query(`ALTER TABLE \`task\` ADD \`status\` text NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`task\` DROP COLUMN \`status\``);
        await queryRunner.query(`ALTER TABLE \`task\` ADD \`status\` enum ('done', 'pending') NOT NULL DEFAULT 'pending'`);
    }

}
