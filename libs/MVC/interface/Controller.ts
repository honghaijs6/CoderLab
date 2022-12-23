import iModel from "./Model";
import React from "react";

type propsType = {
  [key: string]: any;
};

interface iController {
  _name: string;
  model: iModel;
  MODELS: {
    [key: string]: iModel;
  };
  react: React.ComponentState;
  stateBuilder(strModel: string): propsType;
  onStateChanged(state: propsType):void;

  setModel(model: object): void;

  connectView(reactState: React.ComponentState): void;
}

export default iController;
