var express = require('express');
var router = express.Router();

//Get Homepage
router.get('/users/: username', function(req, res ,next) {
  User.findOne ({ username : req.params.username} , function(err,user) {
    if (err) {  return next (err); }
      if (!user) { return next(404) ; }
	res.render("profile", { user:user});
});
});

module.exports = router;
