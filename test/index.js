var maxipago = require('../lib/maxipago'),
    testMerchantId = 100,
    testMerchantKey = '';

var _buildGateway = function(){
      return new maxipago.Gateway(testMerchantId, testMerchantKey, true);
    },
    _basicClient = function() {
      var time = new Date().getTime();
      return {
        customerIdExt: time,
        firstName: "Fulano",
        lastName: "De Tal " + time
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
    _buildPayData = function(forValidSale) {
      var time = new Date().getTime();
      return {
        client: {
          firstName: "Fulano",
          lastName: "De Tal " + time,
          customerIdExt: time,
        },
        order: {
          total: forValidSale ? "10.00" : "15.33",
          code: "PONumber-" + time
        },
        creditCard: {
          number: "4111111111111111",
          expMonth: "12",
          expYear: "2020",
          cvvNumber: "999",
          fullname: "Test Credit Card"
        }
      };
    }
;

exports.buildGateway = _buildGateway,
exports.buildPayData = _buildPayData,
exports.basicClient = _basicClient,
exports.fullClient = _fullClient
