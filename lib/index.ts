import { errorIfNotString } from 'error-if-not-string';
import { errorIfLengthIsZero } from 'error-if-length-is-zero';
import { hasValue } from '@writetome51/has-value-no-value';
import { not } from '@writetome51/not';


/********************************
Represents an item stored in the browser's `localStorage` or `sessionStorage`.
The choice of `localStorage` or `sessionStorage` must be decided by a subclass using
the `__storageType` argument in the constructor.
The stored item is identified by a unique string `__key` and stored as a `key:value` pair.
When you call the constructor, you must provide a `__key`.  if the `value` argument is not 
undefined or null, the item will be stored immediately.  Else, the item won't be stored until 
you call `this.set()`.
 ********************************/

export abstract class ItemInBrowserStorage {


	constructor(
		private __storageType: Window['sessionStorage'] | Window['localStorage'],
		private __key: string, // the unique ID needed to access the stored item.
		value: any = undefined
	) {
		if (not(this.__storageType instanceof Storage)) throw new Error(
			`Input must be either sessionStorage or localStorage`
		);
		errorIfNotString(this.__key);
		errorIfLengthIsZero(this.__key);
		if (hasValue(value)) this.set(value);
	}


	// Saves item `value` in storage.  Replaces previous value, if any.

	set(value): void {
		// Automatically converts `value` to a string.
		this.__storageType.setItem(this.__key, value);
	}


	// Browser storage always saves the value as a string, so by default that's the type returned.
	// But subclasses may want to return the value in a modified form, so the return type is `any`.

	get(): any {
		return this.__storageType.getItem(this.__key);
	}


	// Removes both key and value from storage.

	remove(): void {
		this.__storageType.removeItem(this.__key);
	}


}
