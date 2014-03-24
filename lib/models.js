
var _saleBillingShippingModel = {
      name: undefined,
      address: undefined,
      address2: undefined,
      city: undefined,
      state: undefined,
      postalcode: undefined,
      country: undefined,
      phone: undefined,
      email: undefined,
    };

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

var creditCardOnFile = exports.deleteCard = {
  customerId: undefined,
  token: undefined
};

exports.sale = {
  processorID: undefined,
  referenceNum: undefined,
  ipAddress: undefined,
  fraudCheck: undefined,
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
    },
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
