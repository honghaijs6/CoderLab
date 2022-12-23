import { iMVCModel } from 'libs/MVC/interface';
import { IQuestion } from 'components/playbox/LeftSide';

export interface iDefineState {
    ideLang: string;
    ideCode: string;
    ideReady: boolean;
    consoleBox: string;
    myId: string;
    curHostId: string;
    curQuestionInfo: IQuestion | null;
    isOpenVideoCon: boolean;
    curAppStatus: string;
    members: { id: string; fullName: string }[];
    [key: string]: any;
}

interface iIDEModel extends Omit<iMVCModel, 'state'> {
    props: any;
    state: iDefineState;

    addMember(member:any): void;
}

export default iIDEModel;
