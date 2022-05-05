import React, { useState, useRef, useEffect } from 'react'
import './Editor.css'
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/theme/monokai.css';
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
import "codemirror/theme/dracula.css";
import "codemirror/theme/monokai.css";
import "codemirror/theme/ambiance.css";
import "codemirror/theme/material-darker.css";
import "codemirror/theme/material-palenight.css";
import "codemirror/theme/mdn-like.css";
import "codemirror/theme/eclipse.css";
import { Split } from "@geoffcox/react-splitter"
import { UnControlled as CodeMirror } from 'react-codemirror2-react-17'
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import Button from '@mui/material/Button';
import LiveHelpIcon from '@mui/icons-material/LiveHelp';
import Zoom from '@mui/material/Zoom';
import QuestionMarkOutlinedIcon from '@mui/icons-material/QuestionMarkOutlined';
import HelpOutlinedIcon from '@mui/icons-material/HelpOutlined';
// import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
// import ReactMegaMenu from "react-mega-menu"
require('codemirror/theme/neat.css');
require('codemirror/mode/xml/xml.js');
require('codemirror/mode/javascript/javascript.js');
// var request = require('request');
{/* <a href = 'codemirror/theme/dracula.css' rel='stylesheet'/> */ }

function Editor() {
    // flag is true then area is collapsed otherwise it is not. 
    const codeRef = useRef();
    const [flag, setflag] = useState(true);
    const [size, setsize] = useState("10%")
    const handleClicked = async () => {
        if (flag) {
            const current = codeRef.current.editor.display.wrapper.style.height = '440px';
            setsize('35%');
            setflag(false);
        } else {
            const current = codeRef.current.editor.display.wrapper.style.height = '600px';
            setsize('10%');
            setflag(true);
        }
        let temp = codeRef.current.editor.getValue()
        let code = temp.toString();
    
    }
    useEffect(() => {
        const current = codeRef.current.editor.display.wrapper.style.height = '600px';
    }, [])
    const language = [
        "c++",
        'c',
        'java',
        "python",
    ];
    const mapping = {
        "c++": "c++src",
        "c": "csrc",
        "java": "java",
        "python": "python"
    }

    const [mode, setmode] = useState('c++')
    const defaultOption = language[0];
    return (
        <div className='flex'>
            <Split >
                <div className="whiteboard">

                </div>

                <div className="editor">
                    <div className="heading" style={{ height: '30px', width: '110px', marginBottom: '7px' }}>

                        <div className="langaugeselector" >
                            <Tooltip title="Choose Your Language" TransitionComponent={Zoom} placement='top'>

                                <HelpOutlinedIcon style={{ marginTop: '7px', backgroundColor: 'white', fontWeight: 'lighter' }}>

                                </HelpOutlinedIcon>

                            </Tooltip>
                            <Dropdown

                                style={{ cursor: 'pointer' }}
                                options={language}
                                value={defaultOption}
                                onChange={(e) => setmode(e.value)}
                            />

                        </div>


                    </div>
                    <Split horizontal initialPrimarySize="90%" minSecondarySize={size} splitterSize="0%" >
                        <CodeMirror
                            value="#include <bits/stdc++.h>"
                            options={{
                                mode: `text/x-${mapping[mode]}`,
                                theme: 'monokai',
                                lineNumbers: true,
                                autoCloseBrackets: true,
                                indentUnit: 4,
                                autofocus: true,
                                lineWrapping: true,
                                foldGutter: true,
                                autoCloseTags: true,
                                matchBrackets: true,
                                autoCloseBrackets: true,
                                extraKeys: {
                                    "Ctrl-Space": "autocomplete",
                                },
                                coverGutterNextToScrollbar: true,
                                gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
                            }}
                            ref={codeRef}
                        />
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
                            <div className="mainfooter">

                                <Button className="footer" onClick={handleClicked} style={{ width: '80px', height: '20px' }}>
                                    Console
                                </Button>
                                {/* <svg width="16px" marginTop="10px" height="13px" cursor='pointer' fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 19" preserveAspectRatio="xMidYMid meet"><path d="M7 8l-4 4 4 4M17 8l4 4-4 4M13 5l-2 14" stroke="#6c7f95" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg> */}
                            </div>


                        </div>

                    </Split>
                </div>

            </Split>


        </div>
    )
}

export default Editor
