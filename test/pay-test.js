var mpGateway = require('./index').buildGateway();

var _buildPayData = function(forValidSale) {
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
};

exports.testGatewayPaySuccess = function(test){
  var payData = _buildPayData(true);

  test.expect(15);

  mpGateway.pay(
    payData.client,
    payData.order,
    payData.creditCard,
    function(err, mp_err, data){
      console.log(err, mp_err, data);
      test.ok(!err);
      test.ok(!mp_err);

      test.equal(data.authCode, '123456');
      test.equal(data.referenceNum, payData.order.code);
      test.equal(data.errorMessage, '');
      test.equal(data.responseCode, '0');
      test.equal(data.responseMessage, 'CAPTURED');
      test.equal(data.avsResponseCode, 'YYY');
      test.equal(data.cvvResponseCode, 'M');
      test.equal(data.processorCode, 'A');
      test.equal(data.processorMessage, 'APPROVED');

      test.ok(data['save-on-file'].hasOwnProperty('token'));

      test.ok(data.hasOwnProperty('orderID'));
      test.ok(data.hasOwnProperty('transactionID'));
      test.ok(data.hasOwnProperty('transactionTimestamp'));

      test.done();
    }
  );
};

exports.testGatewayPayFailed = function(test){
  var payData = _buildPayData(false);

  test.expect(16);

  mpGateway.pay(
    payData.client,
    payData.order,
    payData.creditCard,
    function(err, mp_err, data){
      test.ok(!err);
      test.ok(!mp_err);

      test.equal(data.authCode, '');
      test.equal(data.referenceNum, payData.order.code);
      test.equal(data.errorMessage, '');
      test.equal(data.responseCode, '1');
      test.equal(data.responseMessage, 'DECLINED');
      test.equal(data.avsResponseCode, 'NNN');
      test.equal(data.cvvResponseCode, 'N');
      test.equal(data.processorCode, 'D');
      test.equal(data.processorMessage, 'DECLINED');

      test.ok(!data['save-on-file'].hasOwnProperty('token'));
      test.equal(data['save-on-file'].error, 'transaction failed. card on file not done.');

      test.ok(data.hasOwnProperty('orderID'));
      test.ok(data.hasOwnProperty('transactionID'));
      test.ok(data.hasOwnProperty('transactionTimestamp'));

      test.done();
    }
  );
};
