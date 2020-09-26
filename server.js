var express = require('express');
var path = require('path');
var app = express();


app.use("/public", express.static(path.join(__dirname, 'public')));

app.get('/em-construcao', function (req, res) {
    res.sendFile('index.html', {root: __dirname })
  });

  app.get('/', function (req, res) {
    res.sendFile('index.html', {root: __dirname })
  });


app.listen(3000);