var util = require('./index'),
    mpGateway = util.buildGateway();

exports.testPaySuccess = function(test) {
  test.expect(16);

  var client = util.basicClient();
  mpGateway.saveClient(client, function(err, mp_err, data) {
    var cId = data.result.customerId,
        sale = util.basicSale(cId, true);

    mpGateway.pay(
      sale,
      function(err, mp_err, data) {
        test.ok(!err);
        test.ok(!mp_err);

        test.equal(data.authCode, '123456');
        test.equal(data.referenceNum, sale.referenceNum);
        test.equal(data.errorMessage, '');
        test.equal(data.responseCode, '0');
        test.equal(data.responseMessage, 'CAPTURED');
        test.equal(data.avsResponseCode, 'YYY');
        test.equal(data.cvvResponseCode, 'M');
        test.equal(data.processorCode, 'A');
        test.equal(data.processorMessage, 'APPROVED');

        test.ok(data.hasOwnProperty('save-on-file'));
        test.ok(data['save-on-file'].hasOwnProperty('token'));

        test.ok(data.hasOwnProperty('orderID'));
        test.ok(data.hasOwnProperty('transactionID'));
        test.ok(data.hasOwnProperty('transactionTimestamp'));

        test.done();
      }
    );
  });
};

exports.testPayFailed = function(test) {
  test.expect(16);

  var client = util.basicClient();
  mpGateway.saveClient(client, function(err, mp_err, data) {
    var cId = data.result.customerId,
        sale = util.basicSale(cId, false);

    mpGateway.pay(
      sale,
      function(err, mp_err, data) {
        test.ok(!err);
        test.ok(!mp_err);

        test.equal(data.authCode, '');
        test.equal(data.referenceNum, sale.referenceNum);
        test.equal(data.errorMessage, '');
        test.equal(data.responseCode, '1');
        test.equal(data.responseMessage, 'DECLINED');
        test.equal(data.avsResponseCode, 'NNN');
        test.equal(data.cvvResponseCode, 'N');
        test.equal(data.processorCode, 'D');
        test.equal(data.processorMessage, 'DECLINED');

        test.ok(!data['save-on-file'].hasOwnProperty('token'));
        test.equal(
          data['save-on-file'].error,
          'transaction failed. card on file not done.'
        );

        test.ok(data.hasOwnProperty('orderID'));
        test.ok(data.hasOwnProperty('transactionID'));
        test.ok(data.hasOwnProperty('transactionTimestamp'));

        test.done();
      }
    );
  });
};
