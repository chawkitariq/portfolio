import { MigrationInterface, QueryRunner } from "typeorm";

export class PublishedAt1773140979865 implements MigrationInterface {
    name = 'PublishedAt1773140979865'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "posts" ALTER COLUMN "published_at" SET NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "posts" ALTER COLUMN "published_at" DROP NOT NULL`);
    }

}
