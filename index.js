var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send('Hello World NodeJS!');
});

app.listen(process.env.PORT || 3100, function () {
  const portL = process.env.PORT || 3100;
  console.log('Example app listening on port ' + portL);
});
