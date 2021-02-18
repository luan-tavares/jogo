var express = require('express');
var app = express();
var path = require('path');



// viewed at http://localhost:8080

app.use('/js', express.static(path.join(__dirname, "assets")));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/jogoTeste.html'));
});

app.use(function (req, res, next) {
    res.status(404).send('Sorry cant find that!');
});



app.listen(8080);