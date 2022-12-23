/**
 * MODEL LAYER : USING SINGLETON PATTERN
 * MODEL BELONG CONTROLER
 * CAN ONLY POINT TO ONE CONTROLLER
 *
 */

import iController from './interface/Controller';
//import iModel from './interface/Model';

type propType = {
    [key: string]: any;
};

abstract class AbtractModel {
    _name: string;
    CTRL: iController = Object();

    props?: propType;
    state: propType;

    constructor(name: string, defineState: propType, props = {}) {
        this._name = name;
        this.state = defineState;
        this.props = props;
    }

    setState(props: propType) {
        this.state = {
            ...this.state,
            ...props,
        };

        this.notify();
    }

    // NOTIFY TO CONTROLLER STATE CHANGED
    notify() {
        this.CTRL.onStateChanged(this.state);
    }

    update(props: propType, value?: any) {
        props = typeof props === 'string' ? { [props]: value } : props;
        this.setState(props);
    }

    toggle(key: string) {
        this.setState({
            [key]: !this.state[key],
        });
    }

    // COMMUNICATE ZONE
    subscribe(ctrl: iController) {
        this.CTRL = ctrl;
        ctrl.setModel(this);
    }
}

export default AbtractModel;
