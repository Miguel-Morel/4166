const {body} = require('express-validator');
const {validationResult} = require('express-validator');

exports.validateId = (req, res, next)=>{
    let id = req.params.id;
    //an objectId is a 24-bit Hex string
    if(!id.match(/^[0-9a-fA-F]{24}$/)) {
        let err = new Error('Invalid story id');
        err.status = 400;
        return next(err);
    } else {
        return next();
    }
};

exports.validateSignUp = [body('firstName', 'First name cannot be empty').notEmpty().trim().escape(),
body('lastName', 'Last name cannot be empty').notEmpty().trim().escape(),
body('email', 'Email must be a valid email address').isEmail().trim().escape().normalizeEmail(),
body('password', 'Password must be at least 8 and at most 64 characters long').isLength({min: 8, max: 64})];

exports.validateLogIn = [body('email', 'Email must be a valid email address').isEmail().trim().escape().normalizeEmail(),
body('password', 'Password must be at least 8 and at most 64 characters long').isLength({min: 8, max: 64})];

exports.validateResult = (req, res, next)=>{
    let errors = validationResult(req);
    if(!errors.isEmpty()) {
        errors.array().forEach(error=>{
            req.flash('error', error.msg);
        });
        return res.redirect('back');
    } else {
        return next();
    }
};

//define valid time format using regular expression
const timeRegex = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
exports.validateTime = (req, res, next)=>{
    let time = req.body.startTime;
    if(!time.match(timeRegex)) {
        let err = new Error('Invalid time format');
        err.status = 400;
        return next(err);
    } else {
        return next();
    }
};

//endTime must be after startTime
exports.validateEndTime = (req, res, next)=>{
    let startTime = req.body.startTime;
    let endTime = req.body.endTime;
    if(endTime < startTime) {
        let err = new Error('End time must be after start time');
        err.status = 400;
        return next(err);
    } else {
        return next();
    }
};


//CHECK THIS
exports.validateEvent = [body('title', 'Title cannot be empty').notEmpty().trim().escape(),
body('category', 'Category cannot be empty').notEmpty().trim().escape(),
body('details', 'Details cannot be empty').notEmpty().trim().escape().isLength({min: 10}),
// body('host', 'Host cannot be empty').notEmpty().trim().escape(),
//CHECK TYPE 
// body('type', 'Type cannot be empty').notEmpty().trim().escape(),
body('location', 'Location cannot be empty').notEmpty().trim().escape(),
//date field must be a valid date
body('date', 'Date cannot be empty').isDate().notEmpty().trim().escape(),
//time field must be a valid time
body('startTime', 'Start cannot be empty').matches(timeRegex).notEmpty().trim().escape(),

//endTime must be after startTime
//CHECK NOT WORKING
body('endTime', 'End cannot be empty').matches(timeRegex).notEmpty().trim().escape().custom(
    (value, {req})=>{
        let startTime = req.body.startTime;
        let endTime = value;
        let startTimeMinutes = parseInt(startTime.split(':')[0]) * 60 + parseInt(startTime.split(':')[1]);
        let endTimeMinutes = parseInt(endTime.split(':')[0]) * 60 + parseInt(endTime.split(':')[1]);
        if(endTimeMinutes < startTimeMinutes) {
            throw new Error('End time must be after start time');
        } else {
            return true;
        }
    }

),
body('image', 'Image URL cannot be empty').notEmpty().trim().escape()];

//validate rsvp
exports.validateRsvp = [body('rsvp', 'Rsvp cannot be empty').notEmpty().trim().escape(),
//isin yes no maybe
body('rsvp', 'Rsvp must be yes, no or maybe').isIn(['YES', 'NO', 'MAYBE'])];






