var assert = require('assert'),
  index = require('./index');

describe('maxipago.gateway', function() {
  var start, count, itTimeout = 30000,
    mpGateway = null;

  this.timeout(itTimeout);

  before(function() {
    count = 0;
    start = new Date().getTime();

    mpGateway = index.buildGateway();
  });

  beforeEach(function() {
    count++;
  });

  after(function() {
    var total = new Date().getTime() - start;
    if (total >= (0.25 * count * itTimeout)) {
      console.warn('Test suite taken too long! ' + total + 'ms');
    }
  });

  describe('#addCustomer', function() {
    it('add customer basic data', function(done) {
      var client = index.basicClient();

      mpGateway.addCustomer(
        client,
        function(err, mp_err, data) {
          assert.ok(!err);
          assert.ok(!mp_err);

          assert.equal(data.errorCode, '0');
          assert.equal(data.errorMessage, '');
          assert.equal(data.command, 'add-consumer');

          assert.ok(data.hasOwnProperty('result'));
          assert.ok(data.result.hasOwnProperty('customerId'));

          done();
        }
      );
    });

    it('add customer full data', function(done) {
      var client = index.fullClient();

      mpGateway.addCustomer(
        client,
        function(err, mp_err, data) {
          assert.ok(!err);
          assert.ok(!mp_err);

          assert.equal(data.errorCode, '0');
          assert.equal(data.errorMessage, '');
          assert.equal(data.command, 'add-consumer');

          assert.ok(data.hasOwnProperty('result'));
          assert.ok(data.result.hasOwnProperty('customerId'));

          done();
        }
      );
    });

    it('add customer full data with unordered request', function(done) {
      var client = index.fullClient(),
        unordered_client = {};

      Object.keys(client).reverse().forEach(function(key) {
        unordered_client[key] = client[key];
      });

      mpGateway.addCustomer(
        unordered_client,
        function(err, mp_err, data) {
          assert.ok(!err);
          assert.ok(!mp_err);

          assert.equal(data.errorCode, '0');
          assert.equal(data.errorMessage, '');
          assert.equal(data.command, 'add-consumer');

          assert.ok(data.hasOwnProperty('result'));
          assert.ok(data.result.hasOwnProperty('customerId'));

          done();
        }
      );
    });
  });
  describe('#updateCustomer', function() {
    it('update customer data', function(done) {
      var client = index.basicClient();
      mpGateway.addCustomer(
        client,
        function(err, mp_err, data) {
          var cId = data.result.customerId;

          client.customerId = cId;
          client.firstName += ' updated';
          client.lastName += ' updated';
          mpGateway.updateCustomer(client, function(err, mp_err, data) {
            assert.ok(!err);
            assert.ok(!mp_err);

            assert.equal(data.errorCode, '0');
            assert.equal(data.errorMessage, '');
            assert.equal(data.command, 'update-consumer');

            assert.ok(data.hasOwnProperty('result'));
            assert.equal(data.result, '');

            done();
          });
        }
      );
    });

    it('update customer data with unordered request', function(done) {
      var client = index.fullClient(),
        unordered_client = {};

      Object.keys(client).reverse().forEach(function(key) {
        unordered_client[key] = client[key];
      });

      mpGateway.addCustomer(
        client,
        function(err, mp_err, data) {
          var cId = data.result.customerId;

          unordered_client.customerId = cId;
          unordered_client.firstName += ' updated';
          unordered_client.lastName += ' updated';
          mpGateway.updateCustomer(unordered_client, function(err, mp_err, data) {
            assert.ok(!err);
            assert.ok(!mp_err);

            assert.equal(data.errorCode, '0');
            assert.equal(data.errorMessage, '');
            assert.equal(data.command, 'update-consumer');

            assert.ok(data.hasOwnProperty('result'));
            assert.equal(data.result, '');

            done();
          });
        }
      );
    });
  });

  describe('#addCard', function() {

    it('add new card', function(done) {
      var client = index.basicClient();
      mpGateway.addCustomer(client, function(err, mp_err, data) {
        var cId = data.result.customerId,
          card = index.basicAddCard(cId);

        mpGateway.addCard(
          card,
          function(err, mp_err, data) {
            assert.ok(!err);
            assert.ok(!mp_err);

            assert.equal(data.errorCode, '0');
            assert.equal(data.errorMessage, '');
            assert.equal(data.command, 'add-card-onfile');

            assert.ok(data.hasOwnProperty('result'));
            assert.ok(data.result.hasOwnProperty('token'));

            done();
          }
        );
      });
    });

    it('add existing card', function(done) {
      var client = index.basicClient();
      mpGateway.addCustomer(client, function(err, mp_err, data) {
        var cId = data.result.customerId,
          card = index.basicAddCard(cId);

        mpGateway.addCard(
          card,
          function(err, mp_err, data) {
            var token = data.result.token;
            mpGateway.addCard(
              card,
              function(err, mp_err, data) {
                assert.ok(!err);
                assert.ok(!mp_err);

                assert.equal(data.result.token, token);

                done();
              }
            );
          }
        );
      });
    });
  });
  describe('#deleteCard', function() {
    it('delete existing card', function(done) {

      var client = index.basicClient();
      mpGateway.addCustomer(client, function(err, mp_err, data) {
        var cId = data.result.customerId,
          card = index.basicAddCard(cId);

        mpGateway.addCard(
          card,
          function(err, mp_err, data) {
            var token = data.result.token,
              card = index.basicDeleteCard(cId, token);

            mpGateway.deleteCard(
              card,
              function(err, mp_err, data) {
                assert.ok(!err);
                assert.ok(!mp_err);

                assert.equal(data.errorCode, '0');
                assert.equal(data.errorMessage, '');
                assert.equal(data.command, 'delete-card-onfile');

                done();
              }
            );
          }
        );
      });
    });
  });

  describe('#auth', function() {
    it('add auth', function(done) {
      var client = index.basicClient();
      mpGateway.addCustomer(client, function (err, mp_err, data) {
        var cId = data.result.customerId,
          auth = index.basicAuth(cId);
  
        mpGateway.auth(
          auth,
          function (err, mp_err, data) {
            assert.ok(!err);
            assert.ok(!mp_err);
  
            assert.equal(data.authCode, '123456');
            assert.equal(data.referenceNum, auth.referenceNum);
            assert.equal(data.errorMessage, '');
            assert.equal(data.responseCode, '0');
            assert.equal(data.responseMessage, 'AUTHORIZED');
            assert.equal(data.avsResponseCode, 'YYY');
            assert.equal(data.cvvResponseCode, 'M');
            assert.equal(data.processorCode, 'A');
            assert.equal(data.processorMessage, 'APPROVED');
  
            assert.ok(data.hasOwnProperty('orderID'));
            assert.ok(data.hasOwnProperty('transactionID'));
            assert.ok(data.hasOwnProperty('transactionTimestamp'));
  
            done();
          }
        );
      });
    });
  
    it('add auth using token', function(done) {
      var client = index.basicClient();
   
      mpGateway.addCustomer(client, function (err, mp_err, data) {
        var cId = data.result.customerId,
         card = index.basicAddCard(cId);
      
        mpGateway.addCard(
          card,
          function (err, mp_err, data) {
            var token = data.result.token,
             auth = index.basicAuthWithToken(cId,token);
  
            mpGateway.auth(
              auth,
              function (err, mp_err, data) {
                
                assert.ok(!err);
                assert.ok(!mp_err);
                assert.equal(data.authCode, '123456');
                assert.equal(data.referenceNum, auth.referenceNum);
                assert.equal(data.errorMessage, '');
                assert.equal(data.responseCode, '0');
                assert.equal(data.responseMessage, 'AUTHORIZED');
                assert.equal(data.avsResponseCode, 'YYY');
                assert.equal(data.cvvResponseCode, 'M');
                assert.equal(data.processorCode, 'A');
                assert.equal(data.processorMessage, 'APPROVED');
      
                assert.ok(data.hasOwnProperty('orderID'));
                assert.ok(data.hasOwnProperty('transactionID'));
                assert.ok(data.hasOwnProperty('transactionTimestamp'));
  
                done();
              }
            );
          })
  
      });
    });
  });
  describe('#capture', function() {
    it('capture an auth', function(done) {
      var client = index.basicClient();
      mpGateway.addCustomer(client, function (err, mp_err, data) {
        var cId = data.result.customerId,
          auth = index.basicAuth(cId);
  
        mpGateway.auth(
          auth,
          function (err, mp_err, data) {
            var orderID =  data.orderID,
            referenceNum = data.referenceNum,
            capture = index.basicCapture(orderID, referenceNum);

            mpGateway.capture(
              capture,
              function (err, mp_err, data) {
                assert.ok(!err);
                assert.ok(!mp_err);

                assert.equal(data.errorMessage, '');
                assert.equal(data.responseCode, '0');
      
                assert.equal(data.responseMessage, 'CAPTURED');
                assert.equal(data.processorMessage, 'APPROVED');
      
                assert.ok(data.hasOwnProperty('orderID'));
      
                done();
              }
            );

          }
        );
      });
    });
  });
  describe('#void', function() {
    it('void an capture', function(done) {
      var client = index.basicClient();
      mpGateway.addCustomer(client, function (err, mp_err, data) {
        var cId = data.result.customerId,
          auth = index.basicAuth(cId);
  
        mpGateway.auth(
          auth,
          function (err, mp_err, data) {
            var orderID =  data.orderID,
            referenceNum = data.referenceNum,
            capture = index.basicCapture(orderID, referenceNum);

            mpGateway.capture(
              capture,
              function (err, mp_err, data) {
                var transactionID = data.transactionID,
                 _void = index.basicVoid(transactionID);
               
                 mpGateway.void(
                  _void,
                  function (err, mp_err, data) {
                    assert.ok(!err);
                    assert.ok(!mp_err);
    
                    assert.equal(data.errorMessage, '');
                    assert.equal(data.responseCode, '0');
                    assert.equal(data.transactionID, transactionID);
          
                    assert.equal(data.responseMessage, 'VOIDED');
                    assert.equal(data.processorMessage, 'APPROVED');
                    
                    done();
                  }
                );

              }
            );

          }
        );
      });
    });
  });
  
  describe('#sale', function() {
    it('add fresh sale', function(done) {
      var client = index.basicClient();
      mpGateway.addCustomer(client, function(err, mp_err, data) {
        var cId = data.result.customerId,
          sale = index.basicSale(cId, true);

        mpGateway.sale(
          sale,
          function(err, mp_err, data) {
            assert.ok(!err);
            assert.ok(!mp_err);

            assert.equal(data.authCode, '123456');
            assert.equal(data.referenceNum, sale.referenceNum);
            assert.equal(data.errorMessage, '');
            assert.equal(data.responseCode, '0');
            assert.equal(data.responseMessage, 'CAPTURED');
            assert.equal(data.avsResponseCode, 'YYY');
            assert.equal(data.cvvResponseCode, 'M');
            assert.equal(data.processorCode, 'A');
            assert.equal(data.processorMessage, 'APPROVED');

            assert.ok(data.hasOwnProperty('save-on-file'));
            assert.ok(data['save-on-file'].hasOwnProperty('token'));

            assert.ok(data.hasOwnProperty('orderID'));
            assert.ok(data.hasOwnProperty('transactionID'));
            assert.ok(data.hasOwnProperty('transactionTimestamp'));

            done();
          }
        );
      });
    });

    it('add fresh sale with failed response', function(done) {
      var client = index.basicClient();
      mpGateway.addCustomer(client, function(err, mp_err, data) {
        var cId = data.result.customerId,
          sale = index.basicSale(cId, false);

        mpGateway.sale(
          sale,
          function(err, mp_err, data) {
            assert.ok(!err);
            assert.ok(!mp_err);

            assert.equal(data.authCode, '');
            assert.equal(data.referenceNum, sale.referenceNum);
            assert.equal(data.errorMessage, '');
            assert.equal(data.responseCode, '1');
            assert.equal(data.responseMessage, 'DECLINED');
            assert.equal(data.avsResponseCode, 'NNN');
            assert.equal(data.cvvResponseCode, 'N');
            assert.equal(data.processorCode, 'D');
            assert.equal(data.processorMessage, 'DECLINED');

            assert.ok(!data['save-on-file'].hasOwnProperty('token'));
            assert.equal(
              data['save-on-file'].error,
              'transaction failed. card on file not done.'
            );

            assert.ok(data.hasOwnProperty('orderID'));
            assert.ok(data.hasOwnProperty('transactionID'));
            assert.ok(data.hasOwnProperty('transactionTimestamp'));

            done();
          }
        );
      });
    });

    it('add fresh sale using token', function(done) {
      var client = index.basicClient();
      mpGateway.addCustomer(client, function(err, mp_err, data) {
        var cId = data.result.customerId,
          sale = index.basicSale(cId, true);

        mpGateway.sale(
          sale,
          function(err, mp_err, data) {
            var token = data['save-on-file'].token,
              sale = index.basicSaleWithToken(cId, token);

            mpGateway.sale(
              sale,
              function(err, mp_err, data) {
                assert.ok(!err);
                assert.ok(!mp_err);

                assert.equal(data.authCode, '123456');
                assert.equal(data.referenceNum, sale.referenceNum);
                assert.equal(data.errorMessage, '');
                assert.equal(data.responseCode, '0');
                assert.equal(data.responseMessage, 'CAPTURED');
                assert.equal(data.avsResponseCode, 'YYY');
                assert.equal(data.cvvResponseCode, 'M');
                assert.equal(data.processorCode, 'A');
                assert.equal(data.processorMessage, 'APPROVED');

                assert.ok(data.hasOwnProperty('orderID'));
                assert.ok(data.hasOwnProperty('transactionID'));
                assert.ok(data.hasOwnProperty('transactionTimestamp'));

                done();
              }
            );
          }
        );
      });
    });

  });

  describe('#recurringPayments', function() {
    it('add recurring payment', function(done) {
      var recurring = index.basicRecurringPayment();
      mpGateway.recurringPayment(
        recurring,
        function (err, mp_err, data) {
          assert.ok(!err);
          assert.ok(!mp_err);

          assert.ok(data.hasOwnProperty('orderID'));
          assert.ok(data.hasOwnProperty('transactionID'));
          assert.ok(data.hasOwnProperty('transactionTimestamp'));

          assert.equal(data.responseMessage, 'APPROVED');
          assert.equal(data.processorName, 'SIMULATOR');

          done();
        }
      );
    });

    it('add recurring payment using token', function(done) {
      var client = index.basicClient();

      mpGateway.addCustomer(client, function (err, mp_err, data) {
        var cId = data.result.customerId,
          card = index.basicAddCard(cId);

        mpGateway.addCard(
          card,
          function (err, mp_err, data) {
            var token = data.result.token,
              recurring = index.basicRecurringPaymentWithToken(cId, token);

            mpGateway.recurringPayment(
              recurring,
              function (err, mp_err, data) {
                assert.ok(!err);
                assert.ok(!mp_err);

                assert.ok(data.hasOwnProperty('orderID'));
                assert.ok(data.hasOwnProperty('transactionID'));
                assert.ok(data.hasOwnProperty('transactionTimestamp'));

                assert.equal(data.responseMessage, 'APPROVED');
                assert.equal(data.processorName, 'SIMULATOR');

                done();
              }
            );
          }
        );
      });
    });

    it('update recurring payment', function(done) {
      var client = index.basicClient();

      mpGateway.addCustomer(client, function (err, mp_err, data) {
        var cId = data.result.customerId,
          card = index.basicAddCard(cId);

        mpGateway.addCard(
          card,
          function (err, mp_err, data) {
            var token = data.result.token,
              recurringPayment = index.basicRecurringPaymentWithToken(cId, token);

            mpGateway.recurringPayment(
              recurringPayment,
              function (err, mp_err, data) {
                var orderID = data.orderID,
                  updateRecurringPayment = index.basicUpdateRecurringPayment(orderID);

                mpGateway.updateRecurringPayment(
                  updateRecurringPayment,
                  function (err, mp_err, data) {
                    assert.ok(!err);
                    assert.ok(!mp_err);

                    assert.equal(data.errorCode, '0');
                    assert.equal(data.errorMessage, '');
                    assert.equal(data.command, 'modify-recurring');

                    done();
                  }
                );
              }
            );
          }
        );
      });
    });

    it('cancel recurring payment', function(done) {
      var client = index.basicClient();

      mpGateway.addCustomer(client, function (err, mp_err, data) {
        var cId = data.result.customerId,
          card = index.basicAddCard(cId);

        mpGateway.addCard(
          card,
          function (err, mp_err, data) {
            var token = data.result.token,
              recurringPayment = index.basicRecurringPaymentWithToken(cId, token);

            mpGateway.recurringPayment(
              recurringPayment,
              function (err, mp_err, data) {
                var orderID = data.orderID,
                  cancelRecurringPayment = index.basicCancelRecurringPayment(orderID);

                mpGateway.cancelRecurringPayment(
                  cancelRecurringPayment,
                  function (err, mp_err, data) {

                    assert.ok(!err);
                    assert.ok(!mp_err);

                    assert.equal(data.errorCode, '0');
                    assert.equal(data.errorMessage, '');
                    assert.equal(data.command, 'cancel-recurring');

                    done();
                  }
                );
              }
            );
          }
        );
      });
    });
  });

  describe('#return', function() {
    it('return an capture', function(done) {
      var client = index.basicClient();
      mpGateway.addCustomer(client, function (err, mp_err, data) {
        var cId = data.result.customerId,
          auth = index.basicAuth(cId);
  
        mpGateway.auth(
          auth,
          function (err, mp_err, data) {
            var orderID =  data.orderID,
            referenceNum = data.referenceNum,
            capture = index.basicCapture(orderID, referenceNum);

            mpGateway.capture(
              capture,
              function (err, mp_err, data) {
                var _return = index.basicReturn(orderID, referenceNum);

                mpGateway.return(
                  _return,
                  function (err, mp_err, data) {
                    assert.ok(!err);
                    assert.ok(!mp_err);
    
                    assert.equal(data.errorMessage, '');
                    assert.equal(data.responseCode, '0');
                    assert.equal(data.orderID, orderID);
          
                    assert.equal(data.responseMessage, 'CAPTURED');
                    assert.equal(data.processorMessage, 'APPROVED');
          
                    assert.ok(data.hasOwnProperty('orderID'));
          
                    done();
                  }
                );
                
              }
            );

          }
        );
      });
    });
  });
});
