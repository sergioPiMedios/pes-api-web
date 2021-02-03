import { IAdmin, ITransactional } from "@common/enterprise_business_rules/interfaces/ioperations";
import { RoleDOM } from "@users/enterprise_business_rules/entities/roles/role_dom";

export interface IRoleRepository<T> {
    createItem(item: T, options?: any): Promise<T>;
    updateItem(id: string, item: T, options?: any): Promise<T | null>;
    deleteItem(deleteCriter: any, options?: any): Promise<boolean>;
    getAllItems(opts: any, options?: any): Promise<T[]>;
    getItem(searchCriter: any, options?: any): Promise<T | null>;
    getItemById(id: string, options?: any): Promise<T | null>;
    countItems(filter: any, options?: any): Promise<number>;
    getTransaction(options?: any): any;
}

export class RoleRepository implements IAdmin<RoleDOM>, ITransactional {

    repository: IRoleRepository<RoleDOM>;

    constructor(repository: IRoleRepository<RoleDOM>) {
        this.repository = repository;
    }
    async getTransaction(options?: any) {
        return await this.repository.getTransaction(options);
    }
    async createItem(item: RoleDOM, options?: any): Promise<RoleDOM> {
        return await this.repository.createItem(item, options);
    }
    async updateItem(id: string, item: RoleDOM, options?: any): Promise<RoleDOM | null> {
        return await this.repository.updateItem(id, item, options)
    }
    async deleteItem(deleteCriter: any, options?: any): Promise<boolean> {
        return await this.repository.deleteItem(deleteCriter, options)
    }
    async getAllItems(opts: any, options?: any): Promise<RoleDOM[]> {
        return await this.repository.getAllItems(opts, options)
    }
    async getItem(searchCriter: any, options?: any): Promise<RoleDOM | null> {
        return await this.repository.getItem(searchCriter, options)
    }
    async getItemById(id: string, options?: any): Promise<RoleDOM | null> {
        return await this.repository.getItemById(id, options)
    }
    async countItems(filter: any, options?: any): Promise<number> {
        return await this.repository.countItems(filter, options)
    }

}