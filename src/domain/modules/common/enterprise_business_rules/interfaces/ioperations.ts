export interface IRead<T> {

    getAllItems(opts: any, options?: any): Promise<T[]>;
    getItem(searchCriter: any, options?: any): Promise<T | null>;
    getItemById(id: string, options?: any): Promise<T | null>;
    countItems(filter: any, options?: any): Promise<number>;

}
export interface IWrite<T> {

    createItem(item: T, options?: any): Promise<T>;
    updateItem(id: string, item: T, options?: any): Promise<T | null>;
    deleteItem(deleteCriter: any, options?: any): Promise<boolean>;

}

export interface IAdmin<T> {

    getAllItems(opts: any, options?: any): Promise<T[]>;
    getItem(searchCriter: any, options?: any): Promise<T | null>;
    getItemById(id: string, options?: any): Promise<T | null>;
    createItem(item: T, options?: any): Promise<T>;
    updateItem(id: string, item: T, options?: any): Promise<T | null>;
    deleteItem(deleteCriter: any, options?: any): Promise<boolean>;
    countItems(filter: any, options?: any): Promise<number>;

}

export interface ITransactional {
    getTransaction(options?: any): any;
}

export interface ICheckOptions {
    checkOptions(options?: any): any;
}