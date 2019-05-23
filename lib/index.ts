// import { errorIfNotStringLongerThanZero } from 'error-if-not-string-longer-than-zero';
import { errorIfNotString } from 'error-if-not-string';
import { notEmpty } from '@writetome51/is-empty-not-empty';
import { hasValue } from '@writetome51/has-value-no-value';


// Represents an item stored in the browser's localStorage or sessionStorage.
// The item in storage is identified by a unique string `this.key`.
// You can create a different class instance for each item you want to store.  Or you can
// create a single instance and simply change the value of `this.key` when you want to create/access
// a different item.

export abstract class ItemInBrowserStorage {

	// key: string  (the ID needed to access the stored item)
	protected _storageType: Window['sessionStorage'] | Window['localStorage'];


	constructor(
		private __key = '',
		value = undefined
	) {
		errorIfNotString(this.__key);
		if (notEmpty(this.__key)) this.set(value);
	}


	set key(value) {
		// errorIfNotStringLongerThanZero(value);
		this.__key = value;
	}


	get key(): string {
		return this.__key;
	}


	// Saves `value` in storage.  Replaces previous value, if any.

	set(value: any): void {
		value = String(value);
		this._storageType.setItem(this.key, value);
	}


	get(): any {
		// errorIfNotStringWithLength(this.key);
		let item = this._storageType.getItem(this.key);

		if (hasValue(item)) return item;

		else throw new Error('Requested item either does not exist, or its value is null');
	}


	// After calling this.remove(), both the key and value are no longer in storage.
	// If you want to re-insert the key and value in storage later, you must call this.set(value)

	remove(): void {
		this._storageType.removeItem(this.key);
	}


}
