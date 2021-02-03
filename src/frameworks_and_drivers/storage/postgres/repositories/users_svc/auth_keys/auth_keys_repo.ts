/**Interfaces */
import { IWrapper } from '@common/enterprise_business_rules/interfaces/iwrapper';
import { IAdmin, ITransactional } from '@common/enterprise_business_rules/interfaces/ioperations';
/**Models */
import { AuthKeyDOM } from '@users/enterprise_business_rules/entities/auth_keys/auth_key_dom';
import { AuthKeyDAL } from '../../../models/users_svc/auth_keys/auth_key_dal';
/**Errors */
import { StorageError } from '@common/enterprise_business_rules/dto/errors/storage_error';
/**Helpers */
import { keyMapper } from "@fnd/helpers/key_mapper";
/**Sequelize ORM */
import { Sequelize } from 'sequelize-typescript';
/**Database clients */
import { clients } from "@fnd/storage/postgres/client/client";


const PSQL_CLIENT = process.env.PSQL_CLIENT || "psql_client"

export class AuthKeysPSQLImpl implements IAdmin<AuthKeyDOM>,ITransactional, IWrapper<AuthKeyDAL, AuthKeyDOM> {

    database: Sequelize;

    constructor() {
        this.database = clients.get(PSQL_CLIENT);
        this.database.addModels([AuthKeyDAL]);
    }
    getTransaction(options?: any) {
        throw new Error("Method not implemented.");
    }
    async createItem(item: AuthKeyDOM, options?: any): Promise<AuthKeyDOM> {
        try {
            const insertData = this.fromDomToDal(item);
            const resDAL: AuthKeyDAL = await insertData.save();
            const resDOM: AuthKeyDOM = this.fromDalToDom(resDAL);
            return resDOM;
        } catch (err) {
            throw new StorageError(err);
        }
    }
    async updateItem(id: string, item: AuthKeyDOM, options?: any): Promise<AuthKeyDOM | null> {
        try {
            const toUpdate = await AuthKeyDAL.findByPk(id);
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
            const toDelete = await AuthKeyDAL.findOne({
                where: deleteCriter
            });
            if (!toDelete) return false;
            const resDAL = await toDelete.destroy();
            return true;
        } catch (err) {
            throw new StorageError(err);
        }
    }
    async getAllItems(opts: any, options?: any): Promise<AuthKeyDOM[]> {
        try {
            const resDAL: AuthKeyDAL[] = await AuthKeyDAL.findAll({
                where: opts.filter,
                limit: opts.limit,
                offset: opts.offset,
                order: opts.sort,
                attributes: opts.attributes
            });
            const resDOM: AuthKeyDOM[] = resDAL.map(res => this.fromDalToDom(res));
            return resDOM;
        } catch (err) {
            throw new StorageError(err);
        }
    }
    async getItem(searchCriter: any, options?: any): Promise<AuthKeyDOM | null> {
        try {
            const resDAL = await AuthKeyDAL.findOne({
                where: searchCriter
            });
            if (!resDAL) return null;
            const resDOM: AuthKeyDOM = this.fromDalToDom(resDAL);
            return resDOM;
        } catch (err) {
            throw new StorageError(err);
        }
    }
    async getItemById(id: string, options?: any): Promise<AuthKeyDOM | null> {        
        throw new Error("Method not implemented.");
    }
    async countItems(filter: any, options?: any): Promise<number> {
        try {
            const count: number = await AuthKeyDAL.count({
                where: filter
            })
            return count;
        } catch (err) {
            throw new StorageError(err);
        }
    }
    
    fromDomToDal(item: AuthKeyDOM): AuthKeyDAL {
        const resDAL = new AuthKeyDAL(keyMapper.fromCamelToSnake(item));
        return resDAL;
    }
    fromDalToDom(item: AuthKeyDAL): AuthKeyDOM {
        const resDOM = new AuthKeyDOM(
            item.id,
            item.private_key,
            item.public_key,
            item.is_active,
            item.valid_to
        );
        return resDOM;
    }

}
