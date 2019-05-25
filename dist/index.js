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
// Represents an item stored in the browser's `localStorage` or `sessionStorage`.
// The choice of `localStorage` or `sessionStorage` must be decided by a subclass using
// `this._storageType`.
// The item in storage is identified by a unique string `this.key`.
// This class validates `this.key` and `this._storageType`, and performs the basic setting,
// getting, and removal of the item.
var ItemInBrowserStorage = /** @class */ (function (_super) {
    __extends(ItemInBrowserStorage, _super);
    function ItemInBrowserStorage(__key) {
        if (__key === void 0) { __key = ''; }
        var _this = _super.call(this) || this;
        _this.__key = __key;
        error_if_not_string_1.errorIfNotString(_this.__key);
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
    Object.defineProperty(ItemInBrowserStorage.prototype, "_storageType", {
        get: function () {
            this._errorIfPropertyHasNoValue('__storageType', '_storageType');
            return this.__storageType;
        },
        set: function (value) {
            if (value instanceof Storage)
                this.__storageType = value;
            else
                throw new Error("The property \"_storageType\" must be set to either sessionStorage or localStorage");
        },
        enumerable: true,
        configurable: true
    });
    // Saves `value` in storage.  Replaces previous value, if any.
    ItemInBrowserStorage.prototype.set = function (value) {
        // Automatically converts `value` to a string.
        this._storageType.setItem(this.key, value);
    };
    // Browser storage always saves the value as a string, so by default that's the type returned.
    // But subclasses may want to return the value in a modified form, so the return type is `any`.
    ItemInBrowserStorage.prototype.get = function () {
        var item = this._storageType.getItem(this.key);
        if (has_value_no_value_1.hasValue(item))
            return item;
        else
            throw new Error('Requested item either does not exist, or its value is null');
    };
    // After calling this.remove(), both the key and value are no longer in storage.
    // You can store the item again by calling this.set(value)
    ItemInBrowserStorage.prototype.remove = function () {
        this._storageType.removeItem(this.key);
    };
    return ItemInBrowserStorage;
}(base_class_1.BaseClass));
exports.ItemInBrowserStorage = ItemInBrowserStorage;
