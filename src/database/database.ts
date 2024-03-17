/* eslint-disable @typescript-eslint/no-explicit-any */
import knex from "knex";
import dotenv from "dotenv";

dotenv.config();

export abstract class DataBase {
	public static connection = knex({
		client: "sqlite3",
		connection: {
			filename: process.env.DB_PATH_LOCATION as string || "./src/database/social.db",
		},
		useNullAsDefault: true,
		pool: {
			min: 0,
			max: 1,
			afterCreate: (conn: any, cb: any) => {
				conn.run("PRAGMA foreign_keys = ON", cb);
			}
		}
	});
}