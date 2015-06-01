var path = require('path');
var bodyParser = require('body-parser');
var express = require('express');
var _ = require('lodash');

var app = express();

app.use(function nocache(req, res, next) {
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    res.header('Expires', '-1');
    res.header('Pragma', 'no-cache');
    next();
});

app.use(require('cookie-parser')());
app.use(require('cookie-session')({
    secret: 'secret'
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.get('/api/session', function(req, res){
    res.json('ok')
})
app.post('/api/session', function(req, res){
    res.json('ok')
})
app.delete('/api/session', function(req, res){
    res.json('ok')
})

var users = [
    { name : 'user 1', id : 1},
    { name : 'user 2', id : 2}   
]

app.get('/api/users', function(req, res){
    res.json(users)
})

app.post('/api/users', function(req, res){
    var newUser = req.body;
    newUser.id = new Date().getTime();
    users.push(newUser)
    res.json(newUser)
})

app.delete('/api/users/:id', function(req, res){
    var index = _.findIndex(users, { id : req.params.id });
    var deleted = users.splice(index, 1);
    res.json(deleted)
})

app.get('/api/users/:id', function(req, res){
    var result = users.filter(function(u){ return u.id == req.params.id });
    if (result.length == 0)
        res.send(404)
    else
        res.json(result[0])
})



app.listen(9999, function () {
    console.log('http://localhost:9999');
});


module.exports = app;
