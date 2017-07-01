module.exports = {
  addHeaders: function(req, res, next) {
    res.status(200).set ({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'OPTIONS, GET, POST, PUT',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
      'X-XSS-Protection': '1; mode=block',
      'X-Frame-Options': 'SAMEORIGIN',
      'Content-Security-Policy': "default-src 'self' devmountain.github.io"
    });

    next();
  },

  generateId: function(req, res, next) {
    var skillz = require('../skillz.js');
    var newId = skillz.skillzList.length;
    req.body.id = ++newId;

    next();
  },

  verifyUser: function(req, res, next) {
    var username = req.params.username.toLowerCase();
    var pin = req.params.pin;

    if (username !== "jonathan") {
      res.status(403).json({"message": "That username was not found."});
    }
    else if (pin !== "joke") {
      res.status(403).json({"message": "That pin was not found."});
    }
    else {
      next();
    }
  }
}
