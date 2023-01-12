const socket = io()
//Elementos del DOM
let message = document.getElementById('message');
let username = document.getElementById('username');
let btn = document.getElementById('send');
let output = document.getElementById('output');
let actions = document.getElementById('actions');

btn.addEventListener('click',function(){
    socket.emit('chat:message',{
        username:username.value,
        message: message.value
    });
});

message.addEventListener('keypress',function(){
    console.log(username.value);
    socket.emit('chat:typing',username.value)
})

socket.on('chat:servidor',function(data){
    // console.log(data)
    output.innerHTML += `<p>
    <strong>${data.username}</strong>
    </p>`

});
socket.on('chat:typing',function(data){
    actions.innerHTML=`<p><em>${data} Esta tipeando un mensage</em></p>`
})