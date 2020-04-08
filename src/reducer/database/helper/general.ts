// Reduce object fields by using a key schema
/**
 * Squeeze object by keys.
 * 
 * @param obj A object to squeeze.
 * @param keys A list of object keys to filter by.
 * @returns The filtered object.
 * @description Removes every key of an object that does not appear in the key list.
 */
function squeezer(obj: any, keys?: string[]) {
  //let t = Object.keys(obj).concat(keys)
  if (keys && keys.length > 0) {
    let keysToRemove = Object.keys(obj).filter((x) => !keys.includes(x));

    for (let index = 0; index < keysToRemove.length; index++) {
      const key = keysToRemove[index];
      delete obj[key];
    }
  }

  return obj;
}

export { squeezer };

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © Simon Prast
 */
