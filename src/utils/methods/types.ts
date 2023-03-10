export const isString = (str: any) => Object.prototype.toString.call(str) === '[object String]'

export const isNumber = (num: any) => Object.prototype.toString.call(num) === '[object Number]'

export const isBoolean = (bool: any) => Object.prototype.toString.call(bool) === '[object Boolean]'

export const isArray = (arr: any) => Object.prototype.toString.call(arr) === '[object Array]'

export const isObject = (obj: any) => Object.prototype.toString.call(obj) === '[object Object]'

export const isFunction = (obj: any) => Object.prototype.toString.call(obj) === '[object Function]'

export const isNull = (obj: any) => Object.prototype.toString.call(obj) === '[object Null]'

export const isUndefined = (obj: any) => Object.prototype.toString.call(obj) === '[object Undefined]'

export const getNormalType = (obj: any) => Object.prototype.toString.call(obj).replace(/^\[object (\S+)\]$/, '$1');

export const isEmpty = (val: any) => {
  // null or undefined
  if (val == null) return true;

  if (typeof val === 'boolean') return false;

  if (typeof val === 'number') return !val;

  if (val instanceof Error) return val.message === '';

  switch (Object.prototype.toString.call(val)) {
    // String or Array
    case '[object String]':
    case '[object Array]':
      return !val.length;

    // Map or Set or File
    case '[object File]':
    case '[object Map]':
    case '[object Set]': {
      return !val.size;
    }
    // Plain Object
    case '[object Object]': {
      return !Object.keys(val).length;
    }
  }

  return false;
}