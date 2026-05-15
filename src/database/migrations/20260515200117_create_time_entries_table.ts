import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("time_entries", (table) => {
    table.increments("id").primary();

    table.integer("user_id").unsigned().notNullable();
    table.integer("company_id").unsigned().notNullable();
    table.integer("contract_id").unsigned().notNullable();

    table.date("work_date").notNullable();
    table.decimal("hours", 10, 2).notNullable();

    table.text("description").nullable();

    table
      .enum("status", ["pending", "approved", "rejected"])
      .defaultTo("pending");

    table.timestamp("created_at").nullable().defaultTo(knex.fn.now());

    table.index("company_id", "company_id");
    table.index("contract_id", "time_entries_contract_fk");
    table.index("user_id", "time_entries_user_fk");

    table
      .foreign("contract_id", "time_entries_contract_fk")
      .references("id")
      .inTable("contracts")
      .onDelete("CASCADE");

    table
      .foreign("company_id", "time_entries_ibfk_2")
      .references("id")
      .inTable("companies");

    table
      .foreign("user_id", "time_entries_user_fk")
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("time_entries");
}