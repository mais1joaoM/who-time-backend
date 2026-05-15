import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("user_companies", (table) => {
    table.increments("id").primary();

    table.integer("user_id").unsigned().notNullable();
    table.integer("company_id").unsigned().notNullable();

    table.timestamp("created_at").nullable().defaultTo(knex.fn.now());

    table.unique(["user_id", "company_id"], {
      indexName: "unique_user_company",
    });

    table.index("company_id", "company_id");

    table
      .foreign("user_id", "user_companies_ibfk_1")
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");

    table
      .foreign("company_id", "user_companies_ibfk_2")
      .references("id")
      .inTable("companies")
      .onDelete("CASCADE");
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("user_companies");
}