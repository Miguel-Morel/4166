const model = require('../models/event')
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

exports.new = (req, res)=>{
    res.render('./event/newConnection');
};

exports.create = (req, res, next)=>{
    //res.send('Created a new event');
    let event = new model(req.body);
    event.save()
    .then((event)=>res.redirect('/events'))
    .catch(err=>{
        if(err.name === 'ValidationError') {
            err.status = 400;
        }
        next(err);    
    
});
};

//fix show, edit, update, delete

exports.show = (req, res, next)=>{
    let id = req.params.id;

   
    //an objectId is a 24-bit Hex string
    if(!id.match(/^[0-9a-fA-F]{24}$/)) {
        let err = new Error('Invalid story id');
        err.status = 400;
        return next(err);
    }

//     let event = model.findById(id);
    
//     if(event){
//         res.render('./event/connection', {event});
//     }else{
//         let err = new Error('Cannot find a event with id ' + id);
//         err.status = 404;
//         next(err);
//     }
// };

model.findById(id)
.then(event => {

if(event){
    res.render('./event/connection', {event});
}else{
    let err = new Error('Cannot find a event with id ' + id);
    err.status = 404;
    next(err);
}
})
.catch(err=> next(err));
};


exports.edit = (req, res, next)=>{
    let id = req.params.id;
    
    

model.findById(id)
.then(event => {

if(event){
    res.render('./event/edit', {event});
}else{
    let err = new Error('Cannot find a event with id ' + id);
    err.status = 404;
    next(err);
}
})
.catch(err=> next(err));
};


exports.update = (req, res, next)=>{
    let event = req.body;
    let id = req.params.id;
//     if(model.updateById(id, event)){
//         res.redirect('/events/'+id);
//     }else{
//         let err = new Error('Cannot find a event with id ' + id);
//         err.status = 404;
//         next(err);
//     }
// };

model.findByIdAndUpdate(id, event, {useFindAndModify: false, runValidators: true})
.then(event => {

if(event){
    res.redirect('/events/'+id);
}else{
    let err = new Error('Cannot find a event with id ' + id);
    err.status = 404;
    next(err);
}
})
.catch(err=>{
    if(err.name === 'ValidationError') {
        err.status = 400;
    }
    next(err);    

});
};

exports.delete = (req, res, next)=>{
    let id = req.params.id;
//     if(model.deleteById(id)){
//         res.redirect('/events');
//     }else{
//         let err = new Error('Cannot find a event with id ' + id);
//         err.status = 404;
//         next(err);
//     }
// };

model.findByIdAndDelete(id, {useFindAndModify: false})
    .then(event =>{
        if(event) {
            res.redirect('/events');
        } else {
            let err = new Error('Cannot find a story with id ' + id);
            err.status = 404;
            return next(err);
        }
    })
    .catch(err=> next(err));

};