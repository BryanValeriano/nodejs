import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('meals', (table) => {
    table.uuid('id').primary();
    table.uuid('ownerId').index();
    table.foreign('ownerId').references('users.id');
    table.text('title').notNullable();
    table.text('description').notNullable();
    table.timestamp('date').defaultTo(knex.fn.now()).notNullable();
    table.boolean('isDiet').notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('meals');
}
