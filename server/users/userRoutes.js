var userController = require('./userController.js');


module.exports = function (app) {
  // app === userRouter injected from middlware.js

  //TODO Make sure this naming convention works
  app.post('/signin', function(req, res){
    userController.signin(req);
  });
  app.post('/signup', function(req, res){
    //console.log(req.body, " in userRoutes");
    userController.signup(req);
  });
  app.get('/signedin', function(req, res){
    userController.checkAuth();
  });
};
