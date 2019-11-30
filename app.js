var express = require('express');
var path = require('path');
var app = express();
var fs = require('fs');
session = require('express-session');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  key: 'user',
  secret:'thebag',
  saveUninitialized: false,
  resave: false,
  cookie: {
    expires: 600000
  }
 }));

//_________________________________________________________________________
app.get('/', function (req, res) {
  res.render('login', { title: 'Express' });
});
app.post('/', function (req, res) {
  req.session.username = req.body.username;
  var psd = req.body.password;
  var myObj = {username: req.session.username, password: psd};
  let bufferedData = fs.readFileSync('userdata.json')
  var theArray = JSON.parse(bufferedData);
  console.log(theArray)
  var flag = false;
  for (i = 0; i < theArray.length; i++) {
    if (theArray[i].username == req.session.username && theArray[i].password==psd) {
      flag = true;
    }
  }

  if(req.session.username != "" && psd != ""){
  if (flag){
    res.redirect('/home')
  }
  else{
 
  res.send("the credentials entered are invalid");
  }
}
else {
  res.send("you must fill both fields to login")
}
  

});

//___________________________________________________________________________

app.get('/registration', function (req, res) {
  res.render('registration', { title: 'Express' });
});

app.post('/register', function (req, res) {
  var user = req.body.username;
  var psd = req.body.password;
  var myObj1 = {username: user, movies: []};
  let bufferedData1 = fs.readFileSync('watchlist.json')
  var theArray1 = JSON.parse(bufferedData1);
  var myObj = {username: user, password: psd};
  let bufferedData = fs.readFileSync('userdata.json')
  var theArray = JSON.parse(bufferedData);
  console.log(theArray)
  var flag = false;
  for (i = 0; i < theArray.length; i++) {
    if (theArray[i].username == user) {
      flag = true;
    }
  }

  if(user != "" && psd != ""){
  if (flag){
    res.send("username already exists");
  }
  else{
  theArray.push(myObj);
  var x = JSON.stringify(theArray)
  fs.writeFileSync('userdata.json', x);
  theArray1.push(myObj1);
  var x1 = JSON.stringify(theArray1)
  fs.writeFileSync('watchlist.json', x1);
  res.send("registration succesful");
  }
}
else {
  res.send("you must fill both fields to register")
}
  

}
);

app.get('/action', function (req, res) {
  res.render('action');
});

app.post('/action', function (reg, res) {
  res.send("don't post here");
});

app.get('/conjuring', function (req, res) {
  res.render('conjuring');
});

app.post('/conjuring', function (reg, res) {
  res.send("don't post here");
});
app.get('/darkknight', function (req, res) {
  res.render('darkknight');
});

app.post('/darkknight', function (reg, res) {
  res.send("don't post here");
});
app.get('/drama', function (req, res) {
  res.render('drama');
});

app.post('/drama', function (reg, res) {
  res.send("don't post here");
});
app.get('/fightclub', function (req, res) {
  res.render('fightclub');
});

app.post('/fightclub', function (reg, res) {
  res.send("don't post here");
});
app.get('/godfather', function (req, res) {
  res.render('godfather');
});

app.post('/godfather', function (reg, res) {
  res.send("don't post here");
});
app.get('/godfather2', function (req, res) {
  res.render('godfather2');
});

app.post('/godfather2', function (reg, res) {
  res.send("don't post here");
});
app.get('/home', function (req, res) {
  res.render('home');
});

app.post('/home', function (reg, res) {
  print(user);
  res.send("home");
});
app.get('/horror', function (req, res) {
  res.render('horror');
});

app.post('/horror', function (reg, res) {
  res.send("don't post here");
});
app.get('/login', function (req, res) {
  res.render('login', { title: 'Express' });
});

