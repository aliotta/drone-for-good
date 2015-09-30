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
    
    var username  = req.body.username,
        password  = req.body.password,
        email = req.body.email,
        location = req.body.location,
        firstName = req.body.firstName,
        lastName = req.body.lastName,
        phoneNumber = req.body.phoneNumber,
        userType = req.body.userType,
        create,
        newUser;
    console.log("there")
    var findOne = Q.nbind(User.findOne, User);

    // check to see if user already exists
    findOne({username: username})
      .then(function (user) {
        console.log(user, "USEERRR")
        if (user) {
          next(new Error('User already exist!'));
        } else {
          // make a new user if not one
          create = Q.nbind(User.create, User);
          newUser = {
            username: username,
            password: password,
            email: email,
            location: location,
            firstName: firstName,
            phoneNumber: phoneNumber,
            userType: userType
          };
          console.log("Before create:" , newUser)
          return create(newUser)
          

        }
      })
      .then(function (user) {
        console.log(user, "in second then")
        // create token to send back for auth
        var token = jwt.encode(user, 'secret');
        res.json({token: token});
        
        //res.send("test")
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
    console.log(token, "toknenenen")
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
  }
};
