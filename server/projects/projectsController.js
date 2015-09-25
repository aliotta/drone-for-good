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
          next(new Error('Project name in use already!'));
        } else {
          // make a new user if not one
          create = Q.nbind(Project.create, Project);
          project = {
            location: req.body.location,
            latitude: req.body.latitude,
            longitude: req.body.longitude,
            description: req.body.description,
            expirationDate: req.body.expirationDate,
            title: req.body.title,
            seeker: req.body.seeker,
            pilot: req.body.pilot
          }
          return create(project);
        }
      })
      .then(function (createdProject) {
        if(createProject){
          // respond with json data of new user project.
          res.json(createdProject);
        }
      })
      .fail(function (error) {
        next(error);
      });    

    // // invoke createProject with user data.
    // createProject(project)
    //   
    //   .fail(function (err) {
    //     next(err);
    //   });

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
