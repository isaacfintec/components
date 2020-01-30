import moment from 'moment-timezone';

/**
 * @param {Date} date
 * @param {String} format
 * @param {String} timezone
 * @returns {String}
 * format date
 */
const formatDate = (date, format = 'YYYY/MM/DD HH:mm:ss', timezone = 'America/Mexico_City') => moment(date).tz(timezone).format(format);

/**
 * @param {String} string
 * @returns {String}
 * get first string letter in upper case
 */
const getFirstLetter = string => string.toUpperCase().charAt(0);

/**
 * @param {Object} data
 * @returns {String}
 * transform an object to query parameters
 */
const encodeQueryData = (data) => {
  try {
    return Object
      .keys(data)
      .map(key => `${key}=${data[key]}`)
      .join('&');
  }
  catch (err) {
    return '';
  }
};

/**
 * @param {Object} obj
 * @param {String} search
 * @returns {String}
 * find the object value according to the search parameter
 *
 * Example:
 * obj = {
 *  a: {
 *    b: {
 *      c: 1
 *    }
 *  }
 * }
 *
 * search = "a.b.c"
 *
 * result = 1
 */
const dotStringSearch = (obj, search) => {
  let current = { ...obj };
  try {
    search
      .split('.')
      .forEach((key) => {
        current = current[key];
      });
    return current;
  }
  catch {
    return '';
  }
};

export {
  formatDate,
  getFirstLetter,
  encodeQueryData,
  dotStringSearch,
};
