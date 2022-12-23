import iController from "./Controller";

type propsType = {
  [key: string]: any;
};

interface iModel {
  _name: string;
  CTRL: iController;
  props?:propsType; 
  state: propsType;
  setState(props: propsType): void;
  notify(): void;
  update(props: propsType): void;
  toggle(key:string):void
  subscribe(ctrl: iController): void;
}

export default iModel;
