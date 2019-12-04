var path = require('path');
var express = require('express');
var exphbs = require('express-handlebars'); 

var app = express();
var port = process.env.PORT || 3000;

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.get('/', function(req, res){
  res.render('body', {
  });
});

app.use(express.static('public'));

app.get('*', function (req, res) {
  res.status(404).render('404');
});

app.listen(port, function () {
  console.log("== Server is listening on port", port);
});
