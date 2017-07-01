var skillz = require('../skillz.js');

module.exports = {
  getSkillz: function(req, res, next) {
    var experience = req.query.experience;
    if (experience) {
      var skillzOfExperienceType = skillz.skillzList.filter(function(skill) {
        return skill.experience.toLowerCase() === experience;
      });
      res.json({"skillz": skillzOfExperienceType});
    }
    else {
      res.json({"skillz": skillz.skillzList});
    }
  },

  createSkillz: function(req, res, next) {
    var newSkill = {
      "id": req.body.id,
      "name": req.body.name,
      "experience": req.body.experience
    };
    skillz.skillzList.push(newSkill);
    res.json({"skillz": skillz.skillzList});
  }
}
