const express = require('express');
const controller = require('../controllers/eventController');
const {isLoggedIn, isAuthor, isNotAuthor} = require('../middlewares/auth');
const {validateId, validateRsvp} = require('../middlewares/validator');
const {validateEvent, validateResult} = require('../middlewares/validator');

const router = express.Router();

//GET /stories: send all stories to the user

router.get('/', controller.index);

//GET /stories/new: send html form for creating a new story

router.get('/newConnection', isLoggedIn, controller.new);

//POST /stories: create a new story
//CHECK THIS - validateResult/validateEvent breaks the code
router.post('/', isLoggedIn, validateEvent, validateResult, controller.create);

//GET /stories/:id: send details of story by id

router.get('/:id', validateId, controller.show);

//GET /stories/:id/edit: send html form for editing an exciting story

router.get('/:id/edit', validateId, isLoggedIn, isAuthor, controller.edit);

//PUT /stories/:id update the story identified by id
//CHECK THIS - validateResult/validateEvent breaks the code
router.put('/:id', validateId, validateEvent, validateResult,  isLoggedIn, isAuthor, controller.update);

//DELETE /stories/:id, delete the story identified by id

router.delete('/:id', validateId, isLoggedIn, isAuthor, controller.delete);


//RSVP routes

//POST /stories/:id/rsvp: send html form for rsvping to an event
router.post('/:id/rsvp', isLoggedIn, isNotAuthor, validateRsvp, validateResult, controller.rsvp);

//DELETE /stories/:id/rsvp: send html form for UNrsvping to an event
router.delete('/:id/rsvp', isLoggedIn, controller.deleteRsvp);


module.exports = router;
