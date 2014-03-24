var utils = require('../../lib/utils');

exports.testFormatObject = function(test) {

  var strict_obj = {
        a: undefined,
        b: undefined,
        c: {
          d: undefined
        }
      },
      to_format = {
        d: 'd',
        c: {
          e: 'e',
          d: 'd',
          f: 'f'
        },
        b: 'b',
        a: 'a'
      },
      expected = {
        a: 'a',
        b: 'b',
        c: {
          d: 'd'
        }
      };

  test.notEqual(Object.keys(to_format), Object.keys(strict_obj));
  test.notEqual(to_format, expected);

  var result = utils.formatObject(to_format, strict_obj);

  test.deepEqual(result, expected);
  test.deepEqual(Object.keys(result), Object.keys(strict_obj));

  test.done();
};
