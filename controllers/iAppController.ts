
import { iMVCController } from "libs/MVC/interface";
interface iAppController extends iMVCController{


    runCode(code:string):void 
    takeOver(myId:string):void
    ideChange(text:string):void
    
    
}

export default iAppController ; 
