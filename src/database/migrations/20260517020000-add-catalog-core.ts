import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddProductosServiciosCore20260517020000 implements MigrationInterface {
  public readonly name = 'AddProductosServiciosCore20260517020000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DO $$
      BEGIN
        IF NOT EXISTS (
          SELECT 1
          FROM pg_type
          WHERE typname = 'item_class_enum'
        ) THEN
          CREATE TYPE "item_class_enum" AS ENUM ('Product', 'Service');
        END IF;
      END
      $$;
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "units" (
        "unit_id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        "business_id" UUID NOT NULL REFERENCES "businesses"("business_id"),
        "unit_name" VARCHAR(100) NOT NULL,
        "abbreviation" VARCHAR(10) NOT NULL,
        "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "categories" (
        "category_id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        "business_id" UUID NOT NULL REFERENCES "businesses"("business_id"),
        "category_name" VARCHAR(100) NOT NULL,
        "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "items" (
        "item_id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        "item_class" "item_class_enum" NOT NULL,
        "name" VARCHAR(100) NOT NULL,
        "description" TEXT,
        "sku" VARCHAR(100) UNIQUE,
        "price" NUMERIC(10,2) NOT NULL DEFAULT 0.00,
        "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "products" (
        "product_id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        "item_id" UUID NOT NULL UNIQUE REFERENCES "items"("item_id"),
        "unit_id" UUID NOT NULL REFERENCES "units"("unit_id"),
        "stock" INTEGER NOT NULL DEFAULT 1
      )
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "services" (
        "service_id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        "item_id" UUID NOT NULL UNIQUE REFERENCES "items"("item_id"),
        "category_id" UUID NOT NULL REFERENCES "categories"("category_id")
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE IF EXISTS "services" CASCADE');
    await queryRunner.query('DROP TABLE IF EXISTS "products" CASCADE');
    await queryRunner.query('DROP TABLE IF EXISTS "items" CASCADE');
    await queryRunner.query('DROP TABLE IF EXISTS "categories" CASCADE');
    await queryRunner.query('DROP TABLE IF EXISTS "units" CASCADE');
    await queryRunner.query('DROP TYPE IF EXISTS "item_class_enum" CASCADE');
  }
}
