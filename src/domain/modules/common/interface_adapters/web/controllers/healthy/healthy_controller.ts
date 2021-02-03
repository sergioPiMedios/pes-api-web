import { clients } from "@fnd/storage/postgres/client/client";
import { HTTPCodesEnum } from "@common/enterprise_business_rules/dto/enums/errors_enums";

export class HealthyController {

    get(req: any, res: any, next: any) {
        try {
            res.status(HTTPCodesEnum.SUCCESSFUL);
            const svc = process.env.SVC_NAME || "Users";
            res.send({ message: `${svc} Service OK 👽` });
        } catch (error) {
            next(error);
        }
    }

    readiness(req: any, res: any, next: any): void {
        try {
            if (clients.size !== 0) res.sendStatus(HTTPCodesEnum.SUCCESSFUL);
            else res.sendStatus(HTTPCodesEnum.BAD_REQUEST)
        } catch (error) {
            next(error);
        }
    }

    health(req: any, res: any, next: any): void {
        try {
            res.sendStatus(HTTPCodesEnum.SUCCESSFUL);
        } catch (error) {
            next(error);
        }
    }

}