/**Interfaces */
import { IWrapper } from '@common/enterprise_business_rules/interfaces/iwrapper';
import { IRead, IWrite, IAdmin, ITransactional } from '@common/enterprise_business_rules/interfaces/ioperations';
/**Errors */
import { StorageError } from '@common/enterprise_business_rules/dto/errors/storage_error';
/**Models */
import { RolesScopesDAL } from '../../../models/users_svc/roles/roles_scopes_dal';
import { RolesScopesView } from '../../../models/users_svc/roles/roles_scopes_view';
/**Sequelize ORM */
import { Sequelize } from 'sequelize-typescript';
/**Database clients */
import { clients } from "@fnd/storage/postgres/client/client";

const PSQL_CLIENT = process.env.PSQL_CLIENT || "psql_client"

export class RoleScopePSQLImpl implements IAdmin<any>,ITransactional, IWrapper<RolesScopesDAL, any> {

    database: Sequelize;

    constructor() {
        this.database = clients.get(PSQL_CLIENT);
        this.database.addModels([RolesScopesDAL]);
        this.database.addModels([RolesScopesView]);
    }
    
    getTransaction(options?: any) {
        throw new Error("Method not implemented.");
    }

    async getAllItems(opts: any, options?: any): Promise<any[]> {
        try {
            const resDAL: any[] = await RolesScopesDAL.findAll({
                where: opts.filter,
                limit: opts.limit,
                offset: opts.offset,
                order: opts.sort,
                attributes: opts.attributes
            });
            const resDOM = resDAL.map(res => this.fromDalToDom(res));
            return resDOM;
        } catch (err) {
            throw new StorageError(err);
        }
    }
    async getItem(searchCriter: any, options?: any): Promise<any> {
        try {
            const resDAL = await RolesScopesDAL.findOne({
                where: searchCriter
            });
            if (!resDAL) return null;
            const resDOM = this.fromDalToDom(resDAL);
            return resDOM;
        } catch (err) {
            throw new StorageError(err);
        }
    }
    getItemById(id: string, options?: any): Promise<any> {
        throw new Error("Method not implemented.");
    }
    async createItem(item: any, options?: any): Promise<any> {
        try {
            const insertData = this.fromDomToDal(item);
            const resDAL: RolesScopesDAL = await insertData.save();
            const resDOM = this.fromDalToDom(resDAL);
            return resDOM;
        } catch (err) {
            throw new StorageError(err);
        }
    }
    async updateItem(id: string, item: any, options?: any): Promise<any> {
        try {
            const toUpdate = await RolesScopesDAL.findByPk(id);
            if (!toUpdate) return null;
            const resDAL = await toUpdate.update(item);
            const resDOM = this.fromDalToDom(resDAL);
            return resDOM;
        } catch (err) {
            throw new StorageError(err);
        }
    }
    async deleteItem(deleteCriter: any, options?: any): Promise<boolean> {
        try {
            const toDelete = await RolesScopesDAL.findOne({
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
            const count: number = await RolesScopesDAL.count({
                where: filter
            })
            return count;
        } catch (err) {
            throw new StorageError(err);
        }
    }

    fromDomToDal(item: any): RolesScopesDAL {
        const resDAL = new RolesScopesDAL(item);
        return resDAL;
    }

    fromDalToDom(item: any): any {
        const resDOM: any = {
            roles_id: item.roles_id,
            scopes_id: item.scopes_id,
            name: item.name,
            description: item.description
        };
        return resDOM;
    }

}
