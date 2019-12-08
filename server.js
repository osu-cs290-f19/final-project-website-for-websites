var path = require('path');
var express = require('express');
var exphbs = require('express-handlebars');

var app = express();
var port = process.env.PORT || 3000;

var postDataArray = require('./postData');
//I need to figure out which things are selected, then require those files, and push the arrays I get from those onto postDataArray


app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.get('/', function(req, res){
  res.render('body', {
    showNavbar: true,
    showFilter: true,
    showModal: true,
    postDataKey: postDataArray
  });
});

/*app.get('/google', function(req, res){
  res.render('google', {
    showNavbar: true,
    showFilter: false,
    showModal: false
  })
});

app.get('/youtube', function(req, res){
  res.render('youtube', {
    showNavbar: true,
    showFilter: false,
    showModal: false
  })
});

app.get('/twitch', function(req, res){
  res.render('twitch', {
    showNavbar: true,
    showFilter: false,
    showModal: false
  })
});

app.get('/facebook', function(req, res){
  res.render('facebook', {
    showNavbar: true,
    showFilter: false,
    showModal: false
  })
});

app.get('/moon', function(req, res){
  res.render('moon', {
    showNavbar: false,
    showFilter: false,
    showModal: false
  })
});

app.get('/zen', function(req, res){
  res.render('zen', {
    showNavbar: false,
    showFilter: false,
    showModal: false
  })
});

app.get('/skywalker', function(req, res){
  res.render('skywalker', {
    showNavbar: false,
    showFilter: false,
    showModal: false
  })
});*/

app.use(express.static('public'));

app.get('*', function (req, res) {
  res.status(404).render('404');
});

app.listen(port, function () {
  console.log("== Server is listening on port", port);
});
