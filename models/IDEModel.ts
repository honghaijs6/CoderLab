//MVC LIBS
import { MVCModel } from 'libs/MVC';
// ALL DEPENDENCY
import iIDEModel, { iDefineState } from './iIDEModel';

const defineState: iDefineState = {
    ideLang: 'javascript',
    ideCode: '',
    ideReady: false,
    consoleBox: '',
    myId: '',
    curHostId: '',
    curQuestionInfo: null,
    isOpenVideoCon: false,
    curAppStatus: '',
    members: [],
};
class IDEModel extends MVCModel implements iIDEModel {
    static _instance: iIDEModel;

    props: any;
    state = defineState;
    constructor() {
        super('IDEModel', defineState, {});
        this.props = {};

        if (!IDEModel._instance) {
            IDEModel._instance = this;
        }

        return IDEModel._instance;
    }

    addMember(member: any) {
        try {
            const newMember = [...this.state.members];
            newMember.push(member);

            // UPDATE
            this.update({ members: newMember });
        } catch (err) {
            alert(err);
        }
    }
}

export default IDEModel;
