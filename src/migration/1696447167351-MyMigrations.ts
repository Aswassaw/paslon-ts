import { MigrationInterface, QueryRunner } from "typeorm";

export class MyMigrations1696447167351 implements MigrationInterface {
    name = 'MyMigrations1696447167351'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "votes" ("id" SERIAL NOT NULL, "voterName" character varying(55) NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "usersId" integer, CONSTRAINT "PK_f3d9fd4a0af865152c3f59db8ff" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "name" character varying(55) NOT NULL, "vision" character varying(205) NOT NULL, "image" text NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "votes" ADD CONSTRAINT "FK_7d1591eb476a0d0a2d39aaedbe3" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "votes" DROP CONSTRAINT "FK_7d1591eb476a0d0a2d39aaedbe3"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "votes"`);
    }

}
