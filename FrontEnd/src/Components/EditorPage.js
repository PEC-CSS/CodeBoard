import { Split } from '@geoffcox/react-splitter';
import React, { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { socket } from '../socket';
import Editor from './Editor'
import Navbar from './Navbar'
import './EditorPage.css';

function EditorPage() {

    const [clients, setClients] = useState([]);
    const location = useLocation();
    const socketRef = useRef(null);
    //useRef re initialization se bachata h...
    const codeRef = useRef('');
    const navigate = useNavigate();


    const copyRoomId = () => {
        navigator.clipboard.writeText(location.state.roomId);
        toast.success('copied');
    }

    const leaveRoom = () => {
        navigate('/')
    }

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

            socketRef.current.emit('join', ({ username: location.state.username, roomId: location.state.roomId }))

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
        <div>
            <div className="navbar">
                <Navbar />
            </div>
            <div className='Content'>
                <Split>
                    <div className='whiteboard'>

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