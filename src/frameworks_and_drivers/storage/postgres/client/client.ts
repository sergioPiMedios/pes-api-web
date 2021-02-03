import { Sequelize } from 'sequelize-typescript';
import logger from "@fnd/external_interfaces/logger";

const clients = new Map();
const Logger = logger(__filename);

interface connectionProperties {
    key?: string;
    host?: string;
    port?: string;
    database?: string;
    username?: string;
    password?: string;
}

const createConnection = async ({
    key = "",
    host = "localhost",
    port = "5432",
    database = "",
    username = "",
    password = ""
}: connectionProperties) => {
    try {
        const con = new Sequelize(
            database,
            username,
            password,
            {
                host: host,
                port: parseInt(port),
                dialect: "postgres",
                pool: {
                    max: parseInt(process.env.PSQL_POOL_MAX || "5"),
                    min: parseInt(process.env.PSQL_POOL_MIN || "1"),
                    idle: parseInt(process.env.PSQL_POOL_IDLE || "10000")
                },
                //SHOW DATABASE OPERATION IN CONSOLE
                logging: (msg) => { Logger.debug(msg) },
                //How many times a failing query is automatically retried
                // retry: { max: Number.MAX_VALUE },
            },
        );
        /* verify postgresql connection */
        con.authenticate()
            .then(() => {
                console.log(
                    `🆗 Conectado a base de datos ${process.env.PSQL_DATABASE} modo ${process.env.NODE_ENV}`
                );
            })
            .catch(err => {
                Logger.error(
                    `🚫 No se conecto, recuerda configurar la conexion al host a la base datos, ${err}`
                );
            });
        clients.set(key, con);
    } catch (err) {
        throw err;
    }
}

export {
    createConnection,
    clients,
}