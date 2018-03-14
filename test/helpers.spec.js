const { queryStringToObject, objectToQueryString } = require('../src/helpers');

describe('helpers.js', () => {
  test('queryStringToObject', () => {
    try {
      queryStringToObject();
    } catch (error) {
      expect(error.message).toBe('Sin QueryString que revisar');
    }
    try {
      queryStringToObject(123123123);
    } catch (error) {
      expect(error.message).toBe('QueryString no es una cadena');
    }

    const qs = queryStringToObject('a=b&c=d');
    expect(qs.a).toBe('b');
    expect(qs.c).toBe('d');
  });

  test('objectToQueryString', () => {
    expect(objectToQueryString()).toBe('');
    expect(objectToQueryString({ a: 'b', c: 'd' })).toBe('a=b&c=d');
  });
});
