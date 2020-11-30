# ItemInBrowserStorage

An abstract TypeScript/JavaScript class representing an item stored in the browser's  
`localStorage` or `sessionStorage`. The choice of `localStorage` or `sessionStorage`  
must be decided by a subclass using the `__storageType` argument in the constructor.  
The stored item is identified by a unique string `__key` and stored as a `key:value` pair.  
When you call the constructor, you must provide a `__key`.  if the `value` argument is not  
undefined or null, the item will be stored immediately.  Else, the item won't be stored until  
you call `this.set()`.

Note: this only works when run in a browser environment.

## Constructor

<details>
<summary>view constructor</summary>

```ts
constructor(
    __storageType: sessionStorage | localStorage,
    
    __key: string,
    
    value?: any = undefined
	// If `value` is defined, the item will be stored on instantiation.
)
```
</details>


## Methods
<details>
<summary>view methods</summary>

```js
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

</details>



## Installation

```bash
npm i  @writetome51/item-in-browser-storage
```

## Loading
```js
import {ItemInBrowserStorage} from '@writetome51/item-in-browser-storage';
```
