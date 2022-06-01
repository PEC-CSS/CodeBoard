import React from 'react'
// import Icon from './icon.jpg'
import './Navbar.css'
import Logo from './codeboardlogo.png';
import ChatIcon from '@mui/icons-material/Chat';
import GroupsIcon from '@mui/icons-material/Groups';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

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
            <div className='navbarlogo'>
                <img className='logo' src={Logo} style={{ marginLeft:15 ,height: 40, width: 100 }} />
            </div>
            <div className='space'>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div>
            <div className='navbuttons'>
                <button onClick={copyRoomId} className='navbutton'><ContentCopyIcon/>
                    <span className='copyRoomId'>Copy Room Id</span>
                </button>
                <button className='navbutton'><GroupsIcon/></button>
                <button className='navbutton'><ChatIcon/></button>
                <button onClick={leaveRoom} className='leaveButton btn btn-danger'>Exit</button>
            </div>
        </div>
    )
}

export default Navbar