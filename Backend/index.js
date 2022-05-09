const express = require('express');
const app = express()
const { createServer } = require('http');  
const server = createServer(app);
const {addUser,removeUser,getUser,getUsersInRoom} = require('./users');

const io = require('socket.io')(server,{
    cors:{
        origin : "*"
    }
})

const PORT = 3001;
const cors = require('cors');

const router = require('./router');

app.use(router);
app.use(cors());

io.on('connection', (socket) => {
    console.log("we have a new connection.")
    
    socket.on('join',({name ,room},callback)=>{
        console.log(name,room);

         const {error,user} = addUser({id:socket.id,name,room});
        // let error = true;
        // if(error){
        //     callback({error : "error"});
        // }

        if(error)return callback(error);

        socket.emit('message',{user : 'admin',text : `${user.name} welcome to ${user.room}`});
        socket.broadcast.to(user.room).emit({user : 'admin', text : `${user.name} has joined the room`});
        socket.join(user.room);

        console.log(getUsersInRoom(user.room))
        io.to(user.room).emit('roomData',{room : user.room,users : getUsersInRoom(user.room)});
    
    })

    socket.on('sendMessage', (message,callback) => {
        const user = getUser(socket.id);
        // console.log(message);
        io.to(user.room).emit('message',{user:user.name,text:message});
        io.to(user.room).emit('roomData',{room : user.room, users:getUsersInRoom(user.room)});
        callback();
    });



    socket.on('disconnect',()=>{
        const user = removeUser(socket.id);

        if(user){
            io.to(user.room).emit('message',{user:'admin',text:`${user.name} has left the room`})
        }
    })
})


server.listen(PORT,() => {
    console.log("you are at server");
})

