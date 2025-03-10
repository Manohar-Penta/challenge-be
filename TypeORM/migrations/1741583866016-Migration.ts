import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1741583866016 implements MigrationInterface {
    name = 'Migration1741583866016'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`task\` (\`id\` int NOT NULL, \`description\` text NOT NULL, \`due_date\` date NOT NULL, \`status\` text NOT NULL, \`memberName\` varchar(255) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`task\` ADD CONSTRAINT \`FK_1443f76861db4e917c064d4129b\` FOREIGN KEY (\`memberName\`) REFERENCES \`member\`(\`name\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`task\` DROP FOREIGN KEY \`FK_1443f76861db4e917c064d4129b\``);
        await queryRunner.query(`DROP TABLE \`task\``);
    }

}
