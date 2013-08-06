//backend server stuff in here, handles socket handling stuff and passes
//requests and responses to things where nescessary. nothing interesting
//here
var db = require('./db/db.js');
var chat = require('./chat/chat.js');

var express = require('express');
var http = require('http');
var ejs = require('ejs');

var app = express();
var server = http.createServer(app);
var sio = require('socket.io').listen(server);

sio.sockets.on('connection', function(socket){
	socket.emit('hello', { hello: 'world'});
});

app.configure(function (){
    app.use(express.static(__dirname + '/pub'));
    app.use(express.cookieParser());
    app.use(express.bodyParser());
    app.use(app.router);
});
app.set('views', __dirname + '/pub/views');
app.engine('html', ejs.renderFile);

server.listen(8001);
console.log('Server listening on port 8001');

app.get('/', function(req, res){
        res.render('client.html', {});
});
