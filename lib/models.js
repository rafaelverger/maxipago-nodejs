exports.addCustomer = {
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
};
exports.updateCustomer = {
  customerId: undefined,
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
exports.deleteCustomer = {
  customerId: undefined,
};
exports.deleteCard = {
  customerId: undefined,
  token: undefined
};
exports.sale = {
  processorID: undefined,
  referenceNum: undefined,
  ipAddress: undefined,
  fraudCheck: undefined,
  customerIdExt: undefined,
  billing: {
    name: undefined,
    address: undefined,
    address2: undefined,
    city: undefined,
    state: undefined,
    postalcode: undefined,
    country: undefined,
    phone: undefined,
    email: undefined
  },
  shipping: {
    name: undefined,
    address: undefined,
    address2: undefined,
    city: undefined,
    state: undefined,
    postalcode: undefined,
    country: undefined,
    phone: undefined,
    email: undefined
  },
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
      onFile: {
        customerId: undefined,
        token: undefined
      }
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
exports.capture = {
  orderID: undefined,
  referenceNum: undefined,
  payment: {
    chargeTotal: undefined
  }
};
exports.void = {
  transactionID: undefined
};
exports.returnPayment = {
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
  billing: {
    name: undefined,
    address: undefined,
    address2: undefined,
    city: undefined,
    state: undefined,
    postalcode: undefined,
    country: undefined,
    phone: undefined,
    email: undefined
  },
  shipping: {
    name: undefined,
    address: undefined,
    address2: undefined,
    city: undefined,
    state: undefined,
    postalcode: undefined,
    country: undefined,
    phone: undefined,
    email: undefined
  },
  transactionDetail: {
    payType: {
      creditCard: {
        number: undefined,
        expMonth: undefined,
        expYear: undefined,
        cvvNumber: undefined
      },
      onFile: {
        customerId: undefined,
        token: undefined
      }
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
  billingInfo: {
    name: undefined,
    address1: undefined,
    address2: undefined,
    city: undefined,
    zip: undefined,
    country: undefined,
    email: undefined,
    phone: undefined
  },
  shippingInfo: {
    name: undefined,
    address1: undefined,
    address2: undefined,
    city: undefined,
    zip: undefined,
    country: undefined,
    email: undefined,
    phone: undefined
  },
};