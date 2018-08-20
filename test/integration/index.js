require('dotenv').config({path: '../.env'})
var moment = require('moment'),
  faker = require('faker'),
  maxipago = require('../../lib/maxipago'),
  testMerchantId = process.env.MP_TEST_ID,
  testMerchantKey = process.env.MP_TEST_KEY;

var _buildGateway = function() {
    return new maxipago.Gateway(testMerchantId, testMerchantKey, true);
  },
  _basicClient = function() {
    var now =  moment();
    return {
      customerIdExt: now,
      firstName: faker.name.findName(),
      lastName: faker.name.lastName()
    };
  },
  _fullClient = function() {
    var client = _basicClient();
    client.address1 = faker.address.streetAddress();
    client.address2 = faker.address.streetAddress();
    client.city = faker.address.city();
    client.state = faker.address.state();
    client.zip = faker.address.zipCode();
    client.country = faker.address.country();
    client.phone = faker.phone.phoneNumber();
    client.email = 'email@server.com';
    client.dob = faker.date.past();
    client.sex = 'M';
    return client;
  },
  _basicAddCard = function(customerId) {
    return {
      customerId: customerId,
      creditCardNumber: '4111111111111111',
      expirationMonth: 12,
      expirationYear: 2020,
      billingName: faker.name.findName()
    };
  },
  _basicDeleteCard = function(customerId, token) {
    return {
      customerId: customerId,
      token: token
    };
  },
  _basicAuth = function(customerId) {
    var now =  moment();
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
        chargeTotal: '10.00'
      },
      saveOnFile: {
        customerToken: customerId
      }
    };
  },
  _basicAuthWithToken = function(customerId, token) {
    var now =  moment();
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
  _basicCapture = function(orderId, referenceNum) {
    return {
      orderID: orderId,
      referenceNum: referenceNum, 
       payment: {
        chargeTotal: '10.00'
      }
    };
  },
  _basicVoid = function(transactionID) {
    return {
      transactionID: transactionID,
    };
  },
  _basicSale = function(customerId, forValidSale) {
    var now =  moment();
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
  _basicSaleWithToken = function(customerId, token) {
    var now =  moment();
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
  _basicRecurringPayment = function() {
    var now =  moment();
    var tomorrow = moment().add(1, 'days').format('YYYY-MM-DD');
    return {
      processorID: '1',
      referenceNum: 'PONumber-' + now,
      billing: {
        name: 'Fulano De Tal',
        address: 'Rua Desconhecida, s/n',
        address2: 'Casa 0',
        city: 'Desaparecida',
        state: 'BA',
        postalcode: '123000-456',
        country: 'BR',
        phone: '+5511990090009',
        email:  'email@server.com'
      },
      shipping: {
        name: 'Fulano De Tal',
        address: 'Rua Desconhecida, s/n',
        address2: 'Casa 0',
        city: 'Desaparecida',
        state: 'BA',
        postalcode: '123000-456',
        country: 'BR',
        phone: '+5511990090009',
        email:  'email@server.com'
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
        chargeTotal: '11.00'
      },
      recurring: {
        action: 'new',
        startDate: tomorrow,
        frequency: '1',
        period: 'monthly',
        installments: '10',
        failureThreshold: '5',
      }
    };
  },
  _basicRecurringPaymentWithToken = function(customerId, token) {
    var now =  moment();
    var tomorrow = moment().add(1, 'days').format('YYYY-MM-DD');
    return {
      processorID: '1',
      referenceNum: 'PONumber-' + now,
      billing: {
        name: 'Fulano De Tal',
        address: 'Rua Desconhecida, s/n',
        address2: 'Casa 0',
        city: 'Desaparecida',
        state: 'BA',
        postalcode: '123000-456',
        country: 'BR',
        phone: '+5511990090009',
        email:  'email@server.com'
      },
      shipping: {
        name: 'Fulano De Tal',
        address: 'Rua Desconhecida, s/n',
        address2: 'Casa 0',
        city: 'Desaparecida',
        state: 'BA',
        postalcode: '123000-456',
        country: 'BR',
        phone: '+5511990090009',
        email:  'email@server.com'
      },
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
        chargeTotal: '11.00'
      },
      recurring: {
        action: 'new',
        startDate: tomorrow,
        frequency: '1',
        period: 'monthly',
        installments: '10',
        failureThreshold: '5',
      }
    };
  },
  _basicUpdateRecurringPayment = function(orderID) {
    var fiveDaysAhead = moment().add(1, 'days').format('YYYY-MM-DD');
    return {
      orderID: orderID,
      paymentInfo: {
        cardInfo: {
          softDescriptor: 'RECSDNAME'
        }
      },
      recurring: {
        processorID: '1',
        action: 'disable',
        installments: '11',
        nextFireDate: fiveDaysAhead,
        fireDay: '20',
        period: 'quarterly',
      },
      billingInfo: {
        name: 'Fulano De Tal',
        address1: 'Rua Desconhecida, s/n',
        address2: 'Casa 0',
        city: 'Desaparecida',
        zip: '123000456',
        country: 'BR',
        email:  'email@server.com',
        phone: '+5511990090009'
      },
      shippingInfo: {
        name: 'Fulano De Tal',
        address1: 'Rua Desconhecida, s/n',
        address2: 'Casa 0',
        city: 'Desaparecida',
        zip: '123000456',
        country: 'BR',
        email:  'email@server.com',
        phone: '+5511990090009'
      },
    };
  },
  _basicCancelRecurringPayment = function(orderID) {
    return {
      orderID: orderID
    };
  },
  _basicReturn = function(orderId, referenceNum) {
    return {
      orderID: orderId,
      referenceNum: referenceNum, 
       payment: {
        chargeTotal: '10.00'
      }
    };
  };

exports.buildGateway = _buildGateway;
exports.basicClient = _basicClient;
exports.fullClient = _fullClient;
exports.basicAddCard = _basicAddCard;
exports.basicDeleteCard = _basicDeleteCard;
exports.basicAuth = _basicAuth;
exports.basicAuthWithToken = _basicAuthWithToken;
exports.basicCapture = _basicCapture;
exports.basicVoid = _basicVoid;
exports.basicSale = _basicSale;
exports.basicSaleWithToken = _basicSaleWithToken;
exports.basicRecurringPayment = _basicRecurringPayment;
exports.basicRecurringPaymentWithToken = _basicRecurringPaymentWithToken;
exports.basicUpdateRecurringPayment = _basicUpdateRecurringPayment;
exports.basicCancelRecurringPayment = _basicCancelRecurringPayment;
exports.basicReturn = _basicReturn;
