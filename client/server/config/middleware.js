var morgan      = require('morgan'), // used for logging incoming request
    bodyParser  = require('body-parser'),
    helpers     = require('./helpers.js'); // our custom middleware


module.exports = function (app, express) {
  // Express 4 allows us to use multiple routers with their own configurations
  var userRouter = express.Router();
  var projectsRouter = express.Router();

  //morgan is for logging get and post data to the console.
  app.use(morgan('dev'));
  //bodyParser is for processing body req information (e.g., req.body)
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  //serving all of the static files from the client directory
  app.use(express.static(__dirname + '/../../client'));

  //TODO change all the routers. 
  app.use('/api/users', userRouter); // use user router for all user request

  app.use('/api/projects', projectsRouter);

  // authentication middleware used to decode token and made available on the request
  //app.use('/api/links', helpers.decode);
  app.use(helpers.errorLogger);
  app.use(helpers.errorHandler);

  // inject our routers into their respective route files
  //TODO this will need to change to reflect our new routers
  require('../users/userRoutes.js')(userRouter);
  require('../projects/projectsRoutes.js')(projectsRouter);
};
