var Project = require('./projectModel.js'),
    Q       = require('q'),
    util    = require('../config/utils.js');


module.exports = {

  // Initializes new project with submitted data from user  
  newProject: function(req, res, next){
    var project = {
      location: req.body.location,
      latitude: req.body.latitude,
      longitude: req.body.longitude,
      description: req.body.description,
      expirationDate: req.body.expirationDate,
      title: req.body.title,
      seeker: req.body.seeker,
      pilot: req.body.pilot
    }

    // Permisifies with Q so we can use .then method rather than callbacks.
    var createProject = Q.nbind(Project.create, Project);

    // invoke createProject with user data.
    createProject(project)
      .then(function (createdProject) {
        if(createProject){
          // respond with json data of new user project.
          res.json(createdProject);
        }
      })
      .fail(function (err) {
        next(err);
      });

  },

  // finds a unique project by ID.
  findProject: function (req, res, next, projectId) {
    var findProject = Q.nbind(Project.findOne, Project);
    findProject({_id: projectId})
      .then(function (project) {
        // returns searched for project if successful.
        res.json(project);
      })
      .fail(function (error) {
        next(error);
      });
  },

  allProjects: function (req, res, next) {
    var findAll = Q.nbind(Project.find, Project);
    // finds all projects in total.
    findAll({})
      .then(function (projects) {
        res.json(projects);
      })
      .fail(function (error) {
        next(error);
      });
  }
  //TODO add create new project and get all open projects

};
