var util = require('./index'),
    mpGateway = util.buildGateway();

exports.testSaveBasicClient = function(test){
  var client = util.basicClient();

  test.expect(7);

  mpGateway.saveClient(
    client,
    function(err, mp_err, data){
      test.ok(!err);
      test.ok(!mp_err);

      test.equal(data.errorCode, '0');
      test.equal(data.errorMessage, '');
      test.equal(data.command, 'add-consumer');

      test.ok(data.hasOwnProperty('result'));
      test.ok(data.result.hasOwnProperty('customerId'));

      test.done();
    }
  );
};

exports.testSaveFullClient = function(test){
  var client = util.fullClient();

  test.expect(7);

  mpGateway.saveClient(
    client,
    function(err, mp_err, data){
      test.ok(!err);
      test.ok(!mp_err);

      test.equal(data.errorCode, '0');
      test.equal(data.errorMessage, '');
      test.equal(data.command, 'add-consumer');

      test.ok(data.hasOwnProperty('result'));
      test.ok(data.result.hasOwnProperty('customerId'));

      test.done();
    }
  );
};

exports.testSaveUnorderedClient = function(test){
  var client = util.fullClient(),
      unordered_client = {};

  Object.keys(client).reverse().forEach(function(key){
    unordered_client[key] = client[key];
  });

  test.expect(7);

  mpGateway.saveClient(
    unordered_client,
    function(err, mp_err, data){
      test.ok(!err);
      test.ok(!mp_err);

      test.equal(data.errorCode, '0');
      test.equal(data.errorMessage, '');
      test.equal(data.command, 'add-consumer');

      test.ok(data.hasOwnProperty('result'));
      test.ok(data.result.hasOwnProperty('customerId'));

      test.done();
    }
  );
};
