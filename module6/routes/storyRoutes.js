const express = require('express');

const controller = require('../controllers/storyController');

const router = express.Router();

//GET /stories: send all stories to client

router.get('/', controller.index);

//GET /stories/new: send html form for creating a new story

router.get('/new', controller.new);

//POST /stories: create a new story

router.post('/', controller.create);

//GET /stories/:id: send details of story identified by ID

router.get('/:id', controller.show);

//GET /stories/:id/edit: send html form for editing story identified by ID
router.get('/:id/edit', controller.edit);

//PUT /stories/:id: update story identified by ID
router.put('/:id', controller.update);

//DELETE /stories/:id: delete story identified by ID
router.delete('/:id', controller.delete);

module.exports = router;