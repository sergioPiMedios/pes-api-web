import { Request, Response, NextFunction } from "express";

export default function filterCompany(req: Request, res: Response, next: NextFunction) {
    const query: any = req.query;
    const mapFilter: any = {};
    mapFilter["deleted"] = false;
    for (const key in query) {
        if (key !== "limit" && key !== "offset" && query[key] !== undefined) {
            switch (key) {
                case "first_name":
                case "last_name":
                case "email":
                case "document_type_id":
                case "document":
                case "cities_id":
                case "city":
                case "job_position":
                case "work_contract":
                case "location":
                case "company":
                case "status":
                    mapFilter[key] = query[key]
                    break;
            }
        }
    }
    req.query.filter = mapFilter;
    next();
}



