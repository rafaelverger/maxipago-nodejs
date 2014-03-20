var mpGateway = require('./index').buildGateway();

var _basicClient = function() {
  var time = new Date().getTime();
  return {
    customerIdExt: time,
    firstName: "Fulano",
    lastName: "De Tal " + time
  };
};

var _fullClient = function() {
  var time = new Date().getTime();
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
};

exports.testSaveBasicClient = function(test){
  var client = _basicClient();

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
  var client = _fullClient();

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
  var client = _fullClient(),
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
