'use strict'

/**
 * Returns a copy of the array with the first element that matches the predicate removed.
 * @param {any[]} array
 * @param {Function} predicate
 */
export function copyWithout(array, predicate) {
  const index = array.findIndex(predicate)
  if (index !== -1) {
    return array.toSpliced(index, 1)
  }
  else {
    return array.concat()
  }
}