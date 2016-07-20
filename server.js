var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function homepage (req, res) {
  res.sendFile(__dirname + '/index.html');
});
app.get('/payment', function payment( req, res){
  res.sendFile(__dirname+ '/payment.html');
});
app.post('/checkout', function checkout (req, res){
  var  payment_method_nonce = req.params.payment_method_nonce;
});
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is running on http://localhost:3000/');
});
