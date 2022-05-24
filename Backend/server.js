const express = require('express');
const app = express();
const http = require('http')
const {Server} = require('socket.io');
const server = http.createServer(app);
const io = new Server(server);
const Axios = require("axios");
const cors = require("cors");

app.use(cors())
app.use(express.json());

const socketUserMap = {};
function getAllConnectedClients(roomId){
    return Array.from(io.sockets.adapter.rooms.get(roomId) || []).map((socketId)=>{
        return {
            socketId,
            username : socketUserMap[socketId]
        }
    })
}

//to compile code
// app.post("/compile", (req, res) => {
//     //getting the required data from the request
//     let code = req.body.code;
//     let language = req.body.language;
//     let input = req.body.input;
 
//     let data = ({
//         "code": code,
//         "language": language,
//         "input": input
//     });
//     let config = {
//         method: 'post',
//         url: 'https://codexweb.netlify.app/.netlify/functions/enforceCode',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         data: data
//     };
//     //calling the code compilation API

//     Axios(config)
//         .then((response)=>{
//             // console.log(res.data);
//             res.send(response.data)
//             // console.log(response.data)
//         }).catch((error)=>{
//             console.log(error);
//         });
// })

io.on('connection',(socket) => {
    console.log(socket.id + "i am here");
    
    socket.on('join',({username,roomId}) => {
        socketUserMap[socket.id] = username

        socket.join(roomId);
        socket.broadcast.to(roomId).emit('admin_message',`${username} joined the room`);

        const clients = getAllConnectedClients(roomId);
        // console.log(clients);
        clients.forEach(({socketId}) => {
            io.to(socketId).emit('joined',{
                clients,
                socketId : socket.id
            })
        })

        socket.on('sync_code', ({ code,socketId }) => {
            io.to(socketId).emit('code_change', code );
        });

        socket.on('code_change',({roomId,code}) => {
            // console.log(roomId,code);
            socket.in(roomId).emit('code_change',(code));
        })

        socket.on('disconnecting',() => {
            const rooms = [...socket.rooms];
            const obj = {
                message : `${username} left the room`,
                info : {
                    socketId : socket.id,
                    username : username
                }
            }
            delete socketUserMap[socket.id];
            rooms.map((roomId)=>{
                socket.broadcast.to(roomId).emit('disconnected',(obj));
            })

            socket.leave();
        })
    })
})


const PORT = 3001
server.listen(PORT, () => {
    console.log("server is listening");
})