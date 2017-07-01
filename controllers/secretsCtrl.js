var secrets = require('../secrets.js');

module.exports = {
  getSecrets: function(req, res, next) {
    res.json({secrets});
  }
}
