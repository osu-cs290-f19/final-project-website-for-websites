var path = require('path');
var express = require('express');
var exphbs = require('express-handlebars');

var app = express();
var port = process.env.PORT || 3000;

var validCategories =
{
  SearchEngines: true,
  Shoppingl: true,
  Games: true,
  SocialMedia: true,
  Educational: true,
  Interesting: false,
  StreamingSites: true,
  Wikis: false,
  Funny: false
}

var postDataArray = require('./postData');
//I need to figure out which things are selected, then require those files, and push the arrays I get from those onto postDataArray


app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

var i = 0;
var j = 0;

app.get('/', function(req, res){

  //var urlParams = new URLSearchParams(window.location.search);
  /*var keys = [];
  for(i in req.query)
  {
    keys.push(i.keys());
    if(i == true)

  }

  for (i in req.query)
  {
    req.query[i] == false;
    for(j in postDataArray)
    {
      if(postDataArray[j].category == keys[i])
        postDataArray.splice(j, 1);
    }
  }*/

  console.log("req.params = ", req.params);

  for(i in req.params)
  {
    /*conosle.log("req.params[i] = ", req.params[i]);
    conosle.log("req.params[i].key = ", req.params[i].key);
    conosle.log("req.params[i].value = ", req.params[i].value);
    conosle.log("validCategories.req.params[i].key = ", validCategories.req.params[i].key);
    conosle.log("validCategories.req.params[i].key.value = ", validCategories.req.params[i].key.value);*/
    if(req.params[i].value == true)
      validCategories.req.params[i].key = true;
    else
      validCategories.req.params[i].key = false;
  }

  //console.log("validCategories = ", validCategories);

  res.render('body', {
    showNavbar: true,
    showFilter: true,
    showModal: true,
    showCategModal: true,
    postDataKey: postDataArray
  });
});

app.get('/posts/:postID', function(req, res, next){
  var postID = req.params.postID;
  if(postDataArray[postID]){
    res.render('body',{
      showNavbar: false,
      showFilter: false,
      postDataKey: [postDataArray[postID]],
      showModal: false
    })
  }
  else {
    next();
  }
})


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
