const Event = require('../models/event');

//check if user is a guest
exports.isGuest = (req, res, next)=>{
    if(!req.session.user) {
        return next();
    }
    else {
        req.flash('error', 'You have already logged in');
        return res.redirect('/users/profile');
    }
}


//check if user is authenticated
exports.isLoggedIn = (req, res, next)=>{
    if(req.session.user) {
        return next();
    }
    else {
        req.flash('error', 'You have to login first');
        return res.redirect('/users/login');
    }
}

//check if user is author of story
exports.isAuthor = (req, res, next)=>{
    let id = req.params.id;

    Event.findById(id)
    .then(event=>{
        if(event) {
            // console.log(req.session.user);
            // console.log(event.author);
            if(event.author == req.session.user) {
                return next();
            }
            else {
                let err = new Error('You are not the author of this event. Unauthorized access attempt denied.');
                err.status = 401;
                return next(err);
            }
        } else {
            let err = new Error('Cannot find an event with id ' + id);
            err.status = 404;
            return next(err);
        }
    })
    .catch(err=>next(err));
}

