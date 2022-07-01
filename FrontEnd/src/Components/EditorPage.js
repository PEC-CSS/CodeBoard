import { Split } from '@geoffcox/react-splitter';
import React, { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { socket } from '../socket';
import Editor from './Editor'
import Navbar from './Navbar'
import './EditorPage.css';
import WhiteBoard from './WhiteBoard';
import pencil from './pencil.png'
import eraser from './eraser.png'
import rough from 'roughjs';
import blackboard from './blackboard.jpg'
function EditorPage() {

    const [clients, setClients] = useState([]);
    const location = useLocation();
    const socketRef = useRef(null);
    //useRef re initialization se bachata h...
    const codeRef = useRef('');
    const navigate = useNavigate();
    const [color, setcolor] = useState("black");
    const boardref = useRef('')
    const [tool, settool] = useState("pencil");
    useEffect(() => {
        const init = async () => {
            socketRef.current = await socket();

            //for error handling
            socketRef.current.on('connect_error', (err) => handleErrors(err));
            socketRef.current.on('connect_failed', (err) => handleErrors(err));

            function handleErrors(e) {
                console.log('socket error', e);
                toast.error('Socket connection failed, try again later.');
                navigate('/');
            }

            socketRef.current.emit('join', ({ username: location.state.username, roomId: location.state.roomId, type: "editor" }))
            socketRef.current.on('joined', ({ clients, socketId }) => {
                setClients(clients);
                socketRef.current.emit('sync_code', {
                    code: codeRef.current,
                    socketId: socketId
                });
            })

            socketRef.current.on('admin_message', (message) => {
                toast.success(message);
            })

            socketRef.current.on('disconnected', (obj) => {
                console.log(obj);
                toast.success(obj.message);
                const newClients = clients.filter((client) => {
                    if (client !== obj.info) {
                        return client
                    }
                })
                setClients(newClients);
            })

            //--------------------------------------------------------//
            // White Board // 
            //-------------------------------------------------------//
            var canvas = document.querySelector('#board');
            var ctx = canvas.getContext('2d');
            boardref.current = ctx
            boardref.current.tool = tool;
            var sketch = document.querySelector('#sketch');
            var sketch_style = getComputedStyle(sketch);
            canvas.width = parseInt(sketch_style.getPropertyValue('width'));
            canvas.height = parseInt(sketch_style.getPropertyValue('height'));
            console.log(boardref.current);
            var mouse = { x: 0, y: 0 };
            var last_mouse = { x: 0, y: 0 };

            /* Mouse Capturing Work */
            canvas.addEventListener('mousemove', function (e) {
                last_mouse.x = mouse.x;
                last_mouse.y = mouse.y;

                mouse.x = e.pageX - this.offsetLeft;
                mouse.y = e.pageY - this.offsetTop;

            }, false);


            /* Drawing on Paint App */
            // console.log(color);
            ctx.lineWidth = 10;
            ctx.lineJoin = 'round';
            ctx.lineCap = 'round';
            ctx.strokeStyle = `${color}`;


            canvas.addEventListener('mousedown', function (e) {

                canvas.addEventListener('mousemove', onPaint, false);


            }, false);

            canvas.addEventListener('mouseup', function () {
                canvas.removeEventListener('mousemove', onPaint, false);


            }, false);

            socketRef.current.on('draw', function (data) {
                var image = new Image();
                var canvas = document.querySelector("#board");
                var ctx = canvas.getContext('2d');
                image.onload = function () {
                    ctx.drawImage(image, 0, 0);
                };
                image.src = data;
            })
            var root = { timeout: undefined };
            var onPaint = function () {

                ctx.beginPath();
                ctx.moveTo(last_mouse.x, last_mouse.y);
                ctx.lineTo(mouse.x, mouse.y);
                ctx.closePath();
                ctx.stroke();
                var base64ImageData = canvas.toDataURL("image/png")
                socketRef.current.emit("draw", base64ImageData)


            };

        }

        init();

        //cleaning function taaki memory leak na ho.
        return () => {
            socketRef.current.disconnect();
            socketRef.current.off('joined');
            socketRef.current.off('disconnected');
        };
    }, [])

    if (!location.state) {
        <Navigate to='/' />
    }


    return (
        <div className='editor__page'>
            <div className="navv">
                <Navbar roomId={location.state.roomId} />
            </div>
            <div className='Content'>
                <Split>
                    <div className='whiteboard' style={{ height: '650px', background: 'wheat' }}>
                        <div className="App__container" style={{ height: '100%' }} >
                            <div className="container" style={{ height: '100%' }}>

                                <div className="options-container">
                                    <button style={{ width: 'min-content', border: 'none', background: 'transparent', marginBottom: '5px' }} onClick={()=>boardref.current.strokeStyle = color}>
                                        <img src={pencil} style={{ width: '30px', height: '30px' }} />
                                    </button>
                                    <input type="color" className="color" id="color" value={color} onChange={(e) => [boardref.current.strokeStyle = e.target.value, setcolor(e.target.value)]} />
                                    <button style={{ width: 'min-content', border: 'none', background: 'transparent', marginTop: '5px' }} onClick={() => boardref.current.strokeStyle = 'wheat'} >
                                        <img src={eraser} style={{ width: '30px', height: '30px' }} />
                                    </button>
                                </div>
                                <div className="board-container" style={{ height: '545px', cursor: 'crosshair' }}>
                                    <div className="sketch" id="sketch" style={{ height: '100%' }}>
                                        <canvas className="board" id="board" style={{ height: '100%', border: '2px solid black', }} ></canvas>
                                    </div>

                                </div>
                            </div>

                        </div>
                    </div>
                    <div className='editor'>
                        <Editor
                            socketRef={socketRef}
                            roomId={location.state.roomId}
                            onCodeChange={(code) => {
                                codeRef.current = code;
                            }}
                        />
                    </div>
                </Split>
            </div>
        </div>
    )
}
export default EditorPage