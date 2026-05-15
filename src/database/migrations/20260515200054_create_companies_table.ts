import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("companies", (table) => {
    table.increments("id").primary();

    table.string("name", 255).notNullable();
    table.string("cnpj", 20).nullable();

    table.timestamp("created_at").nullable().defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("companies");
}