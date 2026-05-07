import knex from "knex";
import{ Model } from "objection";

const KnexInstance = knex({
    client: 'mysql2',

    connection: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
    },
})

Model.knex(KnexInstance);

export default KnexInstance;