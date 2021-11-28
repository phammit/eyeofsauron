var express = require('express');

var app = express();

app.get('/', function(req,res) {
    res.send('Eye of Sauron Watches...');
});

var server = app.listen(3001, function () {

});