export declare abstract class ItemInBrowserStorage {

	key: string;
	protected _storageType: Window['sessionStorage'] | Window['localStorage'];

	private __key;


	constructor(__key?: string, value?: any);


	set(value: any): void;


	get(): any;


	remove(): void;
}
