var User = require('./userModel.js'),
    Q    = require('q'),
    jwt  = require('jwt-simple');

module.exports = {
  signin: function (req, res, next) {
    var username = req.body.username,
        password = req.body.password;

    var findUser = Q.nbind(User.findOne, User);
    findUser({username: username})
      .then(function (user) {
        if (!user) {
          next(new Error('User does not exist'));
        } else {
          return user.comparePasswords(password)
            .then(function(foundUser) {
              if (foundUser) {
                var token = jwt.encode(user, 'secret');
                res.json({token: token});
              } else {
                return next(new Error('No user'));
              }
            });
        }
      })
      .fail(function (error) {
        next(error);
      });
  },

  signup: function (req, res, next) {
    console.log("~~~~~are you a seeker?~~~~~", req.body);
    var username  = req.body.username,
        password  = req.body.password,
        location = req.body.location,
        firstName = req.body.firstName,
        lastName = req.body.lastName,
        emailAddress = req.body.emailAddress,
        userType = req.body.userType,
        create,
        newUser;
    var findOne = Q.nbind(User.findOne, User);


    // check to see if user already exists
    findOne({username: username})
      .then(function(user) {
        if (user) {
          next(new Error('User already exist!'));
        } else {
          // make a new user if not one
          create = Q.nbind(User.create, User);
          newUser = {
            username: username,
            password: password,
            location: location,
            firstName: firstName,
            lastName: lastName,
            emailAddress: emailAddress,
            userType: userType
          };
          return create(newUser)
        }
      })
      .then(function (user) {
        // create token to send back for auth
        var token = jwt.encode(user, 'secret');
        res.json({token: token});
      }, function(){console.log("rejected Promise")})
      .fail(function (error) {
        next(error);
      });
  },

  checkAuth: function (req, res, next) {
    // checking to see if the user is authenticated
    // grab the token in the header is any
    // then decode the token, which we end up being the user object
    // check to see if that user exists in the database
    var token = req.headers['x-access-token'];
    console.log(token, ": is our token");
    if (!token) {
      next(new Error('No token'));
    } else {
      console.log("corrct path")
      var user = jwt.decode(token, 'secret');
      var findUser = Q.nbind(User.findOne, User);
      findUser({username: user.username})
        .then(function (foundUser) {
          if (foundUser) {
            res.send(200);
          } else {
            res.send(401);
          }
        })
        .fail(function (error) {
          next(error);
        });
    }
  },

  getUser: function(req, res, next, username) {
    var findUser = Q.nbind(User.findOne, User);
    findUser({username: username})
    .then(function(user) {
      //return searched-for user, if successful
      res.json(user);
    })
    .fail(function(err) {
      next(err);
    });
  }
};
