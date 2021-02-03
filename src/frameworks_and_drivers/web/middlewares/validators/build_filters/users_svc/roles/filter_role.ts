import { Request, Response, NextFunction } from "express";

export default function filter(req: Request, res: Response, next: NextFunction) {
    const query: any = req.query;
    const mapFilter: any = {};
    mapFilter["deleted"] = false;
    for (var key in query) {
        if (key !== "limit" && key !== "offset" && query[key] !== undefined) {
            switch (key) {
                case "name":
                    mapFilter[key] = query[key]
                    break;
                case "is_admin":
                    mapFilter[key] = query[key]
                    break;
            }
        }
    }
    req.query.filter = mapFilter;
    next();
}






