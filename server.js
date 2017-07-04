console.log('application started')
const express = require('express');
const models = require('./models');
const mustache = require('mustache-express');
const bodyParser = require('body-parser');
const sequelize = require('sequelize');
const moment = require('moment');
moment().format();

const todoController = require('./routes/todo-controller');
const editController = require('./routes/edit-controller');

const application = express();

application.engine('mustache', mustache());
application.set('views', './views');
application.set('view engine', 'mustache');


application.use('/public', express.static('./public'));
application.use(bodyParser.urlencoded());

application.use(todoController);
application.use(editController);




application.listen(3000);