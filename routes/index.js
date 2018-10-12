var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'MakersBnB' });
});

router.get('/signup', function(req, res) {
  res.render('signup', { title: 'Add New User' });
});

// router.post('/', function(req, res, next) {
//   // save to Database
//   res.redirect('/profile', { title: 'Mfe' });
// });


router.get('/profile', function(req, res, next) {
  res.render('profile', { title1: 'Mfe' });
});



module.exports = router;
