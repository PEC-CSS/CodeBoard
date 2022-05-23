import React from 'react'
import './Editor.css'
import Dropdown from 'react-dropdown';
import codemirror from 'codemirror';
function Modal({settheme, settabsize, flag, setflag, editorRef}) {
    const Themes = ["ambiance", "monokai", "material", "dracula", "material-darker", "material-palenight", "mdn-like", "eclipse"]
    const FontSizes = ["2px", "4px", "6px", "8px", "10px", "11px", "12px", "14px", "16px", "18px", "20px", "24px", "28px", "32px", "36px", "40px", "44px", "48px", "52px"];
    const TabSizes = ["2", "4", "8"];
    const defaultsize = FontSizes[8]; 
    const defaulttheme = Themes[0];
    const defaulttabsize = TabSizes[1];
    const handlechangefontsize = (e) => {
        document.querySelector(".CodeMirror").style.fontSize = `${e.value}`;
        // let temp = flag+1;
        // setflag(temp);
    }
    const changetheme = (e)=>{
        settheme(e.value);
        // let temp = flag+1;
        // setflag(temp);
        // let a = document.querySelector('.CodeMirror cm-s-ambiance CodeMirror-wrap')
        // editorRef.current.options.theme = e.value;
        
    }
    const changetabsize = (e)=>{
        settabsize(e.value);
        // let temp = flag+1;
        // setflag(temp);
    }
    return (
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
                                    onChange={changetheme}
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
                                    onChange={changetabsize}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal