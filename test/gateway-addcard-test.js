var util = require('./index'),
    mpGateway = util.buildGateway();

exports.testAddCard = function(test) {
  test.expect(7);

  var client = util.basicClient();
  mpGateway.saveClient(client, function(err, mp_err, data) {
    var cId = data.result.customerId,
        card = util.basicAddCard(cId);

    mpGateway.addCard(
      card,
      function(err, mp_err, data) {
        test.ok(!err);
        test.ok(!mp_err);

        test.equal(data.errorCode, '0');
        test.equal(data.errorMessage, '');
        test.equal(data.command, 'add-card-onfile');

        test.ok(data.hasOwnProperty('result'));
        test.ok(data.result.hasOwnProperty('token'));

        test.done();
      }
    );
  });
};

exports.testAddExistingCard = function(test) {
  test.expect(4);

  var client = util.basicClient();
  mpGateway.saveClient(client, function(err, mp_err, data) {
    var cId = data.result.customerId,
        card = util.basicAddCard(cId);

    mpGateway.addCard(
      card,
      function() {
        mpGateway.addCard(
          card,
          function(err, mp_err, data) {
            test.ok(!err);
            test.ok(mp_err);

            test.equal(data.errorCode, '1');
            test.equal(data.errorMessage, 'Card already exists on file.');

            test.done();
          }
        );
      }
    );
  });
};
