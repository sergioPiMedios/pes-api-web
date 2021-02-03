/**Interfaces */
import { IRead, IWrite, IAdmin, ITransactional } from '@common/enterprise_business_rules/interfaces/ioperations';
import { IWrapper } from '@common/enterprise_business_rules/interfaces/iwrapper';
/**Models */
import { ScopesDOM } from '@users/enterprise_business_rules/entities/scopes/scopes_dom';
import { ScopesDAL } from '../../../models/users_svc/roles/scopes_dal';
/**Erros */
import { StorageError } from '@common/enterprise_business_rules/dto/errors/storage_error';
/**Sequelize ORM */
import { Sequelize } from 'sequelize-typescript';
/**Database clients */
import { clients } from "@fnd/storage/postgres/client/client";

const PSQL_CLIENT = process.env.PSQL_CLIENT || "psql_client"

export class ScopePSQLImpl implements IAdmin<ScopesDOM>,ITransactional, IWrapper<ScopesDAL, ScopesDOM> {

    database: Sequelize;

    constructor() {
        this.database = clients.get(PSQL_CLIENT);
        this.database.addModels([ScopesDAL]);
    }
    getTransaction(options?: any) {
        throw new Error("Method not implemented.");
    }
    async getAllItems(opts: any, options?: any): Promise<ScopesDOM[]> {
        try {
            const resDAL: ScopesDAL[] = await ScopesDAL.findAll({
                where: opts.filter,
                limit: opts.limit,
                offset: opts.offset,
                order: opts.sort
            });
            const resDOM: ScopesDOM[] = resDAL.map(res => this.fromDalToDom(res));
            return resDOM;
        } catch (err) {
            throw new StorageError(err);
        }
    }
    async getItem(searchCriter: any, options?: any): Promise<ScopesDOM | null> {
        try {
            const resDAL = await ScopesDAL.findOne({
                where: searchCriter
            });
            if (!resDAL) return null;
            const resDOM: ScopesDOM = this.fromDalToDom(resDAL);
            return resDOM;
        } catch (err) {
            throw new StorageError(err);
        }
    }
    getItemById(id: string, options?: any): Promise<ScopesDOM | null> {
        throw new Error("Method not implemented.");
    }
    async createItem(item: ScopesDOM, options?: any): Promise<ScopesDOM> {
        try {
            const insertData = this.fromDomToDal(item);
            const resDAL: ScopesDAL = await insertData.save();
            const resDOM: ScopesDOM = this.fromDalToDom(resDAL);
            return resDOM;
        } catch (err) {
            throw new StorageError(err);
        }
    }
    async updateItem(id: string, item: ScopesDOM, options?: any): Promise<ScopesDOM | null> {
        try {
            const toUpdate = await ScopesDAL.findByPk(id);
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
            const toDelete = await ScopesDAL.findOne({
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
            const count: number = await ScopesDAL.count({
                where: filter
            })
            return count;
        } catch (err) {
            throw new StorageError(err);
        }
    }

    fromDomToDal(item: ScopesDOM): ScopesDAL {
        const resDAL = new ScopesDAL(item);
        return resDAL;
    }
    fromDalToDom(item: ScopesDAL): ScopesDOM {
        const resDOM = new ScopesDOM(
            item.id,
            item.name,
            item.description
        );
        return resDOM;
    }

}