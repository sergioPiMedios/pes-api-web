import { Request, Response, NextFunction } from "express";
import { ErrorBadRequest } from '@common/enterprise_business_rules/dto/errors/bad_request';

export function xlsxValidation(req: Request, res: Response, next: NextFunction) {
    try {
        /* VALIDATE FILE EXIST */
        if (!req.files) throw new ErrorBadRequest("A file is necessary");
        /* MIMEtype required */
        const excelMimeType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
        const octetMimeType = 'application/octet-stream';
        const odsMimetype = "application/vnd.oasis.opendocument.spreadsheet"
        /* Valid file types */
        const file: any = req.files;
        if (file[0].mimetype !== excelMimeType &&
            file[0].mimetype !== octetMimeType &&
            file[0].mimetype !== odsMimetype)
            throw new ErrorBadRequest("Invalid mimetype for file received");
        next();
    } catch (error) {
        next(error);
    }
}
