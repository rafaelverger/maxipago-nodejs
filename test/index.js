var maxipago = require('../lib/maxipago'),
    testMerchantId = 100,
    testMerchantKey = '';

exports.buildGateway = function(){
  return new maxipago.Gateway(testMerchantId, testMerchantKey, true);
}
