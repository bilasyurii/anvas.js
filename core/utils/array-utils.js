export default class ArrayUtils {
  /**
   * Find first element, which fits specified expression.
   * 
   * @param {any[]} array Array to search in.
   * @param {function(any, number):boolean} expression An expression used to do searching. Takes in element and it's index.
   * @returns {any} Found element, null otherwise.
   */
  static find(array, expression) {
    const length = array.length;

    for (let i = 0; i < length; ++i) {
      const element = array[i];

      if (expression(element, i)) {
        return element;
      }
    }

    return null;
  }

  /**
   * Find index of a first element, which fits specified expression.
   * 
   * @param {any[]} array Array to search in.
   * @param {function(any, number):boolean} expression An expression used to do searching. Takes in element and it's index.
   * @returns {number} Index of a found element, -1 otherwise.
   */
  static findIndex(array, expression) {
    const length = array.length;

    for (let i = 0; i < length; ++i) {
      if (expression(array[i], i)) {
        return i;
      }
    }

    return -1;
  }

  /**
   * Find index of a searched element in the array.
   * 
   * @param {any[]} array Array to search in.
   * @param {any} element An element to search for.
   * @returns {number} Index of a found element, -1 otherwise.
   */
  static findByValue(array, element) {
    const length = array.length;

    for (let i = 0; i < length; ++i) {
      if (array[i] === element) {
        return i;
      }
    }

    return -1;
  }

  /**
   * Find all elements, that fit specified expression.
   * 
   * @param {any[]} array Array to search in.
   * @param {function(any, number):boolean} expression An expression used to do searching. Takes in element and it's index.
   * @returns {any[]} An array of all found elements.
   */
  static findAll(array, expression) {
    const found = [];
    const length = array.length;

    for (let i = 0; i < length; ++i) {
      const element = array[i];

      if (expression(element, i)) {
        found.push(element);
      }
    }

    return found;
  }

  /**
   * Check if an array contains all elements of another array.
   * 
   * @param {any[]} array Array to search in.
   * @param {any[]} input Array of elements to look for.
   * @returns {boolean} An array of all found elements.
   */
  static containsAll(array, input) {
    const length = array.length;
    const inputLength = input.length;

    if (length < inputLength) {
      return false;
    }

    for (let i = 0; i < inputLength; ++i) {
      if (ArrayUtils.findByValue(array, input[i]) < 0) {
        return false;
      }
    }

    return true;
  }

  /**
   * Get random item from an array.
   * 
   * @param {any[]} array Array to get item from.
   * @returns {any}
   */
  static randomItem(array) {
    return array[~~(array.length * Math.random())];
  }

  /**
   * Remove item from an array.
   * 
   * @param {any[]} array Array to remove item from.
   * @param {any} item Item to be removed.
   * @returns {boolean} True, if removed, false otherwise.
   */
  static removeByValue(array, item) {
    const index = ArrayUtils.findByValue(array, item);

    if (index < 0) {
      return false;
    }
    
    array.splice(index, 1);

    return true;
  }

  /**
   * Remove first element, which fits specified condition.
   * 
   * @param {any[]} array Array to remove item from.
   * @param {function(any, number):boolean} expression An expression used to do searching. Takes in element and it's index.
   * @returns {boolean} Removed item, null otherwise.
   */
  static remove(array, expression) {
    const index = ArrayUtils.findIndex(array, expression);

    if (index < 0) {
      return null;
    }
    
    return array.splice(index, 1)[0];
  }

  /**
   * Faster version of forEach method.
   * 
   * Can be used to iterate through collection quickly.
   * 
   * @param {any[]} array Array to iterate.
   * @param {function(any)} expression An expression, which will process every item of the array.
   * 
   * @returns {any[]} Array, that has been passed (for chaining);
   */
  static forEach(array, expression) {
    const length = array.length;

    for (let i = 0; i < length; ++i) {
      expression(array[i]);
    }

    return array;
  }
}
