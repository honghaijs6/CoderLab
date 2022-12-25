import IDEModel from "models/IDEModel";
import MySocket from "models/Socket";
import { iUserInfo } from "pages/api/socket/LiveSession";
import { useEffect, useState } from "react";

const Footer = () => {


    return (
        <div className="footer split-2" style={{ justifyContent: 'space-between' }}>
            <div className="item" id="APP-STATUS"></div>
            <div className="item" style={{ textAlign: 'right' }}>
                {/* IDEModel._instance.state.myId */}
            </div>
        </div>
    )
}

export default Footer 