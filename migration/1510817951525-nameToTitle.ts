import {MigrationInterface, QueryRunner} from "typeorm";

export class nameToTitle1510817951525 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "public"."product_entity" DROP "name"`);
        await queryRunner.query(`ALTER TABLE "public"."product_entity" ADD "title" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "public"."product_entity" DROP "title"`);
        await queryRunner.query(`ALTER TABLE "public"."product_entity" ADD "name" character varying NOT NULL`);
    }

}
