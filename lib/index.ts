import { BaseClass } from '@writetome51/base-class';
import { errorIfNotString } from 'error-if-not-string';
import { errorIfNotStringLongerThanZero } from 'error-if-not-string-longer-than-zero';
import { hasValue } from '@writetome51/has-value-no-value';
import { not } from '@writetome51/not';
import { notEmpty } from "@writetome51/is-empty-not-empty";

/********************************
Represents an item stored in the browser's `localStorage` or `sessionStorage`.
The choice of `localStorage` or `sessionStorage` must be decided by a subclass using
the `__storageType` argument in the constructor.
The stored item is identified by a unique string `this.key` and stored as a `key:value` pair.
This class validates `this.key` and `this.__storageType`, and performs the basic setting,
getting, and removal of the item.
When you call the constructor, if the `key` argument is a string that isn't empty and the `value`
argument is not undefined or null, the item will be stored immediately.  Else, the item won't be
stored until you call `this.set(value)`.
********************************/

export abstract class ItemInBrowserStorage extends BaseClass {

	
	constructor(
		private __storageType: Window['sessionStorage'] | Window['localStorage'],  
		private __key = '' , // the unique ID needed to access the stored item.
		value: any = undefined
	) {
		super();

		if (not(this.__storageType instanceof Storage)) throw new Error(
			`Input must be either sessionStorage or localStorage`
		);
		errorIfNotString(this.__key);

		if (notEmpty(this.__key) && hasValue(value)) this.set(value);
	}


	set key(value) {
		errorIfNotStringLongerThanZero(value);
		this.__key = value;
	}


	get key(): string {
		errorIfNotStringLongerThanZero(this.__key);
		return this.__key;
	}


	// Saves `value` in storage.  Replaces previous value, if any.

	set(value: any): void {
		// Automatically converts `value` to a string.
		this.__storageType.setItem(this.key, value);
	}


	// Browser storage always saves the value as a string, so by default that's the type returned.
	// But subclasses may want to return the value in a modified form, so the return type is `any`.

	get(): any {
		let item = this.__storageType.getItem(this.key);

		if (hasValue(item)) return item;
		else throw new Error('Requested item either does not exist, or its value is null');
	}


	// Removes both key and value from storage.  You can store the item again by calling this.set(value)

	remove(): void {
		this.__storageType.removeItem(this.key);
	}


}
