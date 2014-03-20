var restify = require('restify'),
    xml2js = require('xml2js'),
    util = require('util');

// Create a gateway to MaxiPago service
exports.Gateway = (function(){

  // maxipago constants
  var MP_API_VERSION = '3.1.1.15',
      MP_AUTH = {},
      MP_POST_API = '/UniversalAPI/postAPI',
      MP_POST_XML = '/UniversalAPI/postXML';

  // other constants
  var XML_OPTIONS = {explicitRoot: false, explicitArray: false};

  var xmlBuilder = new xml2js.Builder(XML_OPTIONS);

  var reqHandler = function(callback){
    return function(err, req, res, xml_response){
      if (err) return callback(err);
      xml2js.parseString(xml_response, XML_OPTIONS, function(err, obj){
        if (err) return callback(err);
        return callback(undefined, !!obj.errorMessage, obj);
      });
    }
  };

  var STRICT_CLIENT = {
    customerIdExt:'',
    firstName:'',
    lastName:'',
    address1:'',
    address2:'',
    city:'',
    state:'',
    zip:'',
    country:'',
    phone:'',
    email:'',
    dob:'',
    sex:''
  };
  var sanitizeClient = function(client){
    var sanitized = {};
    Object.keys(STRICT_CLIENT).forEach(function(key){
      if ( client.hasOwnProperty(key) && client[key] ) {
        sanitized[key] = client[key];
      }
    });
    return sanitized;
  }

  var buildAddCostumerXML = function(client){
    var data = {};
    data.verification = MP_AUTH;
    data.command = 'add-consumer';
    data.request = sanitizeClient(client);
    return xmlBuilder.buildObject({'api-request': data});
  };

  var buildSaleXML = function(mpClientId, creditCard, order){
    var data = {};
    data.version = MP_API_VERSION;
    data.verification = MP_AUTH;
    data.order = {
      sale: {
        processorID: '1',
        referenceNum: order.code,
        billing: {
          name: creditCard.fullname,
        },
        transactionDetail: {
          payType: {
            creditCard: creditCard
          }
        },
        payment: {
          currencyCode: 'BRL',
          chargeTotal: order.total
        },
        saveOnFile: {
          customerToken: mpClientId
        }
      }
    };
    delete data.order.sale.transactionDetail.payType.creditCard.fullname;
    return xmlBuilder.buildObject({'transaction-request': data});
  };

  function Gateway(merchantId, merchantKey, test){
    this.test = test || false;
    MP_AUTH = {
      merchantId: merchantId,
      merchantKey: merchantKey
    };

    this.client = restify.createStringClient({
      url: 'https://' + (this.test ? 'test' : '') + 'api.maxipago.net',
      contentType: 'text/xml; charset=utf-8',
    });

  }

  Gateway.prototype.pay = function(client, order, creditCard, callback) {
    var clientXML = buildAddCostumerXML(client),
        gateway_cli = this.client;

    gateway_cli.post(
      MP_POST_API,
      clientXML,
      reqHandler(function(err, mp_err, data){
        if (err) return callback(err);
        if (mp_err) return callback(err, mp_err, data);

        var cId = data.result.customerId;
        saleXML = buildSaleXML(cId, creditCard, order);
        gateway_cli.post(MP_POST_XML, saleXML, reqHandler(callback));
      })
    );
  };

  Gateway.prototype.saveClient = function(client, callback) {
    var clientXML = buildAddCostumerXML(client);
    this.client.post(MP_POST_API, clientXML, reqHandler(callback));
  };

  return Gateway;
})();
