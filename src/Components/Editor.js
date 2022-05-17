import React, { useState, useRef, useEffect } from 'react'
import './Editor.css'
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
import SettingsIcon from '@mui/icons-material/Settings';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
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
    const Themes = ["ambiance", "monokai", "material", "dracula", "material-darker", "material-palenight", "mdn-like", "eclipse"]
    const FontSizes = ["2px", "4px", "6px", "8px", "10px", "11px", "12px", "14px", "16px", "18px", "20px", "24px", "28px", "32px", "36px", "40px", "44px", "48px", "52px"];
    const TabSizes = ["2", "4", "8"];
    const [mode, setmode] = useState('c++')
    const [fontsize, setfontsize] = useState("16");
    const [theme, settheme] = useState("ambiance")
    const defaultsize = FontSizes[8];
    const defaultOption = language[0];
    const defaulttheme = Themes[0];
    const defaulttabsize = TabSizes[1];
    const [tabsize, settabsize] = useState("4")
    const handlechangefontsize = (e) => {
        document.querySelector(".CodeMirror").style.fontSize = `${e.value}`;
    }

    return (
        <>
            <div className='flex' style={{ display: 'flex' }} >

                <Split >
                    <div className="whiteboard">
                        <h1>Area For WhiteBoard</h1>
                    </div>

                    <div className="editor">
                        <div className="heading" style={{ height: '30px', width: '100%', marginBottom: '7px' }}>

                            <div className="langaugeselector">
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
                            <div className="settings" >
                                <Tooltip title="Editor Settings" TransitionComponent={Zoom} placement='top'>

                                    {/* <button type="button" className="btn btn" data-bs-toggle="modal" data-bs-target="#exampleModal" > */}
                                    <SettingsIcon data-bs-toggle="modal" data-bs-target="#exampleModal" style={{ height: '20px', width: '20px' }} />
                                    {/* </button> */}
                                </Tooltip>
                                {/* <!-- Modal --> */}
                                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" style={{ marginTop: '100px' }}>
                                    <div className="modal-dialog">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h5 className="modal-title" id="exampleModalLabel">Editors Settings</h5>
                                                <button type="button" className="btn-close" style={{ outline: 'none', boxShadow: 'none' }} data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                            <div className="modal-body">
                                                <div className="fontsize">
                                                    <div className="textdivide">
                                                        <div className="head">
                                                            Font
                                                        </div>
                                                        <div className="desc">
                                                            Choose your preferred font size for the code editor.
                                                        </div>
                                                    </div>
                                                    <div className="size" >
                                                        <Dropdown
                                                            style={{ cursor: 'pointer' }}
                                                            options={FontSizes}
                                                            value={defaultsize}
                                                            onChange={handlechangefontsize}

                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="modal-body">
                                                <div className="fontsize">
                                                    <div className="textdivide">
                                                        <div className="head">
                                                            Theme
                                                        </div>
                                                        <div className="desc">
                                                            Choose your Favourite Theme.
                                                        </div>
                                                    </div>
                                                    <div className="size">
                                                        <Dropdown
                                                            style={{ cursor: 'pointer' }}
                                                            options={Themes}
                                                            value={defaulttheme}
                                                            onChange={(e) => settheme(e.value)}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="modal-body">
                                                <div className="fontsize">
                                                    <div className="textdivide">
                                                        <div className="head">
                                                            Tab Size
                                                        </div>
                                                        <div className="desc">
                                                            Choose your preferred tab size.
                                                        </div>
                                                    </div>
                                                    <div className="size">
                                                        <Dropdown
                                                            style={{ cursor: 'pointer' }}
                                                            options={TabSizes}
                                                            value={defaulttabsize}
                                                            onChange={(e) => settabsize(e.value)}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                            </div>
                        </div>
                        <Split horizontal initialPrimarySize="90%" minSecondarySize={size} splitterSize="0%" >
                            <CodeMirror
                                value = "#include <iostream>"
                                options={{
                                    mode: `text/x-${mapping[mode]}`,
                                    theme: `${theme}`,
                                    lineNumbers: true,
                                    autoCloseBrackets: true,
                                    indentUnit: 8,
                                    autofocus: true,
                                    lineWrapping: true,
                                    foldGutter: true,
                                    autoCloseTags: true,
                                    matchBrackets: true,
                                    autoCloseBrackets: true,
                                    tabSize: `${tabsize}`,
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
                                <div className="mainfooter" style={{ display: 'flex', justifyContent: 'space-between' }}>

                                    <Button className="Console" onClick={handleClicked} style={{ width: '80px', height: '20px' }}>
                                        Console
                                    </Button>
                                    <div className="submitandtest">
                                        <Button className="submit" >
                                            <ArrowRightIcon/> Run Code
                                        </Button>
                                        <Button className="submit" >
                                            Submit
                                        </Button>
                                    </div>

                                    {/* <svg width="16px" marginTop="10px" height="13px" cursor='pointer' fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 19" preserveAspectRatio="xMidYMid meet"><path d="M7 8l-4 4 4 4M17 8l4 4-4 4M13 5l-2 14" stroke="#6c7f95" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg> */}
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
