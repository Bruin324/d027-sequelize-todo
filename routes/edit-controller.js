const express = require('express');
const router = express.Router();
const models = require('../models');


router.get('/edit/:id', async (request, response) => {
    var item = await models.Item.find({
        where: {
            id: request.params.id
        }
    });
    response.render('edit-todo', { item: item });
});

router.post('/edit/:id', async (request, response) => {
    var id = request.params.id
    await models.Item.update({
        name: request.body.listItem,
        priority: request.body.priority,
    }, {
            where: {
                id: id
            }
        })
        response.redirect('/');
});

module.exports = router;