app.post('/login', function (req, res) {
  req.session.username = req.body.username;
  var psd = req.body.password;
  var myObj = {username: req.session.username, password: psd};
  let bufferedData = fs.readFileSync('userdata.json')
  var theArray = JSON.parse(bufferedData);
  console.log(theArray)
  var flag = false;
  for (i = 0; i < theArray.length; i++) {
    if (theArray[i].username == req.session.username && theArray[i].password==psd) {
      flag = true;
    }
  }

  if(req.session.username != "" && psd != ""){
  if (flag){
    res.redirect('/home')
  }
  else{
 
  res.send("the credentials entered are invalid");
  }
}
else {
  res.send("you must fill both fields to login")
}
  

}
);
app.get('/scream', function (req, res) {
  res.render('scream');
});

app.post('/scream', function (reg, res) {
  res.send("don't post here");
});
app.get('/searchresults', function (req, res) {
  res.render('searchresults');
});

app.post('/searchresults', function (reg, res) {
  res.render('searchresults');
});

  
app.get('/watchlist', function (req, res) {
  let bufferedData3 = fs.readFileSync('watchlist.json');
  var theArray3 = JSON.parse(bufferedData3);
  var watchlist = [];
  for(i = 0; i<theArray3.length; i++){
   if(req.session.username == theArray3[i].username){
     console.log(req.session.username);
      for(j = 0; j<theArray3[i].movies.length; j++){
        watchlist.push(theArray3[i].movies[j])
      }
    }
  }

  console.log(watchlist);
  res.render('watchlist', {
                 tasks: watchlist
                });
 
});

app.post('/watchlist', function (reg, res) {
  

res.redirect('/watchlist');
 
});

