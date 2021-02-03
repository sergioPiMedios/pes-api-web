import { Request, Response, NextFunction } from "express";
import Sequelize from "sequelize";

export default function filter(req: Request, res: Response, next: NextFunction) {
    const query: any = req.query;
    const mapFilter: any = {};
    for (var key in query) {
        if (key !== "limit" && key !== "offset" && query[key] !== undefined) {
            switch (key) {
                case "nombre":
                    mapFilter[key] = {
                        [Sequelize.Op.iLike]: `%${query[key]}%`
                    }
                    break;
                case "codigo_dane":
                    mapFilter[key] = {
                        [Sequelize.Op.iLike]: `%${query[key]}%`
                    }
                    break;
            }
        }
    }
    req.query.filter = mapFilter;
    next();
}



