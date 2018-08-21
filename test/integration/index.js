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
    var id = Math.floor(Math.random() * (10000 - 100) ) + 100;
    return {
      customerIdExt: id,
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
    client.zip = faker.address.zipCode('#########');
    client.country = faker.address.countryCode();
    client.phone = faker.phone.phoneNumberFormat(3);
    client.email = faker.internet.email();
    client.dob =  moment(faker.date.past()).format('MM/DD/YYYY');
    client.sex = (client.customerIdExt % 2 == 0) ? 'M' : 'F';
    return client;
  },
  _basicAddCard = function(customerId, customerName) {
    return {
      customerId: customerId,
      creditCardNumber: '4111111111111111',
      expirationMonth: 12,
      expirationYear: 2020,
      billingName: customerName
    };
  },
  _basicDeleteCard = function(customerId, token) {
    return {
      customerId: customerId,
      token: token
    };
  },
  _basicAuth = function(customerId, customerName) {
    var id = Math.floor(Math.random() * (10000 - 100) ) + 100;
    return {
      processorID: '1',
      referenceNum: 'PONumber-' + id,
      billing: {
        name: customerName
      },
      transactionDetail: {
        payType: {
          creditCard: {
            number: '4111111111111111',
            expMonth: '12',
            expYear: '2020',
            cvvNumber: ''
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
    var id = Math.floor(Math.random() * (10000 - 100) ) + 100;
    return {
      processorID: '1',
      referenceNum: 'PONumber-' + id,
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
  _basicSale = function(customerId, forValidSale, customerName) {
    var id = Math.floor(Math.random() * (10000 - 100) ) + 100;
    return {
      processorID: '1',
      referenceNum: 'PONumber-' + id,
      billing: {
        name: customerName
      },
      transactionDetail: {
        payType: {
          creditCard: {
            number: '4111111111111111',
            expMonth: '12',
            expYear: '2020',
            cvvNumber: ''
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
    var id = Math.floor(Math.random() * (10000 - 100) ) + 100;
    return {
      processorID: '1',
      referenceNum: 'PONumber-' + id,
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
    var id = Math.floor(Math.random() * (10000 - 100) ) + 100;
    var tomorrow = moment().add(1, 'days').format('YYYY-MM-DD');
    return {
      processorID: '1',
      referenceNum: 'PONumber-' + id,
      billing: {
        name: faker.name.findName(),
        address: faker.address.streetAddress(),
        address2: faker.address.streetAddress(),
        city: faker.address.city(),
        state: faker.address.state(),
        postalcode: faker.address.zipCode('#########'),
        country: faker.address.countryCode(),
        phone: faker.phone.phoneNumberFormat(3),
        email: faker.internet.email()
      },
      shipping: {
        name: faker.name.findName(),
        address: faker.address.streetAddress(),
        address2: faker.address.streetAddress(),
        city: faker.address.city(),
        state: faker.address.state(),
        postalcode: faker.address.zipCode('#########'),
        country: faker.address.countryCode(),
        phone: faker.phone.phoneNumberFormat(3),
        email: faker.internet.email()
      },
      transactionDetail: {
        payType: {
          creditCard: {
            number: '4111111111111111',
            expMonth: '12',
            expYear: '2020',
            cvvNumber: ''
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
    var id = Math.floor(Math.random() * (10000 - 100) ) + 100;
    var tomorrow = moment().add(1, 'days').format('YYYY-MM-DD');
    return {
      processorID: '1',
      referenceNum: 'PONumber-' + id,
      billing: {
        name: faker.name.findName(),
        address: faker.address.streetAddress(),
        address2: faker.address.streetAddress(),
        city: faker.address.city(),
        state: faker.address.state(),
        postalcode: faker.address.zipCode('#########'),
        country: faker.address.countryCode(),
        phone: faker.phone.phoneNumberFormat(3),
        email: faker.internet.email()
      },
      shipping: {
        name: faker.name.findName(),
        address: faker.address.streetAddress(),
        address2: faker.address.streetAddress(),
        city: faker.address.city(),
        state: faker.address.state(),
        postalcode: faker.address.zipCode('#########'),
        country: faker.address.countryCode(),
        phone: faker.phone.phoneNumberFormat(3),
        email: faker.internet.email()
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
        name: faker.name.findName(),
        address1: faker.address.streetAddress(),
        address2: faker.address.streetAddress(),
        city: faker.address.city(),
        zip: faker.address.zipCode('#########'),
        country: faker.address.countryCode(),
        email:  faker.internet.email(),
        phone: faker.phone.phoneNumberFormat(3)
      },
      shippingInfo: {
        name: faker.name.findName(),
        address1: faker.address.streetAddress(),
        address2: faker.address.streetAddress(),
        city: faker.address.city(),
        zip: faker.address.zipCode('#########'),
        country: faker.address.countryCode(),
        email:  faker.internet.email(),
        phone: faker.phone.phoneNumberFormat(3)
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
