import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("users", (table) => {
    table.increments("id").primary();

    table.string("name", 100).nullable();
    table.string("email", 255).nullable();
    table.string("password", 255).nullable();

    table.enum("role", ["admin", "user", "manager"]).defaultTo("user");

    table.timestamp("created_at").nullable().defaultTo(knex.fn.now());
    table.timestamp("deleted_at").nullable();

    table.boolean("is_active").defaultTo(true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("users");
}