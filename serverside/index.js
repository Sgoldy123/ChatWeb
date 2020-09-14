//server side

const io=require("socket.io")(80);

const user={};

io.on('connection',socket=>{

    socket.on('new-user-joined',name=>{
        console.log("joined",name);
        user[socket.id]=name;
        socket.broadcast.emit('user-joined',name);
    });

    socket.on('send',message =>{
       
        socket.broadcast.emit('recieve' ,{message: message, name: user[socket.id]});
    });

})