import {MigrationInterface, QueryRunner} from "typeorm";

export class initial1510817207009 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "product_entity" ("id" integer NOT NULL, "name" character varying NOT NULL, "releaseYear" integer NOT NULL, PRIMARY KEY("id"))`);
        await queryRunner.query(`CREATE TABLE "review_entity" ("id" integer NOT NULL, "productId" integer NOT NULL, "userId" integer NOT NULL, "rating" integer NOT NULL, "title" character varying NOT NULL, "summary" character varying NOT NULL, PRIMARY KEY("id"))`);
        await queryRunner.query(`CREATE TABLE "user_entity" ("id" integer NOT NULL, "name" character varying NOT NULL, PRIMARY KEY("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP TABLE "user_entity"`);
        await queryRunner.query(`DROP TABLE "review_entity"`);
        await queryRunner.query(`DROP TABLE "product_entity"`);
    }

}
