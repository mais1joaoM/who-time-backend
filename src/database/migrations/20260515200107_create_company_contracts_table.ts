import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("company_contracts", (table) => {
    table.increments("id").primary();

    table.integer("company_id").unsigned().notNullable();
    table.integer("contract_id").unsigned().notNullable();

    table.timestamp("created_at").nullable().defaultTo(knex.fn.now());

    table.unique(["company_id", "contract_id"], {
      indexName: "unique_company_contract",
    });

    table.index("contract_id", "fk_company_contracts_contract");

    table
      .foreign("company_id", "fk_company_contracts_company")
      .references("id")
      .inTable("companies")
      .onDelete("CASCADE");

    table
      .foreign("contract_id", "fk_company_contracts_contract")
      .references("id")
      .inTable("contracts")
      .onDelete("CASCADE");
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("company_contracts");
}