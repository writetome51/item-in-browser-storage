import { BaseClass } from '@writetome51/base-class';
import { errorIfNotString } from 'error-if-not-string';
import { errorIfNotStringLongerThanZero } from 'error-if-not-string-longer-than-zero';
import { hasValue } from '@writetome51/has-value-no-value';
import { notEmpty } from '@writetome51/is-empty-not-empty';


// Represents an item stored in the browser's `localStorage` or `sessionStorage`.
// The choice of `localStorage` or `sessionStorage` must be decided by a subclass using
// `this._storageType`.
// The item in storage is identified by a unique string `this.key`.
// This class validates `this.key` and `this._storageType`, and performs the basic setting,
// getting, and removal of the item.

export abstract class ItemInBrowserStorage extends BaseClass {

	// key: string  (the unique ID needed to access the stored item)
	// protected _storageType: sessionStorage | localStorage

	private __storageType: Window['sessionStorage'] | Window['localStorage'];


	constructor(private __key = '') {
		super();
		errorIfNotString(this.__key);

	}


	set key(value) {
		errorIfNotStringLongerThanZero(value);
		this.__key = value;
	}


	get key(): string {
		errorIfNotStringLongerThanZero(this.__key);
		return this.__key;
	}


	protected set _storageType(value) {
		if (value instanceof Storage) this.__storageType = value;
		else throw new Error(
			`The property "_storageType" must be set to either sessionStorage or localStorage`
		);
	}


	protected get _storageType(): Window['sessionStorage'] | Window['localStorage'] {
		this._errorIfPropertyHasNoValue('__storageType', '_storageType');
		return this.__storageType;
	}


	// Saves `value` in storage.  Replaces previous value, if any.

	set(value: any): void {
		// Automatically converts `value` to a string.
		this._storageType.setItem(this.key, value);
	}


	// Browser storage always saves the value as a string, so by default that's the type returned.
	// But subclasses may want to return the value in a modified form, so the return type is `any`.

	get(): any {
		let item = this._storageType.getItem(this.key);

		if (hasValue(item)) return item;
		else throw new Error('Requested item either does not exist, or its value is null');
	}


	// After calling this.remove(), both the key and value are no longer in storage.
	// You can store the item again by calling this.set(value)

	remove(): void {
		this._storageType.removeItem(this.key);
	}


}
