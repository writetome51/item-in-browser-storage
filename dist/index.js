"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var base_class_1 = require("@writetome51/base-class");
var error_if_not_string_1 = require("error-if-not-string");
var error_if_not_string_longer_than_zero_1 = require("error-if-not-string-longer-than-zero");
var has_value_no_value_1 = require("@writetome51/has-value-no-value");
var not_1 = require("@writetome51/not");
var is_empty_not_empty_1 = require("@writetome51/is-empty-not-empty");
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
var ItemInBrowserStorage = /** @class */ (function (_super) {
    __extends(ItemInBrowserStorage, _super);
    function ItemInBrowserStorage(__storageType, __key, // the unique ID needed to access the stored item.
    value) {
        if (__key === void 0) { __key = ''; }
        if (value === void 0) { value = undefined; }
        var _this = _super.call(this) || this;
        _this.__storageType = __storageType;
        _this.__key = __key;
        if (not_1.not(_this.__storageType instanceof Storage))
            throw new Error("Input must be either sessionStorage or localStorage");
        error_if_not_string_1.errorIfNotString(_this.__key);
        if (is_empty_not_empty_1.notEmpty(_this.__key) && has_value_no_value_1.hasValue(value))
            _this.set(value);
        return _this;
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
        // Automatically converts `value` to a string.
        this.__storageType.setItem(this.key, value);
    };
    // Browser storage always saves the value as a string, so by default that's the type returned.
    // But subclasses may want to return the value in a modified form, so the return type is `any`.
    ItemInBrowserStorage.prototype.get = function () {
        var item = this.__storageType.getItem(this.key);
        if (has_value_no_value_1.hasValue(item))
            return item;
        else
            throw new Error('Requested item either does not exist, or its value is null');
    };
    // Removes both key and value from storage.  You can store the item again by calling this.set()
    ItemInBrowserStorage.prototype.remove = function () {
        this.__storageType.removeItem(this.key);
    };
    return ItemInBrowserStorage;
}(base_class_1.BaseClass));
exports.ItemInBrowserStorage = ItemInBrowserStorage;
