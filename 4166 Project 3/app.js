//Miguel Morel
//800877651
//4166 Project 3


//require modules
const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const eventRoutes = require('./routes/eventRoutes');
const mainRoutes = require('./routes/mainRoutes');

//create app
const app = express();

//configure app
let port = 3000;
let host = 'localhost';
let url = `mongodb://localhost:27017/NBAD`;
app.set('view engine', 'ejs');

//connect to mongodb
mongoose.connect(url)
.then(() => {
//start the server
    app.listen(port, host, ()=>{
    console.log('Server is running on port', port);
});
})
.catch(err => console.log(err.message));


//mount middleware
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(morgan('tiny'));
app.use(methodOverride("_method"));


//set up routes
// app.get('/', (req, res)=>{
//     res.render('index');
// })

// app.get('/about', (req, res)=>{
//     res.render('about');
// })

// app.get('/contact', (req, res)=>{
//     res.render('contact');
// })

app.use('/events', eventRoutes);

app.use('/', mainRoutes);

app.use((req, res, next)=>{
    let err = new Error('The server cannot locate ' + req.url);
    err.status = 404;
    next(err);
})

app.use((err, req, res, next)=>{
    console.log(err.stack);
    if(!err.status){
        err.status = 500;
        err.message = ("Internal server error");
    }

    res.status(err.status);
    res.render('error', {error: err});
});



