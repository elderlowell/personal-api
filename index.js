var express = require('express');
var bodyParser = require('body-parser');
var middleware = require('./controllers/middleware.js');
var mainCtrl = require('./controllers/mainCtrl.js');

var port = 8080;

var app = express();

app.use(bodyParser.json());
app.use(middleware.addHeaders);

app.get('/name', mainCtrl.getName);

app.get('/location', mainCtrl.getLocation);

app.get('/occupations', mainCtrl.getOccupations);

app.get('/occupations/latest', mainCtrl.getLatestOccupation);

app.get('/hobbies', mainCtrl.getHobbies);

app.get('/hobbies/:type', mainCtrl.getHobbiesType);

app.get('/family', mainCtrl.getFamily);

app.get('/family/:gender', mainCtrl.getFamilyGender);

app.get('/restaurants', mainCtrl.getRestaurants);

app.get('/restaurants/:name', mainCtrl.getRestaurantsName);

app.listen(port, function() {
  console.log('Listening on port ' + port);
});
