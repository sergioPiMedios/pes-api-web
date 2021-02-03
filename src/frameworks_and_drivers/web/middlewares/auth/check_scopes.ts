import { HTTPCodesEnum } from '@common/enterprise_business_rules/dto/enums/errors_enums';
import { ErrorAuth } from '@common/enterprise_business_rules/dto/errors/auth_error';
/**Express functions */
import { Response, NextFunction } from "express";
/**Use case for check token */
import { checkScopes } from '@users/app_business_rules/auth';
import { roleList } from "../../../..";

export default function checkScopesMid(required: Object): any {
    let middleware: any = async (req: any, res: Response, next: NextFunction): Promise<any> => {
        if (await checkScopes(req.user, required, roleList)) next();
        else {
            next(new ErrorAuth("Permission denied", HTTPCodesEnum.FORBIDDEN));
        }
    };
    return middleware;
}