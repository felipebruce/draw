var conexoes = [];

//Fornece funcionalidades para a aplicação
var express = require('express');

//Criando a aplicação
var app = express();

//Utiliza a porta 8000
var server = app.listen(8000);

app.use(express.static('public'));

console.log("O servidor está rodando!");

//WebSockets trabalham com o servidor HTTP
var socket = require('socket.io');

var io = socket(server);

//Usado para cada cliente
io.sockets.on('connection', function(socket) {

    console.log('Nova conexão: ' + socket.id);
    conexoes.push(socket);
    console.log('Conectado: %s sockets conectado(s)', conexoes.length);

    //Quando o mouse é acionado, a informação do cliente é mostrada no servidor
    socket.on('mouse', function(data) {
        console.log('Cliente: ' + socket.id + ' Dados:' + JSON.stringify(data));
        socket.broadcast.emit('mouse', data); //A informação é finalmente transmitida para todos os clientes
    });

    socket.on('disconnect', function(socket) {
        conexoes.splice(conexoes.indexOf(socket), 1);
        console.log('Disconnected: %s sockets conectado(s)', conexoes.length);
    });

});