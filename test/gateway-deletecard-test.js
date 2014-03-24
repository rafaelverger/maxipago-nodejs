var util = require('./index'),
    mpGateway = util.buildGateway();

exports.testDeleteCard = function(test) {
  test.expect(5);

  var client = util.basicClient();
  mpGateway.saveClient(client, function(err, mp_err, data) {
    var cId = data.result.customerId,
        card = util.basicAddCard(cId);

    mpGateway.addCard(
      card,
      function(err, mp_err, data) {
        var token = data.result.token,
            card = util.basicDeleteCard(cId, token);

        mpGateway.deleteCard(
          card,
          function(err, mp_err, data) {
            test.ok(!err);
            test.ok(!mp_err);

            test.equal(data.errorCode, '0');
            test.equal(data.errorMessage, '');
            test.equal(data.command, 'delete-card-onfile');

            test.done();
          }
        );
      }
    );
  });
};
