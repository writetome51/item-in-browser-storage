import { BaseClass } from '@writetome51/base-class';


/********************************
 Represents an item stored in the browser's `localStorage` or `sessionStorage`.
 The choice of `localStorage` or `sessionStorage` must be decided by a subclass using
 the `__storageType` argument in the constructor.
 The stored item is identified by a unique string `this.key` and stored as a `key:value` pair.
 This class validates `this.key` and `this.__storageType`, and performs the basic setting,
 getting, and removal of the item.
 When you call the constructor, if the `__key` argument is a string that isn't empty and the `value`
 argument is not undefined or null, the item will be stored immediately.  Else, the item won't be
 stored until you call `this.set()`.
 ********************************/

export declare abstract class ItemInBrowserStorage extends BaseClass {

	key: string;

	private __storageType;
	private __key;


	constructor(
		__storageType: Window['sessionStorage'] | Window['localStorage'],
		__key?: string, // the unique ID needed to access the stored item.
		value?: any
	);


	set(value: any): void;


	get(): any;


	remove(): void;

}
