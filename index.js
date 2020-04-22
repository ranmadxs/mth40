var express = require('express');
var app = express();

app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(process.env.PORT || 5001, function () {
  const port = process.env.PORT || 5001;
  console.log('Mth40-front app listening on port: '+port);
});

