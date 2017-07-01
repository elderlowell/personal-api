var express = require('express');
var bodyParser = require('body-parser');
var middleware = require('./controllers/middleware.js');
var mainCtrl = require('./controllers/mainCtrl.js');
var skillzCtrl = require('./controllers/skillzCtrl.js');
var secretsCtrl = require('./controllers/secretsCtrl.js');

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

app.put('/name', mainCtrl.updateName);
app.put('/location', mainCtrl.updateLocation);

app.post('/hobbies', mainCtrl.createHobby);
app.post('/occupations', mainCtrl.createOccupation);
app.post('/family', mainCtrl.createFamily);
app.post('/restaurants', mainCtrl.createRestaurant);

app.get('/skillz', skillzCtrl.getSkillz);
app.post('/skillz', middleware.generateId, skillzCtrl.createSkillz);

app.get('/secrets/:username/:pin', middleware.verifyUser, secretsCtrl.getSecrets);

app.listen(port, function() {
  console.log('Listening on port ' + port);
});
