import { HTTPCodesEnum } from '@common/enterprise_business_rules/dto/enums/errors_enums';
import { ErrorAuth } from '@common/enterprise_business_rules/dto/errors/auth_error';
/**Express functions */
import { Response, NextFunction } from "express";
/**Use case for check token */
import { checkToken } from '@users/app_business_rules/auth';

export default function checkJwt(userProperty?: string): any {
    let middleware: any = async (req: any, res: Response, next: NextFunction): Promise<any> => {
        const { authorization } = req.headers;           
        try {
            const jwtPayload = await checkToken(authorization);
            req[userProperty || "user"] = jwtPayload            
            next();
        } catch (error) {
            if (error.name === "TokenExpiredError") {
                next(new ErrorAuth("Token expired",HTTPCodesEnum.UNAUTHORIZED));                
            } else {
                next(new ErrorAuth("A valid token has not been provided",HTTPCodesEnum.FORBIDDEN));
            }
        }
    };
    middleware["unless"] = require('express-unless');
    return middleware;
}



