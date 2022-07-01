const express = require('express');
const app = express();
const http = require('http')
const { Server } = require('socket.io');
const server = http.createServer(app);

const Axios = require("axios");


const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000"
    }
});
var qs = require("qs");

app.use(express.json());

const socketUserMap = {};
function getAllConnectedClients(roomId) {
    return Array.from(io.sockets.adapter.rooms.get(roomId) || []).map((socketId) => {
        return {
            socketId,
            username: socketUserMap[socketId]
        }
    })
}

// to compile code
app.post("/compile", (req, res) => {
    //getting the required data from the request
    console.log("compiling");
    let code = req.body.code;
    let language = req.body.language;
    let input = req.body.input;

    let data = qs.stringify({
        "code": code,
        "language": language,
        "input": input
    });
    console.log(data);
    var config = {
        method: "post",
        url: "https://codex-api.herokuapp.com/",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        data: data
    };
    //calling the code compilation API

    Axios(config)
        .then((response) => {
            console.log(JSON.stringify(response.data));
            res.send(response.data)
            // console.log(response.data)
        }).catch((error) => {
            console.log(error);
        });
})

io.on('connection', (socket) => {
    // console.log(socket.id + "i am here");

    socket.on('join', ({ username, roomId }) => {
        socketUserMap[socket.id] = username
        console.log(roomId);
        socket.join(roomId);
        socket.broadcast.to(roomId).emit('admin_message', `${username} joined the room`);




        const clients = getAllConnectedClients(roomId);
        // console.log(clients);
        clients.forEach(({ socketId }) => {
            io.to(socketId).emit('joined', {
                clients,
                socketId: socket.id
            })
        })

        socket.on('sync_code', ({ code, socketId }) => {
            io.to(socketId).emit('code_change', code);
        });

        socket.on('code_change', ({ roomId, code }) => {
            // console.log(roomId,code);
            socket.in(roomId).emit('code_change', (code));
        })

        socket.on('send_message', ({ message, username, roomId }) => {
            io.to(roomId).emit('get_message', { message, username });
        })

        socket.on('disconnecting', () => {
            console.log("diss");
            const rooms = [...socket.rooms];
            const obj = {
                message: `${username} left the room`,
                info: {
                    socketId: socket.id,
                    username: username
                }
            }
            delete socketUserMap[socket.id];
            rooms.map((roomId) => {
                socket.broadcast.to(roomId).emit('disconnected', (obj));
            })

            socket.leave();
        })
        //  whiteboard socket 
        socket.on('draw', function (data) {
            socket.broadcast.to(roomId).emit('draw', data);
        })
        // socket.on('erase', () => {
        //     console.log("Manny");
        //     socket.broadcast.to(roomId).emit('erase');
        // })

    })

})


const PORT = 3001
server.listen(PORT, () => {
    console.log("server is listening");
})