# ItemInBrowserStorage

An abstract TypeScript/JavaScript class representing an item stored in  
the browser's `localStorage` or `sessionStorage`. The item in storage is  
identified by a unique string `this.key` and is stored as a key/value pair.  
You can create a different class instance for each item you want to store.  
Or you can create a single instance and simply change the value of `this.key`  
when you want to create/access a different item.

Note: this only works when run in a browser environment.

## Constructor

<details>
<summary>view constructor</summary>

```ts
constructor(
    key? = ''  // gets assigned to this.key
)
```
</details>


## Properties
<details>
<summary>view methods</summary>

```ts
key: string // the unique ID for the stored item.

protected  _storageType: Window['sessionStorage'] | Window['localStorage'];
    // When assigning the value, there's no need to mention Window.
    // Example:
    // this._storageType = sessionStorage;
```
</details>


## Methods
<details>
<summary>view methods</summary>

```ts
set(value): void
    // Saves `value` in storage.  Replaces previous value, if any.

get(): any
    // Browser storage always saves the value as a string, so by default that's
    // the type returned.  But subclasses may want to return the value as its original
    // type (before being converted), so the specified return type is `any`.

remove(): void
    // Removes the key/value pair from storage.  If you want to re-insert 
    // the key and value in storage later, you must call this.set(value)
```
</details>


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
