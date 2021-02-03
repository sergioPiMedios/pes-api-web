export interface IReadCache<T> {

    getAll(opts: any, options?: any): Promise<T[]>;
    getOne(key: string, options?: any): Promise<T | null>;

}
export interface IWriteCache<T> {

    createOne(key: string, item: T, options?: any): Promise<T>;
    deleteOne(key: string, options?: any): Promise<boolean>;

}