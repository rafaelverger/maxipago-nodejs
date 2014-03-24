var proxyquire = require('proxyquire'),
    sinon = require('sinon'),
    models = require('../../lib/models');

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

  var result = require('../../lib/utils').formatObject(to_format, strict_obj);

  test.deepEqual(result, expected);
  test.deepEqual(Object.keys(result), Object.keys(strict_obj));

  test.done();
};

exports.testBuildAddCustomerXML = function(test) {
  var sandbox = sinon.sandbox.create();

  var buildObj = sandbox.spy();
  var fakeBuilder = sandbox.spy(function(){
    return {buildObject: buildObj};
  });

  var utils = proxyquire('../../lib/utils', {
    'xml2js': {Builder: fakeBuilder},
  });

  var formattedObj = 'formattedObj';
  var formatObject = sandbox.stub(utils, 'formatObject');
  formatObject.returns(formattedObj);

  var data = {'data': 'data'},
      auth = {'auth': 'auth'},
      xmlOpts = {'opt': 'opt'};

  utils.buildAddCustomerXML(data, auth, xmlOpts);

  test.ok(formatObject.calledOnce);
  test.ok(formatObject.calledWithExactly(data, models.addCustomer));

  test.ok(fakeBuilder.calledOnce);
  test.ok(fakeBuilder.calledWithExactly(xmlOpts));

  test.ok(buildObj.calledOnce);
  test.ok(buildObj.calledWithExactly({
    'api-request': {
      verification: auth,
      command: 'add-consumer',
      request: formattedObj
    }
  }));

  test.done();
  sandbox.restore();
};
