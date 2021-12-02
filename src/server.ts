var express = require('express');

var app = express();

app.get('/', function(req,res) {
    res.send(`Eye of Sauron Watches on port ${port}...`);
});

//@TODO add auth middleware
//@TODO add registration page

const port = process.env.PORT || 3001;
var server = app.listen(port, function () {
    console.log(`Eye of Sauron is watching on port: ${port}`);
});