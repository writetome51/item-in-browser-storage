# ItemInBrowserStorage

An abstract TypeScript/JavaScript class that represents an item stored  
in the browser's `localStorage` or `sessionStorage`. The choice of  
`localStorage` or `sessionStorage` must be decided by a subclass using  
the `__storageType` argument in the constructor. The stored item is  
identified by a unique string `this.key` and stored as a `key:value` pair.  
This class validates `this.key` and `this.__storageType`, and performs  
the basic setting, getting, and removal of the item. When you call the  
constructor, if the `__key` argument is a string that isn't empty and the  
`value` argument is not undefined or null, the item will be stored  
immediately. Else, the item won't be stored until you call `this.set()`.

Note: this only works when run in a browser environment.

## Constructor

<details>
<summary>view constructor</summary>

```ts
constructor(
    __storageType: sessionStorage | localStorage,
    
    __key? = '',
        // Is assigned to this.key
    
    value?: any = undefined
)
```
</details>


## Properties
<details>
<summary>view properties</summary>

```ts
key: string // the unique ID needed to access the stored item.

className: string // read-only
```
</details>


## Methods
<details>
<summary>view methods</summary>

```ts
set(value): void
    // Saves item `value` in storage.  Replaces previous value, if any.

get(): any
    // Browser storage always saves the value as a string, so by default 
    // that's the type returned.  But subclasses may want to return the value 
    // in a modified form, so the return type is `any`.

remove(): void
    // Removes both key and value from storage.
    // You can store the item again by calling this.set()
```
The methods below are not important to know about in order to use this  
class.  They're inherited from [BaseClass](https://github.com/writetome51/typescript-base-class#baseclass) .
```ts
protected   _createGetterAndOrSetterForEach(
		propertyNames: string[],
		configuration: IGetterSetterConfiguration
	   ) : void
    /*********************
    Use this method when you have a bunch of properties that need getter and/or 
    setter functions that all do the same thing. You pass in an array of string 
    names of those properties, and the method attaches the same getter and/or 
    setter function to each property.
    IGetterSetterConfiguration is this object:
    {
        get_setterFunction?: (
             propertyName: string, index?: number, propertyNames?: string[]
        ) => Function,
	    // get_setterFunction takes the property name as first argument and 
	    // returns the setter function.  The setter function must take one 
	    // parameter and return void.
	    
        get_getterFunction?: (
             propertyName: string, index?: number, propertyNames?: string[]
        ) => Function
	    // get_getterFunction takes the property name as first argument and 
	    // returns the getter function.  The getter function must return something.
    }
    *********************/ 
	   
	   
protected   _returnThis_after(voidExpression: any) : this
    // voidExpression is executed, then function returns this.
    // Even if voidExpression returns something, the returned data isn't used.


protected   _errorIfPropertyHasNoValue(
                property: string, // can contain dot-notation, i.e., 'property.subproperty'
                propertyNameInError? = ''
            ) : void
    // If value of this[property] is undefined or null, it triggers fatal error:
    // `The property "${propertyNameInError}" has no value.`
```
</details>


## Inheritance Chain

ItemInBrowserStorage<--[BaseClass](https://github.com/writetome51/typescript-base-class#baseclass)


## Installation

```bash
npm i  @writetome51/item-in-browser-storage
```

## Loading
```ts
// If using TypeScript:
import {ItemInBrowserStorage} from '@writetome51/item-in-browser-storage';
// If using ES5 JavaScript:
var ItemInBrowserStorage = 
    require('@writetome51/item-in-browser-storage').ItemInBrowserStorage;
```
