var user = require('../user.js');

module.exports = {
  getName: function(req, res, next) {
    res.json({"name": user.name});
  },

  getLocation: function(req, res, next) {
    res.json({"location": user.location});
  },

  getOccupations: function(req, res, next) {
    var order = req.query.order;
    if (order) {
      if (order === 'desc') {
        res.json({"occupations": user.occupations.sort()});
      }
      else {
        res.json({"occupations": user.occupations.reverse()});
      }
    }
    res.json({"occupations": user.occupations});
  },

  getLatestOccupation: function(req, res, next) {
    var latest = user.occupations[user.occupations.length - 1];
    res.json({"latestOccupation": latest});
  },

  getHobbies: function(req, res, next) {
    res.json({"hobbies": user.hobbies});
  },

  getHobbiesType: function(req, res, next) {
    var hobbyType = req.params.type;
    var allHobbiesOfType = user.hobbies.filter(function(hobby) {
      return hobby.type === hobbyType;
    });
    res.json({"hobbies": allHobbiesOfType});
  },

  getFamily: function(req, res, next) {
    var relation = req.query.relation;
    if (relation) {
      var familyOfRelation = user.family.filter(function(family) {
        return family.relation === relation;
      });
      res.json({"family": familyOfRelation});
    }
    else {
      res.json({"family": user.family});
    }
  },

  getFamilyGender: function(req, res, next) {
    var gender = req.params.gender;
    var allOfGender = user.family.filter(function(family) {
      return family.gender === gender;
    });
    res.json({"family": allOfGender});
  },

  getRestaurants: function(req, res, next) {
    var rating = req.query.rating;
    var compareRating = '';
    var restaurantsWithRatingOf;
    if (rating.includes(':')) {
      compareRating = rating.split(':')[0];
      rating = Number(rating.split(':')[1]);
    }
    else {
      rating = Number(rating);
    }
    if (rating) {
      if (compareRating) {
        switch(compareRating) {
          case 'lt': restaurantsWithRatingOf = user.restaurants.filter(function(restaurant) {
            return restaurant.rating < rating;
          }); break;
          case 'lte': restaurantsWithRatingOf = user.restaurants.filter(function(restaurant) {
            return restaurant.rating <= rating;
          }); break;
          case 'gt': restaurantsWithRatingOf = user.restaurants.filter(function(restaurant) {
            return restaurant.rating > rating;
          }); break;
          case 'gte': restaurantsWithRatingOf = user.restaurants.filter(function(restaurant) {
            return restaurant.rating >= rating;
          }); break;
          default: return;
        }
      }
      else {
        var restaurantsWithRatingOf = user.restaurants.filter(function(restaurant) {
          return restaurant.rating === rating;
        });
      };
      res.json({"restaurants": restaurantsWithRatingOf});
    }
    else {
      res.json({"restaurants": user.restaurants});
    }
  },

  getRestaurantsName: function(req, res, next) {
    var restaurantName = req.params.name;
    if (restaurantName.includes('+')) {
      restaurantName = restaurantName.replace('+', ' ');
    }
    var allWithName = user.restaurants.filter(function(restaurant) {
      return restaurant.name.toLowerCase().includes(restaurantName.toLowerCase());
    });
    res.json({"restaurants": allWithName});
  },

  updateName: function(req, res, next) {
    var newName = req.body.name;
    user.name = newName;
    res.json({"name": user.name});
  },

  updateLocation: function(req, res, next) {
    var newLocation = req.body.location;
    user.location = newLocation;
    res.json({"location": user.location});
  },

  createHobby: function(req, res, next) {
    user.hobbies.push({"name": req.body.name, "type": req.body.type});
    res.json({"hobbies": user.hobbies});
  },

  createOccupation: function(req, res, next) {
    user.occupations.push(req.body.occupation);
    res.json({"occupations": user.occupations});
  },

  createFamily: function(req, res, next) {
    user.family.push({"name": req.body.name, "relation": req.body.relation, "gender": req.body.gender});
    res.json({"family": user.family});
  },

  createRestaurant: function(req, res, next) {
    user.restaurants.push({"name": req.body.name, "type": req.body.type, "rating": req.body.rating});
    res.json({"restaurants": user.restaurants});
  }
}
