var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var braintree = require("braintree");

var gateway = braintree.connect({
  environment: braintree.Environment.Sandbox,
  merchantId: "4k9hh4xt85znmh36",
  publicKey: "226gdy7837xr6kx4",
  privateKey: "78d596182e22fb00cbd9173d8153a3dc"
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function homepage (req, res) {
  res.sendFile(__dirname + '/index.html');
});
app.get('/payment', function payment( req, res){
  res.sendFile(__dirname+ '/payment.html');
});
app.get("/client_token", function (req, res) {
  gateway.clientToken.generate({}, function (err, response) {
    res.send(response.clientToken);
  });
});
app.post("/checkout", function (req, res) {
  var nonceFromTheClient = req.body.payment_method_nonce;
  var amount = req.body.amount;
  console.log(amount);
  gateway.transaction.sale({
  amount: amount,
  paymentMethodNonce: nonceFromTheClient,
  options: {
    submitForSettlement: true
  }
}, function (err, result) {
});
});
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is running on http://localhost:3000/');
});
