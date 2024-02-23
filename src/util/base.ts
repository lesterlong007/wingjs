/**
 * Parse search parameters to object
 * @param searchStr
 * @returns
 */
export const parseSearch = (searchStr = window.location.search) => {
  const qmIndex = searchStr.indexOf('?');
  const paramArr = (qmIndex > -1 ? searchStr.slice(qmIndex + 1) : searchStr).split('&');
  const params: RecordItem = {};
  paramArr.forEach((val: string) => {
    const valArr = val.split('=');
    params[valArr[0]] = valArr[1];
  });
  return params;
};

/**
 * Get query parameters
 * @param key
 * @returns string | object
 */
export const getQueryParam = (key?: string) => {
  const { hash, search } = window.location;
  const hashIndex: number = hash.indexOf('?');
  let param: any = {};
  if (hashIndex > -1) {
    param = parseSearch(hash.slice(hashIndex));
  }
  if (search) {
    param = {
      ...param,
      ...parseSearch(search)
    };
  }

  if (key) {
    return param[key] || null;
  }
  return param;
};

/**
 * Get cookie value according to key
 * @param key
 * @returns string
 */
export const getCookie = (key: string): string => {
  if (!document.cookie || !window.navigator.cookieEnabled) {
    return '';
  }
  const regExe = new RegExp(`${key}=([\\w]+)`);
  const res = document.cookie.match(regExe) || [];
  return res[1] || '';
};

/**
 * Generate random string
 * @param prefix 
 * @returns string
 */
export const getRandomStr = (prefix = ''): string => {
  return prefix + Math.random().toString(36).slice(2);
};

/**
 * Get data type
 * @param data
 * @returns string
 */
export const getDataType = (data: any): string => Object.prototype.toString.call(data).slice(8, -1).toLowerCase();

/**
 * Judge data whether is empty, will include [], {}
 * @param data
 * @returns boolean
 */
export const isEmpty = (data: any): boolean => {
  const dateType = getDataType(data);
  if (dateType === 'array') {
    return data.length === 0;
  } else if (dateType === 'object') {
    return  Object.keys(data).length === 0;
  } else {
    return !data;
  }
};

/**
 * Deep clone a variable, only traverse it recursively for array or object
 * @param obj
 * @param hash
 * @returns any
 */
export const deepClone = (obj: any, hash = new WeakMap()) => {
  if (!obj) return obj;
  if (obj instanceof Date) return new Date(obj);
  if (obj instanceof RegExp) return new RegExp(obj);
  if (typeof obj === 'function') {
    // eslint-disable-next-line no-new-func
    return new Function('return ' + obj.toString())();
  }
  if (typeof obj !== 'object') return obj;
  if (hash.get(obj)) return hash.get(obj);
  const cloneObj = new obj.constructor();
  hash.set(obj, cloneObj);
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      cloneObj[key] = deepClone(obj[key], hash);
    }
  }
  return cloneObj;
};

/**
 * Compare two objects whether are same, only traverse them recursively when they are array or object
 * @param obj1
 * @param obj2
 * @param map
 * @returns boolean
 */
export const isObjEqual = (obj1: any, obj2: any, map = new Map()): boolean => {
  const type1 = getDataType(obj1);
  const type2 = getDataType(obj2);
  if (type1 !== type2 || !['object', 'array'].includes(type1)) {
    return obj1 === obj2;
  }
  if (type1 === 'array' && obj1.length !== obj2.length) {
    return false;
  }
  if (map.get(obj1) && map.get(obj2)) {
    return true;
  } else {
    map.set(obj1, true);
    map.set(obj2, true);
  }
  let flag = true;
  const key1 = Object.keys(obj1);
  const key2 = Object.keys(obj2);
  if (key1.length !== key2.length) {
    return false;
  }
  for (let i = 0; i < key1.length; i++) {
    const key = key1[i];
    if (!Object.prototype.hasOwnProperty.call(obj2, key)) {
      return false;
    }
    const val1 = obj1[key];
    const val2 = obj2[key];
    const valType1 = getDataType(val1);
    const valType2 = getDataType(val2);
    if (valType1 === valType2 && ['object', 'array'].includes(valType1)) {
      flag = isObjEqual(val1, val2, map);
    } else if (val1 !== val2) {
      return false;
    }
  }
  return flag;
};

/**
 * Transfer data from object to map
 * @param data
 * @returns Map or any
 */
export const transferObjectToMap = (data: any) => {
  const dataType = getDataType(data);
  if (dataType === 'object') {
    const map = new Map();
    Object.entries(data).forEach(([key, val]) => {
      map.set(key, val);
    });
    return map;
  } else {
    return data;
  }
};

/**
 * Transfer data from mao to object
 * @param data
 * @returns Object or any
 */
export const transferMapToObject = (data: any) => {
  const dataType = getDataType(data);
  if (dataType === 'map') {
    const obj: RecordItem = {};
    data.forEach((val: any, key: string) => {
      obj[key] = val;
    });
    return obj;
  } else {
    return data;
  }
};

/**
 * Deferred execution in a duration
 * @param time
 * @returns Promise<boolean>
 */
export const sleep = (time: number): Promise<boolean> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

/**
 * Debounce function
 * @param fn
 * @param time
 * @returns function
 */
export const debounce = (fn: FN, time: number): FN => {
  let timer: NodeJS.Timeout | null = null;
  return (...arg: any[]) => {
    timer && clearTimeout(timer);
    timer = setTimeout(() => {
      fn(...arg);
    }, time);
  };
};

/**
 * Throttle function
 * @param fn
 * @param delay
 * @returns function
 */
export const throttle = (fn: FN, delay: number): FN => {
  let flag = false;
  return (...arg: any[]) => {
    if (!flag) {
      flag = true;
      setTimeout(() => {
        flag = false;
        fn(...arg);
      }, delay);
    }
  };
};

/**
 * Get Universally Unique Identifier 
 * @returns string
 */
export const getUUID = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};
