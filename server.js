const express = require('express');
const compression = require('compression');
const path = require('path');
const app = express();

// GZIP
app.use(compression());

// Forçar HTTPS
app.use((req, res, next) => {  
  if ((req.headers["x-forwarded-proto"] || "").endsWith("http")) 
      res.redirect(`https://${req.headers.host}${req.url}`); 
  else
      next(); 
});

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