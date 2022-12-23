
// CONSTANCE
import SETTING from "config/App.json";
//LIBS
import React, { useContext } from "react";
import { NextPage } from "next";
import Editor from "@monaco-editor/react";

//COMPONENTS
import Select from "components/Select";

// CONTROLLER CONTEXT
import iAppController from "controllers/iAppController";


const INTRO_PAGE: any = {
    practice: `
        <p>In this mode you are practicing problem solving skills through the questions on the left side of the screen</p>
        <p>you can also invite your friends, or your mentor, expert to join this session</p>
    `,
    challenge: `
        <p>In this mode you will have to solve the questions in the allotted time as well as to upgrade your rank in the leaderboard.</p>
        <p>You unable to invite anyone join on your session, this is your place</p>
        <br/><br/>
        <p class="text-green">Are you ready!!!</p>

    `
}
interface RightSideProps {
    ctrl: iAppController
    mode: 'practice' | 'challenge'
}
const RightSide: NextPage<RightSideProps> = ({ ctrl, mode = 'practice' }) => {


    const { model } = ctrl;
    const _editorOnMount = () => {

    }
    return (
        <div className="side-right">
            {
                model?.state?.ideReady ? (
                    <>
                        {/* EDITOR */}
                        <div className="tool">
                            <div className="item" >
                                <Select
                                    defaultValue={model.state.ideLang}
                                    data={SETTING.IDE_LANG}
                                    onSelected={(item) => ctrl.model.update({ ideLang: item.code })}
                                />


                                {/*<span className="text-white" style={{ marginLeft: 10 }}>{model.state.curHostId + '--' + model.state.myId}</span>*/}

                            </div>
                            <div className="item">
                                <button type="button" onClick={() => ctrl.runCode(model.state.ideCode)} className="btn btn-sm-1x pl-3 pr-3 ">Submit</button>
                            </div>
                        </div>
                        <div className="my-editor" onClick={() => ctrl.takeOver(model.state.myId)}>
                            <Editor

                                theme="vs-dark"
                                height="100%"
                                width="100%"
                                defaultLanguage={model.state.ideLang}
                                defaultValue={model.state.ideCode}
                                value={model.state.ideCode}
                                onChange={(newValue, e) => {
                                    ctrl.ideChange(String(newValue))
                                }}

                                onMount={_editorOnMount}



                            />
                        </div>

                        {/* CONSOLE BOX */}
                        <div className="console-box" >
                            <h3 className="box-title bold">
                                <span>CONSOLE</span>

                                <i style={{ fontSize: 12, marginLeft: 10 }} onClick={() => ctrl.model.update({ consoleBox: '' })} className="fa fa-ban cursor"></i>

                            </h3>
                            <pre className="text-white" style={{ paddingLeft: 10, maxHeight: '18vh', overflowY: 'auto' }}>
                                {model.state.consoleBox}
                            </pre>
                        </div>
                    </>
                ) : (
                    <div className="page-intro">
                        <div>
                            <h4>{mode}</h4>
                            <div dangerouslySetInnerHTML={{ __html: INTRO_PAGE[mode] }} />
                            <img src={`/${mode}.png`} />

                            <p className="text-yellow">
                                Get started
                            </p>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default RightSide