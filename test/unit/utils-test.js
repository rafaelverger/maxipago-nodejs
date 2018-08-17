var proxyquire = require('proxyquire'),
  sinon = require('sinon'),
  assert = require('assert'),
  models = require('../../lib/models');

describe('utils', function() {
  describe('#formatObject', function() {
    it('return obj with only allowed attributes in correct order', function() {

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

      assert.notDeepEqual(Object.keys(to_format), Object.keys(strict_obj));
      assert.notDeepEqual(to_format, expected);

      var result = require('../../lib/utils').formatObject(to_format, strict_obj);

      assert.deepEqual(result, expected);
      assert.deepEqual(Object.keys(result), Object.keys(strict_obj));
    });
  });

  describe('#build XML helpers', function() {
    var sandbox,
      xml2js,
      fn_buildObj,
      formattedObj,
      fn_formatObject,
      mp_utils;

    before(function() {
      sandbox = sinon.sandbox.create();

      fn_buildObj = sandbox.spy();
      xml2js = {
        Builder: sandbox.spy(function() {
          return {
            buildObject: fn_buildObj
          };
        })
      };

      mp_utils = proxyquire('../../lib/utils', {
        'xml2js': xml2js
      });

      formattedObj = 'formattedObj';
      fn_formatObject = sandbox.stub(mp_utils, 'formatObject');
      fn_formatObject.returns(formattedObj);
    });
    afterEach(function() {
      fn_buildObj.reset();
      xml2js = {
        Builder: sandbox.spy(function() {
          return {
            buildObject: fn_buildObj
          };
        })
      };
      mp_utils = proxyquire('../../lib/utils', {
        'xml2js': xml2js
      });

      formattedObj = 'formattedObj';
      fn_formatObject = sandbox.stub(mp_utils, 'formatObject');
      fn_formatObject.returns(formattedObj);
    });

    after(function() {
      sandbox.restore();
    });


    it('buildAddCustomerXML', function() {
      var data = {
          'data': 'data'
        },
        auth = {
          'auth': 'auth'
        },
        xmlOpts = {
          'opt': 'opt'
        };

      mp_utils.buildAddCustomerXML(data, auth, xmlOpts);

      assert.ok(fn_formatObject.calledOnce);
      assert.ok(fn_formatObject.calledWithExactly(data, models.addCustomer));

      assert.ok(xml2js.Builder.calledOnce);
      assert.ok(xml2js.Builder.calledWithExactly(xmlOpts));

      assert.ok(fn_buildObj.calledOnce);
      assert.ok(fn_buildObj.calledWithExactly({
        'api-request': {
          verification: auth,
          command: 'add-consumer',
          request: formattedObj
        }
      }));
    });

    it('buildUpdateCustomerXML', function() {
      var data = {
          'data': 'data'
        },
        auth = {
          'auth': 'auth'
        },
        xmlOpts = {
          'opt': 'opt'
        };

      mp_utils.buildUpdateCustomerXML(data, auth, xmlOpts);
      assert.ok(fn_formatObject.calledOnce);
      assert.ok(fn_formatObject.calledWithExactly(data, models.updateCustomer));

      assert.ok(xml2js.Builder.calledOnce);
      assert.ok(xml2js.Builder.calledWithExactly(xmlOpts));

      assert.ok(fn_buildObj.calledOnce);
      assert.ok(fn_buildObj.calledWithExactly({
        'api-request': {
          verification: auth,
          command: 'update-consumer',
          request: formattedObj
        }
      }));
    });


    it('buildAddCardXML', function() {
      var data = {
          'expirationMonth': 12
        },
        fixedData = {
          'expirationMonth': '12'
        },
        auth = {
          'auth': 'auth'
        },
        xmlOpts = {
          'opt': 'opt'
        };

      mp_utils.buildAddCardXML(data, auth, xmlOpts);

      assert.ok(fn_formatObject.calledOnce);
      assert.ok(fn_formatObject.calledWithExactly(fixedData, models.addCard));

      assert.ok(xml2js.Builder.calledOnce);
      assert.ok(xml2js.Builder.calledWithExactly(xmlOpts));

      assert.ok(fn_buildObj.calledOnce);
      assert.ok(fn_buildObj.calledWithExactly({
        'api-request': {
          verification: auth,
          command: 'add-card-onfile',
          request: formattedObj
        }
      }));
    });
    
    it('buildAddCardXML with month < 10', function() {
      var data = {
          'expirationMonth': 1
        },
        fixedData = {
          'expirationMonth': '01'
        },
        auth = {
          'auth': 'auth'
        },
        xmlOpts = {
          'opt': 'opt'
        };

      mp_utils.buildAddCardXML(data, auth, xmlOpts);

      assert.ok(fn_formatObject.calledOnce);
      assert.ok(fn_formatObject.calledWithExactly(fixedData, models.addCard));

      assert.ok(xml2js.Builder.calledOnce);
      assert.ok(xml2js.Builder.calledWithExactly(xmlOpts));

      assert.ok(fn_buildObj.calledOnce);
      assert.ok(fn_buildObj.calledWithExactly({
        'api-request': {
          verification: auth,
          command: 'add-card-onfile',
          request: formattedObj
        }
      }));
    });

    it('buildDeleteCardXML', function() {
      var data = {
          'data': 'data'
        },
        auth = {
          'auth': 'auth'
        },
        xmlOpts = {
          'opt': 'opt'
        };

      mp_utils.buildDeleteCardXML(data, auth, xmlOpts);

      assert.ok(fn_formatObject.calledOnce);
      assert.ok(fn_formatObject.calledWithExactly(data, models.deleteCard));

      assert.ok(xml2js.Builder.calledOnce);
      assert.ok(xml2js.Builder.calledWithExactly(xmlOpts));

      assert.ok(fn_buildObj.calledOnce);
      assert.ok(fn_buildObj.calledWithExactly({
        'api-request': {
          verification: auth,
          command: 'delete-card-onfile',
          request: formattedObj
        }
      }));
    });

    
    it('buildAuthXML', function() {
      var data = {
          'data': 'data'
        },
        version = {
          'version': 'version'
        },
        auth = {
          'auth': 'auth'
        },
        xmlOpts = {
          'opt': 'opt'
        };

      mp_utils.buildAuthXML(data, version, auth, xmlOpts);

      assert.ok(fn_formatObject.calledOnce);
      assert.ok(fn_formatObject.calledWithExactly(data, models.sale));

      assert.ok(xml2js.Builder.calledOnce);
      assert.ok(xml2js.Builder.calledWithExactly(xmlOpts));

      assert.ok(fn_buildObj.calledOnce);
      assert.ok(fn_buildObj.calledWithExactly({
        'transaction-request': {
          version: version,
          verification: auth,
          order: {
            auth: formattedObj
          }
        }
      }));
    });

    it('buildCaptureXML', function() {
      var data = {
          'data': 'data'
        },
        version = {
          'version': 'version'
        },
        auth = {
          'auth': 'auth'
        },
        xmlOpts = {
          'opt': 'opt'
        };

      mp_utils.buildCaptureXML(data, version, auth, xmlOpts);

      assert.ok(fn_formatObject.calledOnce);
      assert.ok(fn_formatObject.calledWithExactly(data, models.capture));

      assert.ok(xml2js.Builder.calledOnce);
      assert.ok(xml2js.Builder.calledWithExactly(xmlOpts));

      assert.ok(fn_buildObj.calledOnce);
      assert.ok(fn_buildObj.calledWithExactly({
        'transaction-request': {
          version: version,
          verification: auth,
          order: {
            capture: formattedObj
          }
        }
      }));
    });

    it('buildSaleXML', function() {
      var data = {
          'data': 'data'
        },
        version = {
          'version': 'version'
        },
        auth = {
          'auth': 'auth'
        },
        xmlOpts = {
          'opt': 'opt'
        };

      mp_utils.buildSaleXML(data, version, auth, xmlOpts);

      assert.ok(fn_formatObject.calledOnce);
      assert.ok(fn_formatObject.calledWithExactly(data, models.sale));

      assert.ok(xml2js.Builder.calledOnce);
      assert.ok(xml2js.Builder.calledWithExactly(xmlOpts));

      assert.ok(fn_buildObj.calledOnce);
      assert.ok(fn_buildObj.calledWithExactly({
        'transaction-request': {
          version: version,
          verification: auth,
          order: {
            sale: formattedObj
          }
        }
      }));
    });


    it('buildRecurringPaymentXML', function() {
      var data = {
          'data': 'data'
        },
        version = {
          'version': 'version'
        },
        auth = {
          'auth': 'auth'
        },
        xmlOpts = {
          'opt': 'opt'
        };

      mp_utils.buildRecurringPaymentXML(data, version, auth, xmlOpts);

      assert.ok(fn_formatObject.calledOnce);
      assert.ok(fn_formatObject.calledWithExactly(data, models.recurringPayment));

      assert.ok(xml2js.Builder.calledOnce);
      assert.ok(xml2js.Builder.calledWithExactly(xmlOpts));

      assert.ok(fn_buildObj.calledOnce);
      assert.ok(fn_buildObj.calledWithExactly({
        'transaction-request': {
          version: version,
          verification: auth,
          order: {
            recurringPayment: formattedObj
          }
        }
      }));
    });

    it('buildUpdateRecurringPaymentXML', function() {
      var data = {
          'data': 'data'
        },
        auth = {
          'auth': 'auth'
        },
        xmlOpts = {
          'opt': 'opt'
        };

      mp_utils.buildUpdateRecurringPaymentXML(data, auth, xmlOpts);

      assert.ok(fn_formatObject.calledOnce);
      assert.ok(fn_formatObject.calledWithExactly(data, models.updateRecurringPayment));

      assert.ok(xml2js.Builder.calledOnce);
      assert.ok(xml2js.Builder.calledWithExactly(xmlOpts));

      assert.ok(fn_buildObj.calledOnce);
      assert.ok(fn_buildObj.calledWithExactly({
        'api-request': {
          verification: auth,
          command: 'modify-recurring',
          request: formattedObj
        }
      }));
    });

    it('buildCancelRecurringPaymentXML', function() {
      var data = {
          'data': 'data'
        },
        auth = {
          'auth': 'auth'
        },
        xmlOpts = {
          'opt': 'opt'
        };

      mp_utils.buildCancelRecurringPaymentXML(data, auth, xmlOpts);

      assert.ok(fn_formatObject.calledOnce);
      assert.ok(fn_formatObject.calledWithExactly(data, models.updateRecurringPayment));

      assert.ok(xml2js.Builder.calledOnce);
      assert.ok(xml2js.Builder.calledWithExactly(xmlOpts));

      assert.ok(fn_buildObj.calledOnce);
      assert.ok(fn_buildObj.calledWithExactly({
        'api-request': {
          verification: auth,
          command: 'cancel-recurring',
          request: formattedObj
        }
      }));
    });

    it('buildReturnXML', function() {
      var data = {
          'data': 'data'
        },
        version = {
          'version': 'version'
        },
        auth = {
          'auth': 'auth'
        },
        xmlOpts = {
          'opt': 'opt'
        };

      mp_utils.buildReturnXML(data, version, auth, xmlOpts);

      assert.ok(fn_formatObject.calledOnce);
      assert.ok(fn_formatObject.calledWithExactly(data, models.return));

      assert.ok(xml2js.Builder.calledOnce);
      assert.ok(xml2js.Builder.calledWithExactly(xmlOpts));

      assert.ok(fn_buildObj.calledOnce);
      assert.ok(fn_buildObj.calledWithExactly({
        'transaction-request': {
          version: version,
          verification: auth,
          order: {
            return: formattedObj
          }
        }
      }));
    });
  });
});