app.post('/addmovie/scream', function(req,res){
  console.log("in1");
  let bufferedData2 = fs.readFileSync('watchlist.json')
  var theArray2 = JSON.parse(bufferedData2);
  flag2 = false;
  e = 0;
  for(i = 0; i<theArray2.length;i++){
    console.log(req.session.username);
    console.log(theArray2[i].movies.length);
    if(theArray2[i].username == req.session.username){
     
    for(j = 0; j<theArray2[i].movies.length;j++){
    if(theArray2[i].movies[j] == 'scream'){
    flag2 = true;
    }
    }
  }
  e = i;
}
  if(flag2){
  res.send("the movie is already in your watchlist");
  console.log("ina");
  
  }else{
  console.log("in");
  theArray2[e].movies.push('scream');
  var x1 = JSON.stringify(theArray2);
  res.send("the movie has been added to your watchlist!!!!!");
  fs.writeFileSync('watchlist.json', x1);
  
}

});
app.post('/addmovie/conjuring', function(req,res){
  console.log("in1");
  let bufferedData2 = fs.readFileSync('watchlist.json')
  var theArray2 = JSON.parse(bufferedData2);
  flag2 = false;
  e = 0;
  for(i = 0; i<theArray2.length;i++){
    console.log(req.session.username);
    console.log(theArray2[i].movies.length);
    if(theArray2[i].username == req.session.username){
     
    for(j = 0; j<theArray2[i].movies.length;j++){
    if(theArray2[i].movies[j] == 'conjuring'){
    flag2 = true;
    }
    }
  }
  e = i;
}
  if(flag2){
  res.send("the movie is already in your watchlist");
  console.log("ina");
  
  }else{
  console.log("in");
  theArray2[e].movies.push('conjuring');
  var x1 = JSON.stringify(theArray2);
  res.send("the movie has been added to your watchlist!!!!!");
  fs.writeFileSync('watchlist.json', x1);
  
}

});
app.post('/addmovie/darkknight', function(req,res){
  console.log("in1");
  let bufferedData2 = fs.readFileSync('watchlist.json')
  var theArray2 = JSON.parse(bufferedData2);
  flag2 = false;
  e = 0;
  for(i = 0; i<theArray2.length;i++){
    console.log(req.session.username);
    console.log(theArray2[i].movies.length);
    if(theArray2[i].username == req.session.username){
     
    for(j = 0; j<theArray2[i].movies.length;j++){
    if(theArray2[i].movies[j] == 'darkknight'){
    flag2 = true;
    }
    }
  }
  e = i;
}
  if(flag2){
  res.send("the movie is already in your watchlist");
  console.log("ina");
  
  }else{
  console.log("in");
  theArray2[e].movies.push('darkknight');
  var x1 = JSON.stringify(theArray2);
  res.send("the movie has been added to your watchlist!!!!!");
  fs.writeFileSync('watchlist.json', x1);
  
}

}
 
);
app.post('/addmovie/fightclub', function(req,res){
  console.log("in1");
  let bufferedData2 = fs.readFileSync('watchlist.json')
  var theArray2 = JSON.parse(bufferedData2);
  flag2 = false;
  e = 0;
  for(i = 0; i<theArray2.length;i++){
    console.log(req.session.username);
    console.log(theArray2[i].movies.length);
    if(theArray2[i].username == req.session.username){
     
    for(j = 0; j<theArray2[i].movies.length;j++){
    if(theArray2[i].movies[j] == 'fightclub'){
    flag2 = true;
    }
    }
  }
  e = i;
}
  if(flag2){
  res.send("the movie is already in your watchlist");
  console.log("ina");
  
  }else{
  console.log("in");
  theArray2[e].movies.push('fightclub');
  var x1 = JSON.stringify(theArray2);
  res.send("the movie has been added to your watchlist!!!!!");
  fs.writeFileSync('watchlist.json', x1);
  
}

});
app.post('/addmovie/godfather', function(req,res){
  console.log("in1");
  let bufferedData2 = fs.readFileSync('watchlist.json')
  var theArray2 = JSON.parse(bufferedData2);
  flag2 = false;
  e = 0;
  for(i = 0; i<theArray2.length;i++){
    console.log(req.session.username);
    console.log(theArray2[i].movies.length);
    if(theArray2[i].username == req.session.username){
     
    for(j = 0; j<theArray2[i].movies.length;j++){
    if(theArray2[i].movies[j] == 'godfather'){
    flag2 = true;
    }
    }
  }
  e = i;
}
  if(flag2){
  res.send("the movie is already in your watchlist");
  console.log("ina");
  
  }else{
  console.log("in");
  theArray2[e].movies.push('godfather');
  var x1 = JSON.stringify(theArray2);
  res.send("the movie has been added to your watchlist!!!!!");
  fs.writeFileSync('watchlist.json', x1);
  
}

});
app.post('/addmovie/godfather2', function(req,res){
  console.log("in1");
  let bufferedData2 = fs.readFileSync('watchlist.json')
  var theArray2 = JSON.parse(bufferedData2);
  flag2 = false;
  e = 0;
  for(i = 0; i<theArray2.length;i++){
    console.log(req.session.username);
    console.log(theArray2[i].movies.length);
    if(theArray2[i].username == req.session.username){
     
    for(j = 0; j<theArray2[i].movies.length;j++){
    if(theArray2[i].movies[j] == 'godfather2'){
    flag2 = true;
    }
    }
  }
  e = i;
}
  if(flag2){
  res.send("the movie is already in your watchlist");
  console.log("ina");
  
  }else{
  console.log("in");
  theArray2[e].movies.push('godfather2');
  var x1 = JSON.stringify(theArray2);
  res.send("the movie has been added to your watchlist!!!!!");
  fs.writeFileSync('watchlist.json', x1);
  
}

});
app.post('/search', function(req, res){
var srch = req.body.Search;
let bufferedData2 = fs.readFileSync('movielist.json')
var movies = JSON.parse(bufferedData2);
var results = [];
for(i = 0; i<movies.length; i++){
  if(movies[i].toLowerCase().includes(srch)){
    results.push(movies[i]);
  }
}


if(results != [])
res.render('searchresults',{tasks:results})
else
  res.send("Movie not found");

});
app.listen(3000);