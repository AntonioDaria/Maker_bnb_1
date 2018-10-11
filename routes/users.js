var express = require('express');
var router = express.Router();

/* GET spacelist. */
router.get('/spaceList', function(req, res) {
  var db = req.db;
  var collection = db.get('spaceList');
  collection.find({},{},function(e,docs){
    res.json(docs);
  });
});

/* POST to addspaces. */
router.post('/addspace', function(req, res) {
  var db = req.db;
  var collection = db.get('spaceList');
  collection.insert(req.body, function(err, result){
    res.send(
      (err === null) ? { msg: '' } : { msg: err }
    );
  });
});

module.exports = router;
