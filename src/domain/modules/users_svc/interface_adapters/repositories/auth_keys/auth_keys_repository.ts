import { IAdmin, ITransactional } from "@common/enterprise_business_rules/interfaces/ioperations";
import { AuthKeyDOM } from "@users/enterprise_business_rules/entities/auth_keys/auth_key_dom";

export interface IAuthKeyRepository<T> {

    createItem(item: T, options?: any): Promise<T>;
    updateItem(id: string, item: T, options?: any): Promise<T | null>;
    deleteItem(deleteCriter: any, options?: any): Promise<boolean>;
    getAllItems(opts: any, options?: any): Promise<T[]>;
    getItem(searchCriter: any, options?: any): Promise<T | null>;
    getItemById(id: string, options?: any): Promise<T | null>;
    countItems(filter: any, options?: any): Promise<number>;
    getTransaction(options?: any): any;

}

export class AuthKeyRepository implements IAdmin<AuthKeyDOM>,ITransactional {

    repository: IAuthKeyRepository<AuthKeyDOM>;

    constructor(repository: IAuthKeyRepository<AuthKeyDOM>) {
        this.repository = repository;
    }

    async getTransaction(options?: any) {
        return await this.repository.getTransaction(options);
    }
    
    async createItem(item: AuthKeyDOM, options?: any): Promise<AuthKeyDOM> {
        return await this.repository.createItem(item, options);
    }
    async updateItem(id: string, item: AuthKeyDOM, options?: any): Promise<AuthKeyDOM | null> {
        return await this.repository.updateItem(id, item, options)
    }
    async deleteItem(deleteCriter: any, options?: any): Promise<boolean> {
        return await this.repository.deleteItem(deleteCriter, options)
    }
    async getAllItems(opts: any, options?: any): Promise<AuthKeyDOM[]> {
        return await this.repository.getAllItems(opts, options)
    }
    async getItem(searchCriter: any, options?: any): Promise<AuthKeyDOM | null> {
        return await this.repository.getItem(searchCriter, options)
    }
    async getItemById(id: string, options?: any): Promise<AuthKeyDOM | null> {
        return await this.repository.getItemById(id, options)
    }
    async countItems(filter: any, options?: any): Promise<number> {
        return await this.repository.countItems(filter, options)
    }

}