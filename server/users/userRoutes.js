var userController = require('./userController.js');


module.exports = function (app) {
  // app === userRouter injected from middlware.js

  app.post('/signin', userController.signin);
  app.post('/signup', function(req, res){
    console.log("in sign up")
    userController.signup(req, res);
  });
  //TODO Make sure this naming convention works
  app.get('/signedin', function(req, res){
    userController.checkAuth(req, res)
  })
  //TODO Make sure this naming convention works
  app.post('/signin', function(req, res){
    userController.signin(req, res);
  });
  app.post('/signup', function(req, res){
    //console.log(req.body, " in userRoutes");
    userController.signup(req, res);
  });
  app.get('/signedin', function(req, res){
    userController.checkAuth(req, res);
  });
  app.get('/:username', function(req, res){
    // console.log(req.url.slice(0), "~~~~~~~~~~~~~~~~~req.url.slice(0)~~");
    // console.log(req.url, "~~~~~~req.url~~~~~~~~");
    userController.getUser(req, res, null, req.url.slice(1));
  });
}
