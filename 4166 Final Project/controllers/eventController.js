const { request } = require('express');
const { body } = require('express-validator');
const model = require('../models/event');
const rsvpModel = require('../models/rsvp');


//do I need to make this into a promise?
exports.index = (req, res)=>{
    //res.send('send all events');
    let events = model.find().then(events => {
        let categories = [];
        events.forEach(element => {
            if(!categories.includes(element.category))
                categories.push(element.category);

        });
        console.log(categories)
        res.render('./event/connections', {events, categories})
    }) 
    
};

// exports.index = (req, res, next)=>{
//     model.find()
//     .then(events=>res.render('./event/index', {events}))
//     .catch(err=>next(err));
// };

exports.new = (req, res)=>{
    res.render('./event/newConnection');
};

// exports.create = (req, res, next)=>{
//     //res.send('Created a new event');
//     let event = new model(req.body);
//     event.save()
//     .then((event)=>res.redirect('/events'))
//     .catch(err=>{
//         if(err.name === 'ValidationError') {
//             err.status = 400;
//         }
//         next(err);    
    
// });
// };

exports.create = (req, res, next)=>{
    let event = new model(req.body);
    event.author = req.session.user;
    console.log(event);
    event.save()
    .then(result=> {
        req.flash('success', 'You have successfully created a new event');
        res.redirect('/events');
    })
    .catch(err=>{
        if(err.name === 'ValidationError' ) {
            // err.status = 400;

            //adding flash message for error and redirect to back
            req.flash('error', err.message);
            return res.redirect('back');
        }
        next(err);
    });
    
};



exports.show = (req, res, next)=>{

let id = req.params.id;


Promise.all([ model.findById(id).populate('author', 'firstName lastName'), rsvpModel.count({event:id , status:"YES"})])
.then(results=> {
if(results){
    const [event,rsvp] = results;
    res.render('./event/connection', {event, rsvp});
}else{
    let err = new Error('Cannot find a event with id ' + id);
    err.status = 404;
    next(err);
}
})
.catch(err=> next(err));
};
    


//     let event = model.findById(id);
    
//     if(event){
//         res.render('./event/connection', {event});
//     }else{
//         let err = new Error('Cannot find a event with id ' + id);
//         err.status = 404;
//         next(err);
//     }
// };

//check if .populate() should be called here



//CHECK THIS

// exports.edit = (req, res, next)=>{
//     let id = req.params.id;

// model.findById(id)
// .then(event => {

// if(event){
//     res.render('./event/edit', {event});
// }else{
//     let err = new Error('Cannot find a event with id ' + id);
//     err.status = 404;
//     next(err);
// }
// })
// .catch(err=> next(err));
// };

exports.edit = (req, res, next)=>{
    let id = req.params.id;
   
    model.findById(id)
    .then(event=>{

        //add flash message
        req.flash('success', 'You have successfully edited an event');

        return res.render('./event/edit', {event});
    })
    .catch(err=>{
        
        next(err);
    });
};


//CHECK THIS

// exports.update = (req, res, next)=>{
//     let event = req.body;
//     let id = req.params.id;


// model.findByIdAndUpdate(id, event, {useFindAndModify: false, runValidators: true})
// .then(event => {

// if(event){
//     res.redirect('/events/'+id);
// }else{
//     let err = new Error('Cannot find a event with id ' + id);
//     err.status = 404;
//     next(err);
// }
// })
// .catch(err=>{
//     if(err.name === 'ValidationError') {
//         err.status = 400;
//     }
//     next(err);    

// });
// };

exports.update = (req, res, next)=>{
    let event = req.body;
    let id = req.params.id;

    model.findByIdAndUpdate(id, event, {useFindAndModify: false, runValidators: true})
    .then(event=>{

        //add flash message
        req.flash('success', 'You have successfully updated an event');

        return res.redirect('/events/'+id);
    })
    .catch(err=> {
        if(err.name === 'ValidationError') {
            req.flash('error', err.message);
            return res.redirect('back');
        }
        next(err);
    });
};


//CHECK THIS

exports.delete = (req, res, next)=>{

    let id = req.params.id;
    
    model.findByIdAndDelete(id, {useFindAndModify: false})
    .then(event =>{

        //add flash message
        req.flash('success', 'You have successfully deleted an event');

        res.redirect('/events');
    })
    .catch(err=>next(err));
};
    // let id = req.params.id;
//     if(model.deleteById(id)){
//         res.redirect('/events');
//     }else{
//         let err = new Error('Cannot find a event with id ' + id);
//         err.status = 404;
//         next(err);
//     }
// };

// let id = req.params.id;
// model.findByIdAndDelete(id, {useFindAndModify: false})
//     .then(event =>{
//         if(event) {
//             res.redirect('/events');
//         } else {
//             let err = new Error('Cannot find a story with id ' + id);
//             err.status = 404;
//             return next(err);
//         }
//     })
//     .catch(err=> next(err));

// };

//implement rsvp 
exports.rsvp = (req, res, next)=>{
    let id = req.params.id;
    // let rsvp = req.body.rsvp;
    
    let rsvp = {
        event: id,
        user: req.session.user,
        status: req.body.rsvp};

        console.log(rsvp);


    rsvpModel.findOneAndUpdate({event: id, user: req.session.user}, {status: req.body.rsvp}, {useFindAndModify: false, runValidators: true})
    .then(event=>{
        if(event) {
            console.log(event);
            res.redirect('/events/'+id);
        }
        else {
            
            //create new rsvp
            let newRsvp = new rsvpModel(rsvp);
            newRsvp.save()
            .then(rsvp=>{
                res.redirect('/events/'+id);
            })
            .catch(err=>{
                if(err.name === 'ValidationError') {
                    err.status = 400;
                }
                next(err);
            });
        
        }})
    .catch(err=> {
        if(err.name === 'ValidationError') {
            req.flash('error', err.message);
            return res.redirect('/back');
        }
        next(err);
    });
}

//CHECK IF NEEDED AT ALL
//delete rsvp
exports.deleteRsvp = (req, res, next)=>{
    let id = req.params.id;
    let rsvp = req.body.rsvp;
    model.findByIdAndDelete(id, {rsvp: rsvp}, {useFindAndModify: false, runValidators: true})
    .then(event=>{
        return res.redirect('/events/'+id);
    })
    .catch(err=> {
        if(err.name === 'ValidationError') {
            req.flash('error', err.message);
            return res.redirect('/back');
        }
        next(err);
    });
}


