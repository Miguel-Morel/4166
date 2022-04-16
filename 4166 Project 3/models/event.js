const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
    title: {type: String, required: [true, 'title is required']},
    category: {type: String, required: [true, 'category is required']},
    details: {type: String, required: [true, 'details are required'], minLength: [10, 'the details should be atleast 10 characters']},
    location: {type: String, required: [true, 'location is required']},
    date: {type: String, required: [true, 'date is required']},
    startTime: {type: String, required: [true, 'start time is required']},
    endTime: {type: String, required: [true, 'end time is required']},
    host: {type: String, required: [true, 'host is required']},
    image: {type: String, required: [true, 'image URL is required']},},
);

//collection name in db: events
module.exports = mongoose.model('Event', eventSchema);


// const { Datetime, DateTime } = require("luxon");
// const {v4: uuidv4} = require('uuid');

// const events = [
// {
//     id: '1',
//     title: 'Honda Annual Meeting',
//     category: "industry",
//     details: 'Annual Meeting sponsored by our Honda partners. Come Enjoy!',
//     location: 'Charlotte Honda Dealership',
//     date: '01-16-2023',
//     startTime: '9:00pm',
//     endTime: '11:00pm',
//     host: 'Honda',
//     image: '../IMG/download.png'
// },

// {
//     id: '2',
//     title: 'Auto Toyz Monthly Meeting',
//     category: 'local services',
//     details: 'Come join us for our monthly meeting!',
//     location: 'University Area Auto Toyz parking location',
//     date: '06-25-2022',
//     startTime: '7:00pm',
//     endTime: '10:00pm',
//     host: 'Auto Toyz',
//     image: '../IMG/autotoyz-logo1.png'
// },

// {
//     id: '3',
//     title: 'CarMax Monthly Meeting',
//     category: "industry",
//     details: 'Come join us for our monthly meeting!',
//     location: 'Huntersville CarMax Dealership',
//     date: '08-05-2022',
//     startTime: '5:00pm',
//     endTime: '9:00pm',
//     host: 'CarMax',
//     image: '../IMG/cq5dam.logolg.600.300.png'
// },

// {
//     id: '4',
//     title: 'Caffeine and Octane Monthly Meeting',
//     category: "industry",
//     details: 'Come join us for our monthly meeting!',
//     location: 'Raleigh Caffeine and Octane',
//     date: '10-22-2022',
//     startTime: '3:00pm',
//     endTime: '11:00pm',
//     host: 'Cafeeine and Octane',
//     image: '../IMG/logo-s.png'
// },

// {
//     id: '5',
//     title: 'Charlotte Automobile Association Annual Meeting',
//     category: "local services",
//     details: 'Come join us for our annual meeting!',
//     location: 'Charlotte Motor Speedway',
//     date: '04-01-2022',
//     startTime: '6:00pm',
//     endTime: '10:00pm',
//     host: 'CAAAM',
//     image: '../IMG/maxresdefault.jpg'
// },

// {
//     id: '6',
//     title: 'The Auto Show Monthly Meeting',
//     category: "local services",
//     details: 'Come join us for our monthly meeting!',
//     location: 'NASCAR Raceway',
//     date: '11-29-2022',
//     startTime: '9:00am',
//     endTime: '10:00pm',
//     host: 'TASAM',
//     image: '../IMG/Y2QLPFQPU5CXJGXF3QQT2HRZKU.jpg'
// },



// ];

// exports.find = function(){
//     return events;
// }

// exports.findById = function(id){
//     return events.find(event=>event.id === id);
// }

// exports.save = function(event){
//     event.id = uuidv4();
//     events.push(event)
// }

// exports.updateById = function(id, newEvent){
//     let event = exports.findById(id);
//     if(event){
//         event.date = newEvent.date;
//         event.startTime = newEvent.startTime;
//         event.endTime = newEvent.endTime;
//         event.host = newEvent.host;
//         event.image = newEvent.image;
//         event.title = newEvent.title;
//         event.category = newEvent.category;
//         event.details = newEvent.details;
//         event.location = newEvent.location;
        
//         return true;
//     } else{
//         return false;
//     }
// }

// exports.deleteById = function(id){
//     let index = events.findIndex(event => event.id === id);
//     if(index !== -1){
//         events.splice(index, 1);
//         return true;
//     } else{
//         return false;
//     }
// }

// exports.checkURL = function(url) {
//     return(url.match(/\.(jpeg|jpg|gif|png)$/) != null);
// }