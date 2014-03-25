var maxipago = require('../../lib/maxipago'),
    testMerchantId = 100,
    testMerchantKey = process.env.MP_TEST_KEY;

var _buildGateway = function() {
      return new maxipago.Gateway(testMerchantId, testMerchantKey, true);
    },
    _basicClient = function() {
      var now = new Date().getTime();
      return {
        customerIdExt: now,
        firstName: 'Fulano',
        lastName: 'De Tal ' + now
      };
    },
    _fullClient = function() {
      var client = _basicClient();
      client.address1 = 'Rua Desconhecida, s/n';
      client.address2 = 'Casa 0';
      client.city = 'Desaparecida';
      client.state = 'BA';
      client.zip = '123000-456';
      client.country = 'BR';
      client.phone = '+5511990090009';
      client.email = 'email@server.com';
      client.dob = '01/01/1970';
      client.sex = 'M';
      return client;
    },
    _basicSale = function(customerId, forValidSale) {
      var now = new Date().getTime();
      return {
        processorID: '1',
        referenceNum: 'PONumber-' + now,
        billing: {
          name: 'Test Credit Card'
        },
        transactionDetail: {
          payType: {
            creditCard: {
              number: '4111111111111111',
              expMonth: '12',
              expYear: '2020',
              cvvNumber: '999'
            }
          }
        },
        payment: {
          currencyCode: 'BRL',
          chargeTotal: forValidSale ? '10.00' : '15.33'
        },
        saveOnFile: {
          customerToken: customerId
        }
      };
    },
    _saleWithToken = function(customerId, token) {
      var now = new Date().getTime();
      return {
        processorID: '1',
        referenceNum: 'PONumber-' + now,
        transactionDetail: {
          payType: {
            onFile: {
              customerId: customerId,
              token: token
            }
          }
        },
        payment: {
          currencyCode: 'BRL',
          chargeTotal: '10.00'
        }
      };
    },
    _basicAddCard = function(customerId) {
      return {
        customerId: customerId,
        creditCardNumber: '4111111111111111',
        expirationMonth: 12,
        expirationYear: 2020,
        billingName: 'Test Credit Card'
      };
    },
    _basicDeleteCard = function(customerId, token) {
      return {
        customerId: customerId,
        token: token
      };
    }
;

exports.buildGateway = _buildGateway;
exports.basicClient = _basicClient;
exports.fullClient = _fullClient;
exports.basicSale = _basicSale;
exports.saleWithToken = _saleWithToken;
exports.basicAddCard = _basicAddCard;
exports.basicDeleteCard = _basicDeleteCard;
