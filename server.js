var express = require('express');
var app = express();
app.get('/', function homepage (req, res) {
  res.sendFile(__dirname + '/index.html');
});
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is running on http://localhost:3000/');
});
