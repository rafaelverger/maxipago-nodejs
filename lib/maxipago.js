var restify = require('restify-clients'),
    xml2js = require('xml2js'),
    mp_utils = require('./utils');

// Create a gateway to MaxiPago service
exports.Gateway = (function() {

  // maxipago constants
  var MP_API_VERSION = '3.1.1.15',
      MP_AUTH = {},
      MP_POST_API = '/UniversalAPI/postAPI',
      MP_POST_XML = '/UniversalAPI/postXML';

  // other constants
  var XML_OPTIONS = {explicitRoot: false, explicitArray: false};

  var reqHandler = function(callback) {
    return function(err, req, res, xml_response) {
      if (err) return callback(err);
      xml2js.parseString(xml_response, XML_OPTIONS, function(err, obj) {
        if (err) return callback(err);
        return callback(undefined, !!obj.errorMessage, obj);
      });
    };
  };

  function Gateway(merchantId, merchantKey, test) {
    if (!merchantKey) {
      throw new Error('No merchantKey found');
    }

    this.test = test || false;
    MP_AUTH = {
      merchantId: merchantId,
      merchantKey: merchantKey
    };

    this.client = restify.createStringClient({
      url: 'https://' + (this.test ? 'test' : '') + 'api.maxipago.net',
      contentType: 'text/xml; charset=utf-8'
    });

    this.sale = function(sale, callback) {
      var saleXML = mp_utils.buildSaleXML(sale, MP_API_VERSION, MP_AUTH, XML_OPTIONS);
      this.client.post(MP_POST_XML, saleXML, reqHandler(callback));
    };

    this.addCustomer = function(client, callback) {
      var clientXML = mp_utils.buildAddCustomerXML(client, MP_AUTH, XML_OPTIONS);
      this.client.post(MP_POST_API, clientXML, reqHandler(callback));
    };

    this.updateCustomer = function(client, callback) {
      var clientXML = mp_utils.buildUpdateCustomerXML(client, MP_AUTH, XML_OPTIONS);
      this.client.post(MP_POST_API, clientXML, reqHandler(callback));
    };

    this.addCard = function(card, callback) {
      var cardXML = mp_utils.buildAddCardXML(card, MP_AUTH, XML_OPTIONS);
      this.client.post(MP_POST_API, cardXML, reqHandler(callback));
    };

    this.deleteCard = function(card, callback) {
      var cardXML = mp_utils.buildDeleteCardXML(card, MP_AUTH, XML_OPTIONS);
      this.client.post(MP_POST_API, cardXML, reqHandler(callback));
    };

    return this;
  }

  return Gateway;
})();
