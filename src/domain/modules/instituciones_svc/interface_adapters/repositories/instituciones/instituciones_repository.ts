import { InstitucionesDom } from '@instituciones/enterprise_business_rules/entities/instituciones/instituciones_dom';
import { IRead, IWrite, ITransactional } from '@common/enterprise_business_rules/interfaces/ioperations';

interface IInstitucionesRepository<T> {
    getAllItems(opts: any, options?: any): Promise<T[]>;
    getItem(searchCriter: any, options?: any): Promise<T | null>;
    getItemById(id: string, options?: any): Promise<T | null>;
    createItem(item: T, options?: any): Promise<T>;
    updateItem(id: string, item: T, options?: any): Promise<T | null>;
    deleteItem(deleteCriter: any, options?: any): Promise<boolean>;
    countItems(filter: any, options?: any): Promise<number>;
    getTransaction(options?: any): Promise<any>;
}

export class InstitucionesRepository implements IRead<InstitucionesDom>, IWrite<InstitucionesDom>, ITransactional {

    repository: IInstitucionesRepository<InstitucionesDom>;

    constructor(repository: IInstitucionesRepository<InstitucionesDom>) {
        this.repository = repository;
    }

    async getAllItems(opts: any, options?: any): Promise<InstitucionesDom[]> {
        return await this.repository.getAllItems(opts, options);
    }

    async getItem(searchCriter: any, options?: any): Promise<InstitucionesDom | null> {
        return await this.repository.getItem(searchCriter, options);
    }

    async getItemById(id: string, options?: any): Promise<InstitucionesDom | null> {
        return await this.repository.getItemById(id, options);
    }

    async createItem(item: InstitucionesDom, options?: any): Promise<InstitucionesDom> {
        return await this.repository.createItem(item, options);
    }

    async updateItem(id: string, item: InstitucionesDom, options?: any): Promise<InstitucionesDom | null> {
        return await this.repository.updateItem(id, item, options);
    }

    async deleteItem(deleteCriter: any, options?: any): Promise<boolean> {
        return await this.repository.deleteItem(deleteCriter, options);
    }
    
    async countItems(filter: any, options?: any): Promise<number> {
        return await this.repository.countItems(filter, options);
    }

    async getTransaction(options?: any): Promise<any> {
        return await this.repository.getTransaction(options);
    }
}
