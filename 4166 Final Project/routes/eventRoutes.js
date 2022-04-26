const express = require('express');
const controller = require('../controllers/eventController');
const {isLoggedIn, isAuthor} = require('../middlewares/auth');
const {validateId} = require('../middlewares/validator');
const {validateEvent, validateResult} = require('../middlewares/validator');

const router = express.Router();

//GET /stories: send all stories to the user

router.get('/', controller.index);

//GET /stories/new: send html form for creating a new story

router.get('/newConnection', isLoggedIn, controller.new);

//POST /stories: create a new story

router.post('/', isLoggedIn, validateEvent, controller.create);

//GET /stories/:id: send details of story by id

router.get('/:id', validateId, controller.show);

//GET /stories/:id/edit: send html form for editing an exsiting story

router.get('/:id/edit', validateId, isLoggedIn, isAuthor, controller.edit);

//PUT /stories/:id update the story identified by id

router.put('/:id', validateId,  validateResult, isLoggedIn, isAuthor, controller.update);

//DELETE /stories/:id, delete the story identified by id

router.delete('/:id', validateId, isLoggedIn, isAuthor, controller.delete);


//RSVP routes

//POST /stories/:id/rsvp: send html form for rsvping to an event
router.post('/:id/rsvp', isLoggedIn, controller.rsvp);

//DELETE /stories/:id/rsvp: send html form for UNrsvping to an event
router.delete('/:id/rsvp', isLoggedIn, controller.deleteRsvp);


module.exports = router;
