

import MySocket from 'models/Socket';
import iAppController from 'controllers/iAppController';
import { NextPage } from 'next';
import { useRouter } from 'next/router'

import { useEffect, useRef, useState } from 'react';



interface VideoCallSessionProps {
    ctrl: iAppController
    mode: 'practice' | 'challenge'
}
const VideoCallSession: NextPage<VideoCallSessionProps> = ({ ctrl, mode }) => {

    const { model } = ctrl;
    const { state } = model;

    const router = useRouter();

    const [micActive, setMicActive] = useState(true);
    const [cameraActive, setCameraActive] = useState(true);

    const userVideoRef = useRef<any>(null);
    const peerVideoRef = useRef<any>(null);
    const rtcConnectionRef = useRef<any>(null);

    const userStreamRef = useRef<any>(null);
    const hostRef = useRef<boolean>(false);

    const VIDEOCON_ROOM = router?.query?.qid;

    useEffect(() => {
        if (MySocket._instance?.connection && VIDEOCON_ROOM) {
            if (VIDEOCON_ROOM) {
                MySocket._instance?.iniConference(String(VIDEOCON_ROOM), hostRef, userStreamRef, userVideoRef, rtcConnectionRef, peerVideoRef);
                
                // OPEN VIDEO
                ctrl?.model.update({isOpenVideoCon:true});

            }
        }

    }, [MySocket._instance?.connection, VIDEOCON_ROOM]);

    const toggleMediaStream = (type: any, state: any) => {
        userStreamRef.current.getTracks().forEach((track: any) => {
            if (track.kind === type) {
                track.enabled = !state;
            }
        });
    };
    const toggleCamera = () => {
        toggleMediaStream('video', cameraActive);
        setCameraActive((prev) => !prev);
    };

    const toggleMic = () => {
        toggleMediaStream('audio', micActive);
        setMicActive((prev) => !prev);
    };




    return (
        <div className={`video-call-session ${model?.state?.isOpenVideoCon ? 'show' : 'hide'} `}>
            <video autoPlay ref={userVideoRef} />
            <video autoPlay ref={peerVideoRef} />

            <button className='btn btn-sm-1x' onClick={toggleCamera} type="button">
                {cameraActive ? 'Camera On' : 'Camera Off'}
            </button>

            <button className='btn btn-sm-1x' onClick={toggleMic} type="button">
                {micActive ? 'Mute Mic' : 'UnMute Mic'}
            </button>

            <button className='btn btn-sm-1x' onClick={() => MySocket._instance?.leaveVideoCon()} type="button">
                Leave
            </button>

            {/*<button className='btn btn-sm-1x' type='button' onClick={() => MySocket._instance?.iniConference(String(VIDEOCON_ROOM), hostRef, userStreamRef, userVideoRef, rtcConnectionRef, peerVideoRef) }>
                Join
    </button>*/}



        </div>
    )
}

export default VideoCallSession