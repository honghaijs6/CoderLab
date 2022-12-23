// CONSTANCE
import SETTINGS from 'config/App.json';

// LIBS
import { MVCController } from 'libs/MVC';
import { v4 as uuidv4 } from 'uuid';
import { exec } from 'js-exec';
import { decode } from 'ultils/base64';
import { transpile } from 'typescript';
import { toast } from 'react-toastify';

// ALL DEPENDENCY
import iAppController from './iAppController';
import iIDEModel from 'models/iIDEModel';

// LIBS
import MySocket from 'models/Socket';
import { IQuestion } from 'components/playbox/LeftSide';
import { IUserInfo } from 'interfaces/IUserInfo';
import { iUserInfo } from 'pages/api/socket/LiveSession';
const mySocket = new MySocket();

class AppController extends MVCController<iIDEModel> implements iAppController {
    myId: string;

    socket: any;
    myInfo: iUserInfo | null;
    constructor(model: iIDEModel) {
        super('AppController', model);
        this.myId = uuidv4();
        this.socket = mySocket;
        this.myInfo = null;
    }

    async boot(sessionId: string, userInfo: IUserInfo | null) {
        if (sessionId !== 'undefined' && userInfo) {
            this._updateAppStatus('starting socket...');
            await mySocket.init(
                sessionId,
                { id: String(userInfo?.email).replace('@', ''), image: userInfo?.image, fullName: userInfo?.name },
                (status: string) => {
                    this.model.update({ myId: this.myId, curAppStatus: userInfo?.name + ' joined' });
                    this._updateAppStatus(userInfo.name + ' joined');

                    this.myInfo = { fullName: userInfo.name, id: String(userInfo?.email).replace(/@/g, ''), image: userInfo?.image };

                    this.model.addMember(this.myInfo);

                    this.listenningIDEChange();
                    this.listeningNewMember();
                    this.listeningUserActon();
                },
            );
        }
    }

    _updateAppStatus(status: string) {
        //this.model.update({ curAppStatus: status });
        const box = document.querySelector('#APP-STATUS') as HTMLDivElement | null;
        if (box) {
            box.innerHTML = status;
        }
    }
    //////////////////////////// QUESTIONS ///////////////////////////////////////////////////////////////////

    /**
     * PICK A QUESTION AND UPDATE GLOBAL STATE FOR CURRENT QUESTION INFO
     * MAKE SIDE EFFECT
     * @param data
     */
    onPickQuestion(data: IQuestion | null) {
        try {
            this.model.update({
                ideReady: Boolean(data),
                isOpenVideoCon: Boolean(data),
                curQuestionInfo: data,
                ideCode: data ? data?.Question?.Editor : '',
            });

            this.userActionChangeQuestion(String(data?.Id));

            //data ? this.userActionChange(JSON.stringify(data)) : this.socket?.leaveVideoCon();
        } catch {}
    }

    listeningNewMember() {
        MySocket._instance.connection.on(SETTINGS.SOCKET_EVENTS.SERVER_CLIENT.NEW_MEMBER, (resData: string) => {
            // NOTIFY NEW MEMBER COMMEBER
            //console.log("::: NEW MEMBER COMMING :::")
            const data = JSON.parse(decode(resData));

            this.ideChange(this.model.state.ideCode);
        });

        const randId = uuidv4();
        MySocket._instance.connection.on('on_join_livecode', (strData: string) => {
            //const data: { roomName: string; userInfo: iUserInfo } = JSON.parse(strData);
            const data: { from: string; text: string; console: string; members: { id: string; fullName: string }[] } = JSON.parse(
                decode(strData),
            );

            const memberInfo = data?.members.find(i => i.id != this.myInfo?.id);
            this.model.addMember(memberInfo);

            toast(memberInfo?.fullName + ' joined', {
                toastId: memberInfo?.id,
            });
        });
    }

    /**
     * LISTENING USER ACTION CHANGE
     */
    listeningUserActon() {
        try {
            MySocket._instance.connection.on('on_user_action_change_question', (strData: string) => {
                //const data = JSON.parse(decode(strData));
                //console.log(data);
                //alert(decode(strData))
                //if (data) {
                // alert(data);
                //this.model.update({ ideCode: data.text, curHostId: data.from, consoleBox: data?.console });
                //this.runCode(data.text);
                //}
            });
        } catch {}
    }

    /* 
    LISTENING CURRENT IDE CHANGE
    */
    listenningIDEChange() {
        try {
            MySocket._instance.connection.on(SETTINGS.SOCKET_EVENTS.SERVER_CLIENT.IDE, (resData: string) => {
                const data = JSON.parse(decode(resData));

                if (data) {
                    this.model.update({ curAppStatus: data.from, ideCode: data.text, curHostId: data.from, consoleBox: data?.console });

                    this._updateAppStatus(data?.from + ' are typing...');
                    this.runCode(data.text);
                }
            });
        } catch {}
    }

    userActionChangeQuestion(questionId: string | null) {
        try {
            const { state } = this.model;
            if (state.curHostId === this.myId && questionId) {
                mySocket.actionChangeQuestion({ from: this.myId, questionId });
            }
        } catch {}
    }
    ideChange(text: string) {
        try {
            const { state } = this.model;
            if (state.curHostId === this.myId) {
                mySocket.textShot({
                    from: this.myId,
                    text,
                });

                this.runCode(text);
            }
        } catch {}
    }
    /**
     * TRYING TAKE OVER HANLD IDE
     */
    takeOver(myId: string) {
        try {
            this.model.update({ curHostId: myId });

            mySocket.textShot({
                from: myId,
                text: this.model.state.ideCode,
            });
        } catch {}
    }

    runCode(code: string): void {
        try {
            const sandbox = exec(code); //exec(transpile(code));

            const pConsole = {
                log: (text: any) => {
                    this.model.update({ consoleBox: JSON.stringify(text, null, 2) });
                },
                error: (text: string) => {
                    alert(text);
                },
                clear: () => {
                    this.model.update({ consoleBox: '' });
                },
            };

            sandbox({ console: pConsole });
        } catch (err) {
            this.model.update({ consoleBox: String(err) });
        }
    }
}

export default AppController;
