import { IAdmin, ITransactional } from "@common/enterprise_business_rules/interfaces/ioperations";

export interface IRoleScopeRepository<T> {
    createItem(item: T, options?: any): Promise<T>;
    updateItem(id: string, item: T, options?: any): Promise<T>;
    deleteItem(deleteCriter: any, options?: any): Promise<boolean>;
    getAllItems(opts: any, options?: any): Promise<T[]>;
    getItem(searchCriter: any, options?: any): Promise<T>;
    getItemById(id: string, options?: any): Promise<T>;
    countItems(filter: any, options?: any): Promise<number>;
    getTransaction(options?: any): any;
}
export class RoleScopeRepository implements IAdmin<any>,ITransactional {

    repository: IRoleScopeRepository<any>;

    constructor(repository: IRoleScopeRepository<any>) {
        this.repository = repository;
    }
    async getTransaction(options?: any) {
        return await this.repository.getTransaction(options);
    }
    async createItem(item: any, options?: any): Promise<any> {
        return await this.repository.createItem(item, options);
    }
    async updateItem(id: string, item: any, options?: any): Promise<any> {
        return await this.repository.updateItem(id, item, options)
    }
    async deleteItem(deleteCriter: any, options?: any): Promise<boolean> {
        return await this.repository.deleteItem(deleteCriter, options)
    }
    async getAllItems(opts: any, options?: any): Promise<any[]> {
        return await this.repository.getAllItems(opts, options)
    }
    async getItem(searchCriter: any, options?: any): Promise<any> {
        return await this.repository.getItem(searchCriter, options)
    }
    async getItemById(id: string, options?: any): Promise<any> {
        return await this.repository.getItemById(id, options)
    }
    async countItems(filter: any, options?: any): Promise<number> {
        return await this.repository.countItems(filter, options)
    }

}