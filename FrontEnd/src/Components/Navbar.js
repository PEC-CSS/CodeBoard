import React from 'react'
// import Icon from './icon.jpg'
import './Navbar.css'
import Logo from './codeboardlogo.png';
import ChatIcon from '@mui/icons-material/Chat';
import GroupsIcon from '@mui/icons-material/Groups';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Tooltip from '@mui/material/Tooltip';
import Zoom from '@mui/material/Zoom';
function Navbar({roomId}) {

    const navigate = useNavigate();

    const copyRoomId = () => {
        navigator.clipboard.writeText(roomId);
        toast.success('copied');
    }

    const leaveRoom = () => {
        navigate('/')
    }

    return (
        <div className='navbar'>
            <div className='navbarlogo' style = {{color:'white', marginLeft:'5px', fontWeight:'bold'}}>
                /{'>'} CODEBOARD
            </div>
            <div className='space'>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div>
            <div className='navbuttons'>
                <button onClick={copyRoomId} className='navbutton'><Tooltip title = "Copy" TransitionComponent={Zoom} ><ContentCopyIcon/></Tooltip>
                    <span className='copyRoomId'>Copy Room Id</span>
                </button>
                <button className='navbutton'><Tooltip TransitionComponent={Zoom} title="Participants"><GroupsIcon/></Tooltip></button>
                <button className='navbutton'><Tooltip title = "Chat" TransitionComponent={Zoom}><ChatIcon/></Tooltip></button>
                <button onClick={leaveRoom} className='leaveButton btn btn-danger'>Leave</button>
            </div>
        </div>
    )
}

export default Navbar