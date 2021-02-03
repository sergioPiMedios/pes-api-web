import { Request, Response, NextFunction } from "express";
import multer from '@fnd/external_interfaces/multer';
import { HTTPCodesEnum } from '@common/enterprise_business_rules/dto/enums/errors_enums';
import { ErrorBadRequest } from '@common/enterprise_business_rules/dto/errors/bad_request';

const upload = multer();

export default function uploadFileMid(fileName: string): any {
    let middleware: any = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
        try {

            if (upload.single(fileName)) {
                const file: any = req.files;
                if (fileName === `${file[0].fieldname}`) next();
                else next(new ErrorBadRequest("invalid file name", HTTPCodesEnum.BAD_REQUEST));
            }
            else {
                next(new ErrorBadRequest("file has no name", HTTPCodesEnum.BAD_REQUEST));
            }
        } catch (err) {
            next(err)
        }
    };
    return middleware;
}
