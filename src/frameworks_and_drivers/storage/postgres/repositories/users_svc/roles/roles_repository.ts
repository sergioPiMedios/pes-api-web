/**Interfaces */
import { IFilter } from '@common/enterprise_business_rules/interfaces/ifilterwrapper';
import { IRead, IWrite, IAdmin, ITransactional, ICheckOptions } from '@common/enterprise_business_rules/interfaces/ioperations';
import { IWrapper } from '@common/enterprise_business_rules/interfaces/iwrapper';
/**Models */
import { RoleDOM } from '@users/enterprise_business_rules/entities/roles/role_dom';
import { RoleDAL } from '../../../models/users_svc/roles/role_dal';
import { RolesScopesView } from "../../../models/users_svc/roles/roles_scopes_view";
/**Errors */
import { StorageError } from '@common/enterprise_business_rules/dto/errors/storage_error';
/**Helpers */
import { keyMapper } from "../../../../../helpers/key_mapper";
/**Sequelize ORM */
import { Sequelize } from 'sequelize-typescript';
import { Op } from 'sequelize';
/**Database clients */
import { clients } from "@fnd/storage/postgres/client/client";

const PSQL_CLIENT = process.env.PSQL_CLIENT || "psql_client"

export class RolePSQLImpl implements IAdmin<RoleDOM>, ITransactional, IFilter, ICheckOptions, IWrapper<RoleDAL, RoleDOM> {

    database: Sequelize;

    constructor() {
        this.database = clients.get(PSQL_CLIENT);
        this.database.addModels([RoleDAL]);
        this.database.addModels([RolesScopesView]);
    }

    getTransaction(options?: any) {
        throw new Error("Method not implemented.");
    }

    async getAllItems(opts: any, options?: any): Promise<RoleDOM[]> {
        try {
            const resDAL: RolesScopesView[] = await RolesScopesView.findAll({
                where: this.filterApiToDal(opts.filter),
                order: opts.sort,
                attributes: opts.attributes,
                raw: true
            });
            const resDom: any[] = this.groupResult(resDAL);
            if (opts.offset !== undefined && opts.limit !== undefined) {
                const resultPag: any[] = resDom.slice(opts.offset, (opts.limit + opts.offset));
                return resultPag;
            }
            return resDom
        } catch (err) {
            throw new StorageError(err);
        }
    }
    async getItem(searchCriter: any, options?: any): Promise<any> {
        try {
            const resDAL = await RolesScopesView.findAll({
                where: searchCriter
            });
            if (resDAL.length === 0) return null;
            const resDom: any[] = this.groupResult(resDAL);
            return resDom[0];
        } catch (err) {
            console.log(err);
            throw new StorageError(err);
        }
    }
    async getItemById(id: string, options?: any): Promise<RoleDOM | null> {
        try {
            options = this.checkOptions(options);
            const resDal = await RoleDAL.findByPk(
                id,
                {
                    transaction: options.transaction
                }
            );
            if (!resDal) return null;
            const resDom: RoleDOM = this.fromDalToDom(resDal);
            return resDom;
        } catch (error) {
            throw new StorageError(error.message);
        }
    }
    async createItem(item: RoleDOM, options?: any): Promise<RoleDOM> {
        try {
            const insertData = this.fromDomToDal(item);
            const resDAL: RoleDAL = await insertData.save();
            const resDOM: RoleDOM = this.fromDalToDom(resDAL);
            return resDOM;
        } catch (err) {
            throw new StorageError(err);
        }
    }
    async updateItem(id: string, item: RoleDOM, options?: any): Promise<RoleDOM | null> {
        try {
            const toUpdate = await RoleDAL.findByPk(id);
            if (!toUpdate) return null;
            const resDAL = await toUpdate.update(keyMapper.fromCamelToSnake(item));
            const resDOM = this.fromDalToDom(resDAL);
            return resDOM;
        } catch (err) {
            throw new StorageError(err);
        }
    }
    async deleteItem(deleteCriter: any, options?: any): Promise<boolean> {
        try {
            const toDelete = await RoleDAL.findOne({
                where: deleteCriter
            });
            if (!toDelete) return false;
            const resDAL = await toDelete.destroy();
            return true;
        } catch (err) {
            throw new StorageError(err);
        }
    }
    async countItems(filter: any, options?: any): Promise<number> {
        try {
            const count: number = await RoleDAL.count({
                where: this.filterApiToDal(filter)
            })
            return count;
        } catch (err) {
            throw new StorageError(err);
        }
    }

    fromDomToDal(item: RoleDOM): RoleDAL {
        const resDAL = new RoleDAL(keyMapper.fromCamelToSnake(item));
        return resDAL;
    }
    fromDalToDom(item: any): RoleDOM {
        const resDOM = new RoleDOM(
            item.id,
            item.name,
            item.is_admin,
            item.deleted,
        );
        resDOM.scope = item.scope;
        resDOM.scopeId = item.scope_id;
        resDOM.description = item.description
        return resDOM;
    }

    groupResult(resultList: any[]) {
        const entityList: any[] = resultList.map(res => this.fromDalToDom(res));
        const mapedList = entityList.reduce(function (groups, item) {
            var val = item.id
            groups[val] = groups[val] || {
                id: item.id,
                name: item.name,
                isAdmin: item.isAdmin,
                scopes: []
            }
            groups[val].scopes.push({ id: item.scopeId, name: item.scope, description: item.description });
            return groups;
        }, {})
        return Object.values(mapedList)
    }

    filterApiToDal(item: any) {
        const mapFilter: any = {};
        for (const key in item) {
            switch (key) {
                case "name":
                    mapFilter[key] = `%${item[key]}%`
                    break;
                case "is_admin":
                    mapFilter[key] = {
                        [Op.eq]: item[key]
                    };
                    break;
                case "deleted":
                    mapFilter[key] = {
                        [Op.eq]: item[key]
                    };
                    break;
            }
        }
        return mapFilter;
    }

    checkOptions(options?: any) {
        if (!options) {
            return {
                transaction: undefined
            };
        }
        else {
            return options;
        }
    }

}
