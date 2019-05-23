"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var error_if_not_string_1 = require("error-if-not-string");
var error_if_not_string_longer_than_zero_1 = require("error-if-not-string-longer-than-zero");
var has_value_no_value_1 = require("@writetome51/has-value-no-value");
var is_empty_not_empty_1 = require("@writetome51/is-empty-not-empty");
// Represents an item stored in the browser's localStorage or sessionStorage.
// The item in storage is identified by a unique string `this.key`.
// You can create a different class instance for each item you want to store.  Or you can
// create a single instance and simply change the value of `this.key` when you want to create/access
// a different item.
var ItemInBrowserStorage = /** @class */ (function () {
    function ItemInBrowserStorage(__key, value) {
        if (__key === void 0) { __key = ''; }
        if (value === void 0) { value = undefined; }
        this.__key = __key;
        error_if_not_string_1.errorIfNotString(this.__key);
        if (is_empty_not_empty_1.notEmpty(this.__key) && has_value_no_value_1.hasValue(value))
            this.set(value);
    }
    Object.defineProperty(ItemInBrowserStorage.prototype, "key", {
        get: function () {
            error_if_not_string_longer_than_zero_1.errorIfNotStringLongerThanZero(this.__key);
            return this.__key;
        },
        set: function (value) {
            error_if_not_string_longer_than_zero_1.errorIfNotStringLongerThanZero(value);
            this.__key = value;
        },
        enumerable: true,
        configurable: true
    });
    // Saves `value` in storage.  Replaces previous value, if any.
    ItemInBrowserStorage.prototype.set = function (value) {
        value = String(value);
        this._storageType.setItem(this.key, value);
    };
    // Browser storage always saves the value as a string, so by default that's
    // the type returned.  But subclasses may want to return the value as its original
    // type (before being converted), so the specified return type is `any`.
    ItemInBrowserStorage.prototype.get = function () {
        var item = this._storageType.getItem(this.key);
        if (has_value_no_value_1.hasValue(item))
            return item;
        else
            throw new Error('Requested item either does not exist, or its value is null');
    };
    // After calling this.remove(), both the key and value are no longer in storage.
    // If you want to re-insert the key and value in storage later, you must call this.set(value)
    ItemInBrowserStorage.prototype.remove = function () {
        this._storageType.removeItem(this.key);
    };
    return ItemInBrowserStorage;
}());
exports.ItemInBrowserStorage = ItemInBrowserStorage;
