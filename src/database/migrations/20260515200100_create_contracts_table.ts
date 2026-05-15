import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("contracts", (table) => {
    table.increments("id").primary();

    table.integer("company_id").unsigned().notNullable();

    table.string("name", 255).notNullable();
    table.date("start_date").nullable();
    table.date("end_date").nullable();
    table.integer("hours_limit").nullable();

    table
      .foreign("company_id", "contracts_company_fk")
      .references("id")
      .inTable("companies")
      .onDelete("CASCADE");

    table.index("company_id", "contracts_company_fk");
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("contracts");
}