const path = require('path')
const express = require('express');
const app = express();

//settings
app.set('port',process.env.PORT || 3000);
//configuration of archives of css, js, html

//enviar todos los archivos estaicos
//static files
app.use(express.static(path.join(__dirname,'public')));

//start the server

const server = app.listen(app.get('port'),()=>{
    console.log("server on port", app.get('port'));
});





//para poder usar socker este necesita de un servidor ya iniciado
const SocketIO = require('socket.io');
const io = SocketIO(server);


//web sockets
io.on('connection',(socket)=>{
    console.log('new connection',socket.id);
    socket.on('chat:message',(data)=>{
        io.sockets.emit('chat:servidor',data);
    })
    socket.on('chat:typing',function(data){
        socket.broadcast.emit('chat:typing',data)
    });
    
});


