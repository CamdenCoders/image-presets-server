import { Kysely, sql } from "kysely";

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable("images")
    .addColumn("image_id", "uuid", (col) =>
      col
        .defaultTo(sql`uuid_generate_v4()`)
        .primaryKey()
        .notNull()
    )
    .addColumn("image_name", "varchar", (col) => col.notNull().unique())
    .addColumn("user_id", "uuid", (col) => col.notNull())
    .execute();

  await db.schema
    .alterTable("images")
    .addForeignKeyConstraint(
      "images_user_id_fk", // Name of the foreign key constraint
      ["user_id"], // Column(s) in the 'images' table
      "user", // Referenced table
      ["user_id"] // Column(s) in the 'users' table
    )
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable("user").execute();
}
