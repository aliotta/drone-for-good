var userController = require('./userController.js');


module.exports = function (app) {
  // app === userRouter injected from middlware.js

  app.post('/signin', userController.signin);
  app.post('/signup', function(req, res){
    console.log("in sign up")
    userController.signup(req, res);
  });
  app.get('/user/:code', function(req, res){
    console.log("in user get");

  })
  //TODO Make sure this naming convention works
  app.get('/signedin', function(req, res){
    userController.checkAuth(req, res)
  });
};
