import logger from "@fnd/external_interfaces/logger";
import { Request, Response, NextFunction } from "express";

const requestLogging = () => {

    const Logger = logger(__filename);

    let middleware: any = (req: Request, res: Response, next: NextFunction) => {
        if (!isEmpty(req.body)) Logger.info(`BODY : ${JSON.stringify(req.body)}`);
        if (!isEmpty(req.query)) Logger.info(`QUERY : ${JSON.stringify(req.query)}`);
        next();
    }

    const isEmpty = (obj: any) => {
        for (var key in obj) {
            if (obj.hasOwnProperty(key))
                return false;
        }
        return true;
    }

    middleware["unless"] = require('express-unless');
    return middleware;

}



export {
    requestLogging
}