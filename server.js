var path = require('path');
var express = require('express');
var exphbs = require('express-handlebars');

var app = express();
var port = process.env.PORT || 3000;

var validCategories =
{
  SearchEngines: true,
  Shopping: true,
  Games: true,
  SocialMedia: true,
  Educational: true,
  Interesting: true,
  StreamingSites: true,
  Wikis: true,
  Funny: true
}

var postDataArrayAll = require('./postData');
var postDataArray = [];
// for(i in postDataArrayAll)
//   postDataArray.push(postDataArrayAll[i]);//make a deep copy of postDataArrayAll
//I need to figure out which things are selected, then require those files, and push the arrays I get from those onto postDataArray


app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

var i = 0;
var j = 0;

app.get('/', function(req, res){

  //console.log("got a new request");
  postDataArray = [];//empty the array
  for(i in postDataArrayAll)
    postDataArray.push(postDataArrayAll[i]);//make a deep copy of postDataArrayAll
  //console.log("postDataArrayAll = ", postDataArrayAll);
  //console.log("postDataArray = ", postDataArray);

  //var thing;

  for(i in req.query)
  {
    /*conosle.log("req.params[i] = ", req.params[i]);
    conosle.log("req.params[i].key = ", req.params[i].key);
    conosle.log("req.params[i].value = ", req.params[i].value);
    conosle.log("validCategories.req.params[i].key = ", validCategories.req.params[i].key);
    conosle.log("validCategories.req.params[i].key.value = ", validCategories.req.params[i].key.value);*/
    //thing = req.query[i].key
    // console.log("i = ", i);
    // console.log("req.query[i] = ", req.query[i]);
    // //console.log("req.query[i].key = ", req.query[i].key);
    // console.log("validCategories.SearchEngines = ", validCategories.SearchEngines);
    // console.log("validCategories[i] = ", validCategories[i]);
    if(req.query[i] == 'true')
    {
      // console.log("req.query[i] = (should be true) ", req.query[i]);
      validCategories[i] = true;
    }
    else
    {
      // console.log("req.query[i] = (should be false)", req.query[i]);
      validCategories[i] = false;
    }
  }

  // console.log("validCategories = ", validCategories);
  // console.log("postDataArray[0] = ", postDataArray[0]);

  var thing2;
  for(i = postDataArray.length - 1; i > -1; i--)
  {
    // console.log("i = ", i);
    // console.log("postDataArray[i] = ", postDataArray[i]);
    // console.log("postDataArray[i].category = ", postDataArray[i].category);
    thing2 = postDataArray[i].category;
    //console.log("thing = ", thing);
    //console.log("validCategories = ", validCategories);
    // console.log("thing2 = ", thing2);
    // console.log("validCategories[thing2] = ", validCategories[thing2]);
    if(!validCategories[thing2])
    {
      // console.log("getting rid of current item");
      postDataArray.splice(i, 1);
    }
  }

  // console.log("postDataArray = ", postDataArray);

  res.render('body', {
    showNavbar: true,
    showFilter: true,
    showModal: true,
    showCategModal: true,
    postDataKey: postDataArray,

    SearchEngines: validCategories.SearchEngines,
    Shopping: validCategories.Shopping,
    Games: validCategories.Games,
    SocialMedia: validCategories.SocialMedia,
    Educational: validCategories.Educational,
    Interesting: validCategories.Interesting,
    StreamingSites: validCategories.StreamingSites,
    Wikis: validCategories.Wikis,
    Funny: validCategories.Funny
  });

  // console.log("postDataArray[0] = ", postDataArray[0]);
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
