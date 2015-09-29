var projectsController = require('./projectsController.js');

module.exports = function (app) {
  // app === linkRouter injected from middleware.js

  // app.param will hijack any request with a 'code' parameter
  // like line 16 below. That code will actually be the shortned url
  // so the real URL will be pre fetched from mongo and attached to
  // req.navLink before it reaches line 16.

  // app.param('code', linksController.findUrl);



  // app.route('/openProjects')
  //   .get(projectController.);

  app.post('/api/projects', function(req, res){
    console.log(req.body, " inside routes for projects long line help!");
    projectsController.newProject(req);
  });
  app.get('/api/projects', function(req, res){
    projectsController.newProject(req);
  });
  app.get('/api/project:id', function(req, res){
    projectsController.findProject(req);
  });

  // app.get('/:code', projectController.navToProject);

};
