import React, { useState } from 'react'
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
require('codemirror/theme/neat.css');
require('codemirror/mode/xml/xml.js');
require('codemirror/mode/javascript/javascript.js');

{/* <a href = 'codemirror/theme/dracula.css' rel='stylesheet'/> */ }

function Editor() {
    const options = [
        "c++",
        "python",
        "javascript",
        "perl",
        "ruby",
        "shell",
    ];
    const defaultOption = options[0];
    return (
        <div className='flex'>
            <Split>
                <div className="whiteboard">

                </div>

                <div className="editor">
                    <div className="heading" style={{ height: '30px', width: '110px', marginBottom: '7px' }}>
                        <Dropdown
                            style={{ cursor: 'pointer' }}
                            options={options}
                            value={defaultOption}
                        />
                    </div>
                    <CodeMirror
                        className='codemirror'
                        value="#include <bits/stdc++.h>"
                        options={{
                            mode: 'text/x-python',
                            theme: 'monokai',
                            lineNumbers: true,
                            autoCloseBrackets: true,
                            indentUnit: 4,
                            autofocus: true,
                            lineWrapping: true
                        }}
                    />
                    <div className="footer" style={{width: '80px', height:'30px' }}>
                        console
                    </div>
                </div>

            </Split>


        </div>
    )
}

export default Editor
