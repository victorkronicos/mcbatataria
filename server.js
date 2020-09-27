var express = require('express');
var path = require('path');
var app = express();

// view engine setup
app.set("views", path.join(__dirname, "src"));
app.set("view engine", "ejs");
app.use( express.static( "public" ));

app.get('/em-construcao', function (req, res) {
    res.sendFile('index.html', {root: __dirname })
  });

app.get('/', function (req, res) {
  res.render('view/index')
});

app.listen(3000);