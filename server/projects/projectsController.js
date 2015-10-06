var Project = require('./projectsModel.js'),
    Q       = require('q'),
    util    = require('../config/utils.js');


module.exports = {

  // Initializes new project with submitted data from user
  newProject: function(req, res, next){
    var title = req.body.title;
    // Permisifies with Q so we can use .then method rather than callbacks.
    var findOne = Q.nbind(Project.findOne, Project);

    findOne({title: title})
      .then(function(project) {
        if (project) {
          console.log("in error block")
          next(new Error('Project name in use already!'));
        } else {
          // make a new user if not one
          create = Q.nbind(Project.create, Project);
          project = new Project({
            location: req.body.location,
            latitude: req.body.latitude,
            longitude: req.body.longitude,
            description: req.body.description,
            expirationDate: req.body.expirationDate,
            title: req.body.title,
            creator: req.body.username,
            contactEmailAddress: req.body.emailAddress
          });
          return create(project);
        }
      })
      .then(function (createdProject) {
        if(createdProject){
          console.log("Project Created")
          // respond with json data of new user project.
          res.json(createdProject);
        }
      })
      .fail(function (error) {
        console.log(error, " failed trying to create a project ");
        next(error);
      });
  },

  // finds a unique project by ID.
  findProject: function (req, res, next, projectId) {
    var findProject = Q.nbind(Project.findOne, Project);
    findProject({ObjectID: projectId})
      .then(function (project) {

        // returns searched for project if successful.
        res.json(project);
      })
      .fail(function (error) {
        console.log("Failed trying to find a project: ", error)
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
        console.log("failed trying to find all projects: ", error)
        next(error);
      });
  }
};
