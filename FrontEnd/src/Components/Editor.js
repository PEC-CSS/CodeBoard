import React, { useState, useRef, useEffect } from 'react'
import './Editor.css'
import Navbar from './Navbar';
import 'codemirror/lib/codemirror.css';
import "codemirror/mode/clike/clike";
import "codemirror/mode/python/python";
import "codemirror/mode/javascript/javascript";
import "codemirror/mode/go/go";
import "codemirror/mode/pascal/pascal";
import "codemirror/mode/lua/lua";
import "codemirror/mode/rust/rust";
import "codemirror/mode/perl/perl";
import "codemirror/mode/ruby/ruby";
import "codemirror/mode/php/php";
import "codemirror/mode/r/r";
import "codemirror/mode/ruby/ruby";
import "codemirror/mode/sql/sql";
import "codemirror/mode/swift/swift";
import "codemirror/mode/shell/shell";
import "codemirror/mode/rust/rust";
import "codemirror/mode/haskell/haskell";

import "codemirror/addon/edit/closebrackets";
import "codemirror/addon/edit/closetag";
import "codemirror/addon/hint/show-hint";
import "codemirror/addon/hint/show-hint.css";
import "codemirror/addon/hint/javascript-hint";
import "codemirror/addon/hint/anyword-hint";

import "codemirror/addon/fold/foldcode";
import "codemirror/addon/fold/foldgutter";
import "codemirror/addon/fold/brace-fold";
import "codemirror/addon/fold/comment-fold";
import "codemirror/addon/fold/foldgutter.css";

import "codemirror/lib/codemirror.css";
import 'codemirror/theme/material.css';
import "codemirror/theme/dracula.css";
import "codemirror/theme/monokai.css";
import "codemirror/theme/ambiance.css";
import "codemirror/theme/material-darker.css";
import "codemirror/theme/material-palenight.css";
import "codemirror/theme/mdn-like.css";
import "codemirror/theme/eclipse.css";
import { Split } from "@geoffcox/react-splitter"
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import Button from '@mui/material/Button';
import Zoom from '@mui/material/Zoom';
import HelpOutlinedIcon from '@mui/icons-material/HelpOutlined';
import Tooltip from '@mui/material/Tooltip';
import SettingsIcon from '@mui/icons-material/Settings';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import codemirror from 'codemirror';
import Modal from './Modal';
require('codemirror/theme/neat.css');

function Editor() {

    const editorRef = useRef(null);
    const [flag2, setflag2] = useState(0);
    const [flag, setflag] = useState(true)
    const [size, setsize] = useState("10%");
    const handleClicked = async () => {
        if (flag) {
            const current = editorRef.current.display.wrapper.style.height = '440px';
            setsize('35%');
            setflag(false);
        } else {
            const current = editorRef.current.display.wrapper.style.height = '600px';
            setsize('10%');
            setflag(true);
        }

    }
    useEffect(() => {
        editorRef.current = codemirror.fromTextArea(
            document.getElementById('realtimeEditor'),
            {
                mode: `text/x-c++src`,
                theme: 'material-darker',
                autoCloseTags: true,
                autoCloseBrackets: true,
                lineNumbers: true,
                indentUnit: 4,
                lineWrapping: true,
                foldGutter: true,
                matchBrackets: true,
                tabSize: `${tabsize}`,
                gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
                coverGutterNextToScrollbar: true,
            }
        );
        editorRef.current.display.wrapper.style.height = '600px';
        editorRef.current.display.wrapper.style.resize = 'none';
        editorRef.current.on('change', (instance, changes) => {
            // const { origin } = changes;
            // console.log(origin)
            let code = instance.getValue();                 // getting code 
            // console.log(code);
            // console.log(theme);
            // onCodeChange(code);
            // if (origin !== 'setValue') {
            //     socketRef.current.emit(ACTIONS.CODE_CHANGE, {
            //         roomId,
            //         code,
            //     });
            // }
        });
    }, [])
    const language = [
        "C++",
        'C',
        'Java',
        "Python",
    ];
    const mapping = {
        "C++": "c++src",
        "C": "csrc",                        
        "Java": "java",
        "Python": "python"
    }

    const [mode, setmode] = useState('c++')
    const [theme, settheme] = useState("ambiance")
    const [tabsize, settabsize] = useState("4");
    const defaultOption = language[0];
    const changemod = (e) => {
        let temp = flag + 1;
        setflag(temp);
        setmode(e.value)
    }
    console.log(mode);
    return (
        <>
            <div className='Content'>
                <div className="navbar">
                    <Navbar/>
                </div>
                <Split >
                    <div className="whiteboard">
                        <h1>Area For WhiteBoard</h1>
                    </div>

                    <div className="editor">
                        <div className="heading" >

                            <div className="langaugeselector">
                                <Tooltip title="Choose Your Language" TransitionComponent={Zoom} placement='top'>

                                    <HelpOutlinedIcon style={{ marginTop: '7px', backgroundColor: 'white', fontWeight: 'lighter', borderRadius:'50px', marginLeft:'5px'}}>

                                    </HelpOutlinedIcon>

                                </Tooltip>
                                <Dropdown
                                    style={{ cursor: 'pointer' }}
                                    options={language}
                                    value={defaultOption}
                                    onChange={changemod}
                                />

                            </div>
                            <div className="settings" >
                                <Tooltip title="Editor Settings" TransitionComponent={Zoom} placement='top'>
                                    <SettingsIcon data-bs-toggle="modal" data-bs-target="#exampleModal" style={{ height: '20px', width: '20px', color:'#ffc107' }} />

                                </Tooltip>
                                <Modal settheme={settheme} settabsize={settabsize} flag={flag2} setflag={setflag2} editorRef={editorRef} />


                            </div>
                        </div>
                        <Split horizontal initialPrimarySize="90%" minSecondarySize={size} splitterSize="0%" >
                            <textarea
                                id='realtimeEditor'
                                value="#include <iostream>"
                            ></textarea>

                            <div className="consoleplusarea">
                                {/* <div className="testareaoutput">
                                <div className="testarea">

                                </div>
                                <div className="output"></div>
                            </div> */}
                                {!flag && <div className='testareaoutput'>
                                    <div className="testout">
                                        <div className="testarea"></div>
                                        <div className="output"></div>
                                    </div>
                                    <textarea className="textarea">

                                    </textarea>
                                </div>}
                                <div className="mainfooter" style={{ display: 'flex', justifyContent: 'space-between' }}>

                                    <Button onclick = {handleClicked} className="Console" style={{ width: '80px', height: '20px' }}>
                                        Console
                                    </Button>
                                    <div className="submitandtest">
                                        <Button className="submit" >
                                            <ArrowRightIcon /> Run Code
                                        </Button>
                                        <Button className="submit" >
                                            Submit
                                        </Button>
                                    </div>

                                    
                                </div>
                            </div>

                        </Split>
                    </div>

                </Split>
            </div>





        </>
    )
}

export default Editor
