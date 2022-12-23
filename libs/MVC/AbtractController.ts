/**
 * CONTROLLER LAYER : DEPENDENCY MODEL LAYER
 * CONTROLLER LAYER CAN HAVE MANY MODEL BY USING
 *    setModel(model)
 *
 */
import iModel from './interface/Model';

import React from 'react';

type propsType = {
    [type: string]: any;
};

export const APP: any = {};

abstract class AbtractController<M extends iModel> {
    _name: string;
    model: M = Object();
    MODELS: {
        [key: string]: M;
    } = Object();

    react: React.ComponentState;
    constructor(name: string, model: M) {
        this._name = name;
        model.subscribe(this);

        APP[name] = this;
    }

    /**
     * NEED OVERIDE
     */
    stateBuilder(strModel: string) {
        return this.MODELS[strModel].state;
    }

    onStateChanged(state: propsType) {
        this.react.setState(state);
    }
    setModel(model: M) {
        if (!this.model._name) {
            this.model = model;
        }
        this.MODELS[model._name] = model;
    }

    connectView(ReactComponent: React.ComponentState) {
        this.react = ReactComponent;
    }
}

export default AbtractController;
