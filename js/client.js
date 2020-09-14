const socket= io('http://localhost:80');

//console.log("chechl");
const form= document.getElementById('send-container');
const messageInput=document.getElementById('messageInp');

var aud=new Audio('ting.mp3');

const messagecontainer=document.querySelector('.container');

const append=(message, position)=>{
    const messageElement=document.createElement('div');
    messageElement.innerText=message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messagecontainer.append(messageElement);
    aud.play();

};

const name=prompt("enter you name to join");



socket.emit('new-user-joined',name);
socket.on('user-joined',data=>{
 
    append(`${data} joined the chat`, 'right');

});

form.addEventListener('submit',(e)=>{
    e.preventDefault();//for not loading
    const message=messageInput.value;
    append(`you: ${message}`,'right');
    socket.emit('send',message);
    messageInput.value=''
})

socket.on('recieve',data=>{
    append(`${data.name}:${data.message}`,'left');
})