const express = require('express');
const mustache = require('mustache-express');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const jsonfile = require('jsonfile')
const list = require('./public/todos.json')
const file = './public/todos.json'
const fs = require('file-system');



const application = express();

application.engine('mustache', mustache());
application.set('views', './views');
application.set('view engine', 'mustache');

application.use(express.static(__dirname + '/public'))
application.use(bodyParser.urlencoded());
application.use(expressValidator());



application.get('/', (request, response) => {
    response.render('todo-list', {list: list});
});

application.post('/', (request, response) => {
    var listItem = { name: request.body.listItem, checked: false};
    list.push(listItem);
    var todoJSON = JSON.stringify(list);
    fs.writeFile(file, todoJSON, function(err) {});
    response.render('todo-list', {list: list});
    
});

application.post('/:name', (request, response) => {
    var itemIndex = list.findIndex(list => list.name === request.params.name);
    list[itemIndex].checked = true;    
    var todoJSON = JSON.stringify(list);
    fs.writeFile(file, todoJSON, function(err) {});
    response.render('todo-list', {list: list});
});

application.listen(3000);

console.log('application started');