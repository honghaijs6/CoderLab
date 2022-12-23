import { PureComponent } from 'react';
import { iMVCController } from './interface';

type MyProps = {
    [key: string]: any;
};
type MyState = {
    [key: string]: any;
};

class MVCView extends PureComponent<MyProps, MyState> {
    init(mvcControler: iMVCController) {
        //const { mvcControler, mvcModel } = props;
        //this.state = mvcControler.stateBuilder(mvcControler.model._name);
        mvcControler.stateBuilder(mvcControler.model._name);
        mvcControler.connectView(this);
    }
}

export default MVCView;
