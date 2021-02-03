/**Express server import */
import express, { json } from "express";
/**Morgan Middleware */
import morgan from "../external_interfaces/morgan";
/**Cors */
import cors from "cors";
/**Routers*/
import { routes as appRoutes } from "./routes/index";
/**Middleware to check the token */
import checkJwt from "./middlewares/auth/check_jwt";
/** Import openapi */
import { apiSpec, OpenApiValidator } from '../external_interfaces/open_api';
/**Import logger */
import logger from "../external_interfaces/logger";
import errorHandler from "../../frameworks_and_drivers/web/middlewares/error/error_handler";
import { swaggerUi, swaggerDocument } from "../external_interfaces/swagger_ui";
/**Logging requests middleware */
import { requestLogging } from "@fnd/web/middlewares/logging/request_logging";
/**Get ip of request */
import { requestIp } from "@fnd/external_interfaces/request_ip";
/**Get Agent for request */
import { requestAgent } from "@fnd/external_interfaces/request_agent";

/**Init logger */
const Logger = logger(__filename);

const HTTP_PORT = process.env.HTTP_PORT || 3000;
const OPENAPI_SPEC = process.env.OPENAPI_SPEC || '/spec';
const OPENAPI_DOCS = process.env.OPENAPI_DOCS || '/docs';

export class Server {
    app: express.Application;

    constructor() {
        this.app = express();
        this.config();
    }

    config() {
        //SETTINGS
        this.app.set("port", HTTP_PORT);
        //MIDDLEWARES
        /**Morgan to see logs in dev */
        this.app.use(morgan);
        /**To process json request */
        this.app.use(json());
        /**To can recieve files in request */
        /**To give cors permissions */
        this.app.use(cors());
        /**Request IP */
        this.app.use(requestIp.mw())
        /**Request Agent */
        this.app.use(requestAgent.express());
        /**Swagger UI */
        this.app.use(OPENAPI_DOCS, swaggerUi.serve, swaggerUi.setup(swaggerDocument));
        /**To check token send in Authorization header */
        this.app.use(checkJwt().unless({
            path: [
                "/",
                OPENAPI_SPEC,
            ]
        }));
    }

    routes() {
        /**Middleware to log request bodies and queries */
        this.app.use(requestLogging().unless({
            path: []
        }))
        /**App routes */
        this.app.use(appRoutes);
    }

    async configOpenAPi() {
        /**Install Validator in Express App */
        await OpenApiValidator.install(this.app);
        /**Add route to dowloand OAS file */
        this.app.use(OPENAPI_SPEC, express.static(apiSpec || ""));
    }

    initErrorHandler() {
        /**Error Handler */
        this.app.use(errorHandler);
    }

    async start() {
        try {
            await this.configOpenAPi();
            this.routes();
            this.initErrorHandler();
            this.app.listen(this.app.get("port"), () => {
                console.log( `🆗 Express Application Running on port ${this.app.get("port")}`);
            });
        } catch (error) {
            Logger.error(`ERROR : ${JSON.stringify(error)}`);
        }
    }
}
