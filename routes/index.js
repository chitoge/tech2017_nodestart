var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  username: String,
  email: String
}, { collection: 'usercollection' });

var User = mongoose.model('User', UserSchema);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET Hello World page. */
router.get('/helloworld', function(req, res) {
  res.render('helloworld', { title: 'Hello, World!' });
});

/* GET Userlist page. */
router.get('/userlist', function(req, res) {
  User.find((err, docs) => {
  	if (err) res.send(err);

  	res.render('userlist', {"userlist": docs});
  });
});

/* GET New User page. */
router.get('/newuser', function(req, res) {
  res.render('newuser', { title: 'Add New User' });
});

/* POST to Add User Service */
router.post('/adduser', function(req, res) {
  // Get our form values. These rely on the "name" attributes
  var userName = req.body.username;
  var userEmail = req.body.useremail;

  // Submit to the DB
  User.create({username: userName, email: userEmail}, (err, user) => {
  	if (err) {
      // If it failed, return error
      res.send("There was a problem adding the information to the database.");
    }
    else {
      // And forward to success page
      res.redirect("userlist");
    }
  });
});

module.exports = router;
