var projectsController = require('./projectsController.js');

module.exports = function (app) {
  // app === linkRouter injected from middleware.js

  // app.param will hijack any request with a 'code' parameter
  // like line 16 below. That code will actually be the shortned url
  // so the real URL will be pre fetched from mongo and attached to
  // req.navLink before it reaches line 16.

  // app.param('code', linksController.findUrl);


  app.get('/projects', projectsController.allProjects);

<<<<<<< HEAD
  app.post('/projects', projectsController.newProject);

 
  // app.get('/:code', projectController.navToProject);
=======
  // app.route('/openProjects')
  //   .get(projectController.);

//the routes here build off of the routes defined in services.js in the client side.
//If we have "/projects" here, then we have "/projects/projects" in Paws for this to show up.
//Routes are injected in middleware.js
  app.post('/', function(req, res){
    projectsController.newProject(req, res);
  });

  app.get('/', function(req, res){
    projectsController.allProjects(req, res);
  });

  app.get('/:id', function(req, res){
    projectsController.findProject(req, res);
  });
>>>>>>> d236959f17b5d880b21d220539f10f3813762d99

};
