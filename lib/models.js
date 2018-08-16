var extend = require('util')._extend;

var _saleBillingShippingModel = {
  name: undefined,
  address: undefined,
  address2: undefined,
  city: undefined,
  state: undefined,
  postalcode: undefined,
  country: undefined,
  phone: undefined,
  email: undefined
};

var _customerModel = extend({}, {
  customerIdExt: undefined,
  firstName: undefined,
  lastName: undefined,
  address1: undefined,
  address2: undefined,
  city: undefined,
  state: undefined,
  zip: undefined,
  country: undefined,
  phone: undefined,
  email: undefined,
  dob: undefined,
  sex: undefined
});

exports.addCustomer = extend({}, _customerModel);

exports.updateCustomer = extend({
  customerId: undefined
}, _customerModel);

var creditCardOnFile = exports.deleteCard = {
  customerId: undefined,
  token: undefined
};

exports.sale = {
  processorID: undefined,
  referenceNum: undefined,
  ipAddress: undefined,
  fraudCheck: undefined,
  customerIdExt: undefined,
  billing: _saleBillingShippingModel,
  shipping: _saleBillingShippingModel,
  transactionDetail: {
    payType: {
      boleto: {
        expirationDate: undefined,
        number: undefined,
        instructions: undefined,
      },
      creditCard: {
        number: undefined,
        expMonth: undefined,
        expYear: undefined,
        cvvNumber: undefined
      },
      onFile: creditCardOnFile
    }
  },
  saveOnFile: {
    customerToken: undefined,
    onFileEndDate: undefined
  },
  payment: {
    currencyCode: undefined,
    chargeTotal: undefined,
    creditInstallment: {
      numberOfInstallments: undefined,
      chargeInterest: undefined
    }
  }
};

exports.addCard = {
  customerId: undefined,
  creditCardNumber: undefined,
  expirationMonth: undefined,
  expirationYear: undefined,
  billingName: undefined,
  billingAddress1: undefined,
  billingAddress2: undefined,
  billingCity: undefined,
  billingState: undefined,
  billingZip: undefined,
  billingCountry: undefined,
  billingPhone: undefined,
  billingEmail: undefined,
  onFileMaxChargeAmount: undefined
};

exports.capture = {
  orderID: undefined,
  referenceNum: undefined,
  payment: {
    chargeTotal: undefined
  }
};

exports.recurringPayment = {
  processorID: undefined,
  referenceNum: undefined,
  ipAddress: undefined,
  billing: _saleBillingShippingModel,
  shipping: _saleBillingShippingModel,
  transactionDetail: {
    payType: {
      creditCard: {
        number: undefined,
        expMonth: undefined,
        expYear: undefined,
        cvvNumber: undefined
      },
      onFile: creditCardOnFile
    }
  },
  payment: {
    currencyCode: undefined,
    chargeTotal: undefined
  },
  recurring: {
    action: undefined,
    startDate: undefined,
    frequency: undefined,
    period: undefined,
    installments: undefined,
    firstAmount: undefined,
    lastAmount: undefined,
    lastDate: undefined,
    failureThreshold: undefined
  }
};
var _updateRecurringBillingShippingModel = {
  name: undefined,
  address1: undefined,
  address2: undefined,
  city: undefined,
  zip: undefined,
  country: undefined,
  email: undefined,
  phone: undefined
};
exports.updateRecurringPayment = {
  orderID: undefined,
  paymentInfo: {
    cardInfo: {
      creditCardNumber: undefined,
      expirationMonth: undefined,
      expirationYear: undefined,
      softDescriptor: undefined
    },
    chargeTotal: undefined
  },
  recurring: {
    processorID: undefined,
    action: undefined,
    installments: undefined,
    nextFireDate: undefined,
    fireDay: undefined,
    period: undefined,
    lastDate: undefined,
    lastAmount: undefined,
  },
  billingInfo: _updateRecurringBillingShippingModel,
  shippingInfo: _updateRecurringBillingShippingModel,
};
