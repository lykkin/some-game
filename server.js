var express = require('express');
var server = express();
var db = require('./db/db.js');
var chat = require('./chat/chat.js');
var sockets = require('socket.io');

server.configure(function (){
    server.use(express.static(__dirname + '/pub'));
    server.use(express.cookieParser());
    server.use(express.bodyParser());
    server.use(server.router);
});
server.set('views', __dirname + '/pub/views');
server.engine('html', require('ejs').renderFile);
server.listen(8001);
console.log('Server listening on port 8001');

server.get('/', function(req, res){
        res.render('client.html', {});
});
