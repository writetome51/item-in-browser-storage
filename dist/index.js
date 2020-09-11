import {errorIfNotString} from 'error-if-not-string';
import {errorIfLengthIsZero} from 'error-if-length-is-zero';
import {hasValue} from '@writetome51/has-value-no-value';
import {not} from '@writetome51/not';
import {notEmpty} from "@writetome51/is-empty-not-empty";


/********************************
Represents an item stored in the browser's `localStorage` or `sessionStorage`.
The choice of `localStorage` or `sessionStorage` must be decided by a subclass using
the `__storageType` argument in the constructor.
The stored item is identified by a unique string `this.key` and stored as a `key:value` pair.
When you call the constructor, if the `__key` argument is a string that isn't empty and the `value`
argument is not undefined or null, the item will be stored immediately.  Else, the item won't be
stored until you call `this.set()`.
 ********************************/

export class ItemInBrowserStorage {

	constructor(
		__storageType,
		__key = '', // the unique ID needed to access the stored item.
		value = undefined
	) {
		this.__storageType = __storageType;
		this.__key = __key;
		if (not(this.__storageType instanceof Storage)) throw new Error(
			`Input must be either sessionStorage or localStorage`
		);
		this.key = this.__key;
		if (notEmpty(this.__key) && hasValue(value)) this.set(value);
	}


	set key(value) {
		errorIfNotString(value);
		this.__key = value;
	}


	get key() {
		errorIfLengthIsZero(this.__key);
		return this.__key;
	}


	// Saves item `value` in storage.  Replaces previous value, if any.
	set(value) {
		// Automatically converts `value` to a string.
		this.__storageType.setItem(this.key, value);
	}


	// Browser storage always saves the value as a string, so by default that's the type returned.
	// But subclasses may want to return the value in a modified form, so the return type is `any`.
	get() {
		return this.__storageType.getItem(this.key);
	}


	// Removes both key and value from storage.
	remove() {
		this.__storageType.removeItem(this.key);
	}
}
