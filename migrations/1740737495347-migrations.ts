import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1740737495347 implements MigrationInterface {
    name = 'Migrations1740737495347'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "username" character varying NOT NULL, "password" character varying NOT NULL, "role" character varying NOT NULL, "isActive" boolean NOT NULL DEFAULT true, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "user_email_idx" ON "user" ("email") `);
        await queryRunner.query(`CREATE INDEX "user_username_idx" ON "user" ("username") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."user_username_idx"`);
        await queryRunner.query(`DROP INDEX "public"."user_email_idx"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
