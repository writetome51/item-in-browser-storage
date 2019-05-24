import { BaseClass } from '@writetome51/base-class';


export declare abstract class ItemInBrowserStorage extends BaseClass {

	key: string;
	protected _storageType: Window['sessionStorage'] | Window['localStorage'];

	private __key;
	private __storageType;


	constructor(__key?: string);


	set(value: any): void;


	get(): any;


	remove(): void;

}
