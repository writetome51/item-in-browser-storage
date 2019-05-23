export declare abstract class ItemInBrowserStorage {
    private __key;
    protected _storageType: Window['sessionStorage'] | Window['localStorage'];
    constructor(__key?: string, value?: any);
    key: string;
    set(value: any): void;
    get(): any;
    remove(): void;
}
