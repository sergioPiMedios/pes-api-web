/**To take a enviroment variables */
require('dotenv').config();
/**Authkey use case */
import Logger from "@fnd/external_interfaces/logger";
/**Create DB connections */
import { createConnection } from "@fnd/storage/postgres/client/client";


const logger = Logger(__filename);

let roleList: any[];

/**Enviroment Variables */
const PSQL_CLIENT = process.env.PSQL_CLIENT || "psql_client"
const PSQL_HOST = process.env.PSQL_HOST || "localhost"
const PSQL_PORT = process.env.PSQL_PORT || "5432"
const PSQL_USERNAME = process.env.PSQL_USERNAME || "postgres"
const PSQL_PASSWORD = process.env.PSQL_PASSWORD || "postgres123"
const PSQL_DATABASE = process.env.PSQL_DATABASE || "database"

export { roleList };

const main = async () => {
    try {
        await createDBConnection();
        await startWebApp();
    } catch (err) {
        logger.error(`ERROR : ${JSON.stringify(err)}`);
        console.log(err);
    }
}

const createDBConnection = async () => {
    try {
        await createConnection(
            {
                key: PSQL_CLIENT,
                host: PSQL_HOST,
                port: PSQL_PORT,
                username: PSQL_USERNAME,
                password: PSQL_PASSWORD,
                database: PSQL_DATABASE,
            }
        )
    } catch (err) {
        throw err;
    }
}

const startWebApp = async () => {
    try {
        /**Express server */
        const { Server } = await import('@fnd/web/server');
        const server = new Server()
        await server.start();
    } catch (err) {
        throw err;
    }
}

main();
