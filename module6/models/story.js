const { DateTime } = require('luxon');
const {v4: uuidv4} = require('uuid');
const stories = [
    {
        id: '1',
        title: 'The best story ever',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget consectetur tempor, nisl nunc ultrices eros, eu porttitor nisl nunc euismod nunc. Donec euismod, nisl eget consectetur tempor, nisl nunc ultrices eros, eu porttitor nisl nunc euismod nunc. Donec euismod, nisl eget consectetur tempor, nisl nunc ultrices eros, eu porttitor nisl nunc euismod nunc. Donec euismod, nisl eget consectetur tempor, nisl nunc ultrices eros, eu porttitor nisl nunc euismod nunc. Donec euismod, nisl eget consectetur tempor, nisl nunc ultrices eros, eu porttitor nisl nunc euismod nunc. Donec euismod, nisl eget consectetur tempor, nisl nunc ultrices eros, eu porttitor nisl nunc euismod nunc. Donec euismod, nisl eget consectetur tempor, nisl nunc ultrices eros, eu porttitor nisl nunc euismod nunc. Donec euismod, nisl eget consectetur tempor, nisl nunc ultrices eros, eu porttitor nisl nunc euismod nunc. Donec euismod, nisl eget consectetur tempor, nisl nunc ultrices eros, eu porttitor nisl nunc euismod nunc. Donec euismod, nisl eget consectetur tempor, nisl nunc ultrices eros, eu porttitor nisl nunc euismod nunc. Donec euismod, nisl eget consectetur tempor, nisl nunc ultrices eros.',
        author: 'John Doe',
        createdAt: DateTime.now().toLocaleString(DateTime.DATETIME_SHORT)
    },
    {

        id: '2',
        title: 'The worst story ever',
        content: ' Donec euismod, nisl eget consectetur tempor, nisl nunc ultrices eros, eu porttitor nisl nunc euismod nunc. Donec euismod, nisl eget consectetur tempor, nisl nunc ultrices eros, eu porttitor nisl nunc euismod nunc. Donec euismod, nisl eget consectetur tempor, nisl nunc ultrices eros, eu porttitor nisl nunc euismod nunc. Donec euismod, nisl eget consectetur tempor, nisl nunc ultrices eros, eu porttitor nisl nunc euismod nunc. Donec euismod, nisl eget consectetur tempor, nisl nunc ultrices eros, eu porttitor nisl nunc euismod nunc. Donec euismod, nisl eget consectetur tempor, nisl nunc ultrices eros. Donec euismod, nisl eget consectetur tempor, nisl nunc ultrices eros, eu porttitor nisl nunc euismod nunc. Donec euismod, nisl eget consectetur tempor, nisl nunc ultrices eros, eu porttitor nisl nunc euismod nunc. Donec euismod, nisl eget consectetur tempor, nisl nunc ultrices eros, eu porttitor nisl nunc euismod nunc. Donec euismod, nisl eget consectetur tempor, nisl nunc ultrices eros. Donec euismod, nisl eget consectetur tempor, nisl nunc ultrices eros, eu porttitor nisl nunc euismod nunc. Donec',
        author: 'Jane Doe',
        createdAt: DateTime.local(2021, 2 ,12, 18, 0).toLocaleString(DateTime.DATETIME_SHORT)
    }
];

// console.log(stories[1]);

//alt implementation: exports.find = () => stories;
exports.find = function(){
    return stories;
};

//alt implementation: exports.findById = (id) => stories.find(story => story.id === id);
exports.findById = function(id){
    return stories.find(story => story.id === id);
};

exports.save = function(story){
    story.id = uuidv4();
    story.createdAt = DateTime.now().toLocaleString(DateTime.DATETIME_SHORT);
    stories.push(story);
};

exports.updateById = function(id, newStory){
    let story = stories.find(story=>story.id === id);
    if(story){
        story.title = newStory.title;
        story.content = newStory.content;
        return true;
    } else {
        return false;
}
};

exports.deleteById = function(id){
    let index = stories.findIndex(story => story.id === id);
    if(index !== -1){
        stories.splice(index, 1);
        return true;
    } else {
        return false;
    }
};

