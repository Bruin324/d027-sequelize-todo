const express = require('express');
const router = express.Router();
const models = require('../models');
const moment = require('moment');
moment().format();


router.get('/', async (request, response) => {
    var items = await models.Item.all({
        order: [['priority', 'ASC'], ['createdAt', 'DESC']],
    })
    response.render('todo-list', { Item: items });
});

router.get('/data', async (request, response) => {
    var results = await models.Item.all();
    response.json(result);
    });

router.post('/', async (request, response) => {
    await models.Item.create({
        name: request.body.listItem,
        priority: request.body.priority,
        isCompleted: false
    })
    response.redirect('/');
});

router.post('/complete', async (request, response) => {
    await models.Item.update({
        isCompleted: true,
        completedAt: moment().format("ddd, MMMM Do YYYY, h:mm a")
    }, {
            where: {
                id: request.body.complete
            }
        })
    response.redirect('/');
});

router.post('/delete', async (request, response) => {
    await models.Item.destroy({
        where: {
            id: request.body.delete
        }
    })
    response.redirect('/');
});

router.post('/del-complete', async (request, response) => {
    await models.Item.destroy({
        where: {
            isCompleted: true
        }
    })
    response.redirect('/');
});

module.exports = router;