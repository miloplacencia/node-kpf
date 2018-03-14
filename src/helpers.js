const { URLSearchParams } = require('url');

/**
 * Convierte QS a Objeto
 * @param {string} [string='']
 * @returns {object} Objeto con pares key=value heredados de QueryString
 */
module.exports.queryStringToObject = function QS2OBJ(string = '') {
  if (!string) throw new Error('Sin QueryString que revisar');
  if (typeof string !== 'string')
    throw new Error('QueryString no es una cadena');

  const data = {};
  new URLSearchParams(string).forEach((value, prop) => (data[prop] = value));

  return data;
};

/**
 * Convierte Objeto a QueryString
 * @param {object} [obj={}]
 * @returns {string}
 */
module.exports.objectToQueryString = function OBJ2QS(obj = {}) {
  const qs = new URLSearchParams();
  Object.entries(obj).map(([prop, value]) => qs.append(prop, value));
  return qs.toString();
};
