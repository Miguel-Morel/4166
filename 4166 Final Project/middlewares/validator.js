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

//CHECK THIS
exports.validateEvent = [body('title', 'Title cannot be empty').notEmpty().trim().escape(),
body('details', 'Details cannot be empty').notEmpty().trim().escape().isLength({min: 10}),
body('host', 'Host cannot be empty').notEmpty().trim().escape(),
//CHECK TYPE 
// body('type', 'Type cannot be empty').notEmpty().trim().escape(),
body('location', 'Location cannot be empty').notEmpty().trim().escape(),
body('date', 'Date cannot be empty').notEmpty(),
body('startTime', 'Start cannot be empty').notEmpty(),
body('endTime', 'End cannot be empty').notEmpty(),
body('imageTitle', 'Image URL cannot be empty').notEmpty().trim().escape()];
