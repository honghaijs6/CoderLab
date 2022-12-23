// CONSTANCE
import SETTING from 'config/App.json';

// MVC DEPENDENCY
import { MVCView } from 'libs/MVC';
import IDEModel from 'models/IDEModel';
import AppController from 'controllers/AppController';

//LIBS
import React from 'react';

// COMPONENTS
import LeftSide from 'components/playbox/LeftSide'
import RightSide from 'components/playbox/RightSide';
import VideoCallSession from './VideoCallSession';

// INITIAL CONCRETE
const model = new IDEModel();
const ctrl = new AppController(model);

export interface IUserInfo {
    email: string
    name: string
    image: string
}
interface PlayBoxProps {
    sessionId: string;
    mode: string
    userInfo: IUserInfo
}

class PlayBox extends MVCView {
    constructor(props: PlayBoxProps) {
        ctrl.model.props = props;
        super(props);

        this.init(ctrl);

        //this.ref = React.createRef();
    }

    componentDidMount() {
        ctrl.boot(this.props.sessionId, this.props.userInfo);
    }

    UNSAFE_componentWillReceiveProps(nextProps: PlayBoxProps) {

        if (nextProps.sessionId !== this.props.sessionId) {
            ctrl.boot(nextProps.sessionId, nextProps.userInfo);
        }
    }

    render(): React.ReactNode {
        return (
            <div className="main-frame">
                <LeftSide mode={this.props?.mode} onSelected={(data) => ctrl.onPickQuestion(data)} />

                <RightSide mode={this.props?.mode} ctrl={ctrl} />

                <VideoCallSession mode={this.props?.mode} ctrl={ctrl} />
            </div>
        );
    }
}

export default PlayBox;
