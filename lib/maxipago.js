var restify = require('restify'),
    xml2js = require('xml2js'),
    util = require('util');

// Create a gateway to MaxiPago service
exports.Gateway = (function() {

  // maxipago constants
  var MP_API_VERSION = '3.1.1.15',
      MP_AUTH = {},
      MP_POST_API = '/UniversalAPI/postAPI',
      MP_POST_XML = '/UniversalAPI/postXML';

  // other constants
  var XML_OPTIONS = {explicitRoot: false, explicitArray: false};

  var xmlBuilder = new xml2js.Builder(XML_OPTIONS);

  var reqHandler = function(callback) {
    return function(err, req, res, xml_response) {
      if (err) return callback(err);
      xml2js.parseString(xml_response, XML_OPTIONS, function(err, obj) {
        if (err) return callback(err);
        return callback(undefined, !!obj.errorMessage, obj);
      });
    };
  };

  var STRICT_CLIENT = {
    customerIdExt: '',
    firstName: '',
    lastName: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    zip: '',
    country: '',
    phone: '',
    email: '',
    dob: '',
    sex: ''
  };
  var sanitizeClient = function(client) {
    var sanitized = {};
    Object.keys(STRICT_CLIENT).forEach(function(key) {
      if (client.hasOwnProperty(key) && client[key]) {
        sanitized[key] = client[key];
      }
    });
    return sanitized;
  };

  var buildAddCostumerXML = function(client) {
    var data = {};
    data.verification = MP_AUTH;
    data.command = 'add-consumer';
    data.request = sanitizeClient(client);
    return xmlBuilder.buildObject({'api-request': data});
  };

  var buildSaleXML = function(sale) {
    var data = {};
    data.version = MP_API_VERSION;
    data.verification = MP_AUTH;
    data.order = {
      sale: sale
    };
    delete data.order.sale.transactionDetail.payType.creditCard.fullname;
    return xmlBuilder.buildObject({'transaction-request': data});
  };

  var buildAddCardXML = function(card) {
    var data = {};
    data.verification = MP_AUTH;
    data.command = 'add-card-onfile';
    data.request = card;
    return xmlBuilder.buildObject({'api-request': data});
  };

  var buildDeleteCardXML = function(card) {
    var data = {};
    data.verification = MP_AUTH;
    data.command = 'delete-card-onfile';
    data.request = card;
    return xmlBuilder.buildObject({'api-request': data});
  };

  function Gateway(merchantId, merchantKey, test) {
    this.test = test || false;
    MP_AUTH = {
      merchantId: merchantId,
      merchantKey: merchantKey
    };

    this.client = restify.createStringClient({
      url: 'https://' + (this.test ? 'test' : '') + 'api.maxipago.net',
      contentType: 'text/xml; charset=utf-8'
    });
  }

  Gateway.prototype.pay = function(sale, callback) {
    var saleXML = buildSaleXML(sale);
    this.client.post(MP_POST_XML, saleXML, reqHandler(callback));
  };

  Gateway.prototype.saveClient = function(client, callback) {
    var clientXML = buildAddCostumerXML(client);
    this.client.post(MP_POST_API, clientXML, reqHandler(callback));
  };

  Gateway.prototype.addCard = function(card, callback) {
    var cardXML = buildAddCardXML(card);
    this.client.post(MP_POST_API, cardXML, reqHandler(callback));
  };

  Gateway.prototype.deleteCard = function(card, callback) {
    var cardXML = buildDeleteCardXML(card);
    this.client.post(MP_POST_API, cardXML, reqHandler(callback));
  };

  return Gateway;
})();
