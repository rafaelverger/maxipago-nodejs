var models = require('./models'),
  xml2js = require('xml2js'),
  xmlBuilder = function (options) {
    return new xml2js.Builder(options);
  };

/*
 * Sorts an object's attributes based on attributes' order from reference object
 * and removes the attributes that are not present in the reference object;
 *
 * @param {Object} object The object to be formatted
 * @param {Object} reference The format reference
 */
var formatObject = function (object, reference) {
  var formatted = {};
  Object.keys(reference).forEach(function (key) {
    if (object.hasOwnProperty(key)) {
      if (object[key] instanceof Object) {
        formatted[key] = formatObject(object[key], reference[key]);
      } else {
        formatted[key] = object[key];
      }
    }
  });
  return formatted;
};
exports.formatObject = formatObject;


exports.buildAddCustomerXML = function (customer, mpAuth, xmlOptions) {
  var data = {};
  data.verification = mpAuth;
  data.command = 'add-consumer';
  data.request = this.formatObject(customer, models.addCustomer);
  return xmlBuilder(xmlOptions).buildObject({
    'api-request': data
  });
};
exports.buildUpdateCustomerXML = function (customer, mpAuth, xmlOptions) {
  var data = {};
  data.verification = mpAuth;
  data.command = 'update-consumer';
  data.request = this.formatObject(customer, models.updateCustomer);
  return xmlBuilder(xmlOptions).buildObject({
    'api-request': data
  });
};
exports.buildDeleteCustomerXML = function (customerId, mpAuth, xmlOptions) {
  var data = {};
  data.verification = mpAuth;
  data.command = 'delete-consumer';
  data.request = this.formatObject(customerId, models.deleteCustomer);
  return xmlBuilder(xmlOptions).buildObject({
    'api-request': data
  });
};


exports.buildAddCardXML = function (card, mpAuth, xmlOptions) {
  var data = {};
  data.verification = mpAuth;
  data.command = 'add-card-onfile';

  // fixing month length
  card.expirationMonth = ('00' + card.expirationMonth).slice(-2);

  data.request = this.formatObject(card, models.addCard);
  return xmlBuilder(xmlOptions).buildObject({
    'api-request': data
  });
};
exports.buildDeleteCardXML = function (card, mpAuth, xmlOptions) {
  var data = {};
  data.verification = mpAuth;
  data.command = 'delete-card-onfile';
  data.request = this.formatObject(card, models.deleteCard);
  return xmlBuilder(xmlOptions).buildObject({
    'api-request': data
  });
};


exports.buildAuthXML = function (auth, mpAPIVersion, mpAuth, xmlOptions) {
  var data = {};
  data.version = mpAPIVersion;
  data.verification = mpAuth;
  data.order = {
    auth: this.formatObject(auth, models.sale)
  };
  return xmlBuilder(xmlOptions).buildObject({
    'transaction-request': data
  });
};
exports.buildCaptureXML = function (capture, mpAPIVersion, mpAuth, xmlOptions) {
  var data = {};
  data.version = mpAPIVersion;
  data.verification = mpAuth;
  data.order = {
    capture: this.formatObject(capture, models.capture)
  };
  return xmlBuilder(xmlOptions).buildObject({
    'transaction-request': data
  });
};
exports.buildVoidXML = function (_void, mpAPIVersion, mpAuth, xmlOptions) {
  var data = {};
  data.version = mpAPIVersion;
  data.verification = mpAuth;
  data.order = {
    void: this.formatObject(_void, models.void)
  };

  return xmlBuilder(xmlOptions).buildObject({
    'transaction-request': data
  });
};
exports.buildSaleXML = function (sale, mpAPIVersion, mpAuth, xmlOptions) {
  var data = {};
  data.version = mpAPIVersion;
  data.verification = mpAuth;
  data.order = {
    sale: this.formatObject(sale, models.sale)
  };
  return xmlBuilder(xmlOptions).buildObject({
    'transaction-request': data
  });
};
exports.buildReturnPaymentXML = function (_return, mpAPIVersion, mpAuth, xmlOptions) {
  var data = {};
  data.version = mpAPIVersion;
  data.verification = mpAuth;
  data.order = {
    return: this.formatObject(_return, models.returnPayment)
  };
  return xmlBuilder(xmlOptions).buildObject({
    'transaction-request': data
  });
};


exports.buildRecurringPaymentXML = function (recurringPayment, mpAPIVersion, mpAuth, xmlOptions) {
  var data = {};
  data.version = mpAPIVersion;
  data.verification = mpAuth;
  data.order = {
    recurringPayment: this.formatObject(recurringPayment, models.recurringPayment)
  };
  return xmlBuilder(xmlOptions).buildObject({
    'transaction-request': data
  });
};
exports.buildUpdateRecurringPaymentXML = function (updateRecurringPayment, mpAuth, xmlOptions) {
  var data = {};
  data.verification = mpAuth;
  data.command = 'modify-recurring';
  data.request = this.formatObject(updateRecurringPayment, models.updateRecurringPayment);
  return xmlBuilder(xmlOptions).buildObject({
    'api-request': data
  });
};
exports.buildCancelRecurringPaymentXML = function (cancelRecurringPayment, mpAuth, xmlOptions) {
  var data = {};
  data.verification = mpAuth;
  data.command = 'cancel-recurring';
  data.request = this.formatObject(cancelRecurringPayment, models.updateRecurringPayment)
  return xmlBuilder(xmlOptions).buildObject({
    'api-request': data
  });
};

