

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

    const router = useRouter();


    const [micActive, setMicActive] = useState(true);
    const [cameraActive, setCameraActive] = useState(true);

    const userVideoRef = useRef<any>(null);
    const peerVideoRef = useRef<any>(null);
    const rtcConnectionRef = useRef<any>(null);
    const socketRef = useRef<any>(null);
    const userStreamRef = useRef<any>(null);
    const hostRef = useRef<boolean>(false);

    const connection = MySocket._instance.connection;

    const roomName = router?.query?.session;  //Math.random().toString(36).slice(2) ;   //String(router?.query?.user).replace(/\./g, '');

    const ICE_SERVERS = {
        iceServers: [
            {
                urls: [
                    'stun:openrelay.metered.ca:80',
                    'stun:stun1.l.google.com:19302',
                    'stun:stun2.l.google.com:19302',
                    'stun:stun.l.google.com:19302'
                ]
            }
        ],
        iceCandidatePoolSize: 10
    };

    const handleICECandidateEvent = (event: any) => {
        if (event.candidate) {
            connection.emit('ice-candidate', event.candidate, roomName);
        }
    };

    const handleTrackEvent = (event: any) => {

        peerVideoRef.current.srcObject = event.streams[0];

    };
    const createPeerConnection = () => {
        // We create a RTC Peer Connection
        const pc = new RTCPeerConnection(ICE_SERVERS);

        // We implement our onicecandidate method for when we received a ICE candidate from the STUN server
        pc.onicecandidate = handleICECandidateEvent;

        // We implement our onTrack method for when we receive tracks
        pc.ontrack = handleTrackEvent;
        return pc;

    };

    useEffect(() => {


        if (connection) {


            // First we join a room
            //connection.emit('join_conference', roomName);

            // CREATE ROOM 
            connection.on('created', () => {

                //handleRoomCreated
                hostRef.current = true;
                navigator.mediaDevices
                    .getUserMedia({
                        audio: true,
                        video: { width: 200, height: 200 },
                    })
                    .then((stream) => {
                        /* use the stream */
                        userStreamRef.current = stream;
                        userVideoRef.current.srcObject = stream;
                        userVideoRef.current.onloadedmetadata = () => {
                            userVideoRef.current.play();
                        };
                    })
                    .catch((err) => {
                        /* handle the error */

                        console.log(err);
                    });
            });


            // HANDLE JOIN ROOM 
            connection.on('joined', () => {

                navigator.mediaDevices
                    .getUserMedia({
                        audio: true,
                        video: { width: 200, height: 200 },
                    })
                    .then((stream) => {
                        /* use the stream */
                        userStreamRef.current = stream;
                        userVideoRef.current.srcObject = stream;
                        userVideoRef.current.onloadedmetadata = () => {
                            userVideoRef.current.play();
                        };
                        connection.emit('ready', roomName);
                    })
                    .catch((err) => {
                        /* handle the error */
                        console.log('error', err);
                    });
            });

            // INITIAL SESSION 
            connection.on('ready', () => {
                if (hostRef.current) {

                    rtcConnectionRef.current = createPeerConnection();
                    rtcConnectionRef.current.addTrack(
                        userStreamRef.current.getTracks()[0],
                        userStreamRef.current,
                    );
                    rtcConnectionRef.current.addTrack(
                        userStreamRef.current.getTracks()[1],
                        userStreamRef.current,
                    );
                    rtcConnectionRef.current
                        .createOffer()
                        .then((offer: any) => {

                            try {
                                rtcConnectionRef.current.setLocalDescription(offer);
                                connection.emit('offer', offer, roomName);

                            } catch (err) {

                                setTimeout(() => {
                                    window.location.reload()
                                }, 2000)

                            }
                        })
                        .catch((error: any) => {
                            console.log(error);
                        });

                }
            });

            // WHEN USER LEAVE
            connection.on('leave', () => {

                //onPeerLeave
                // This person is now the creator because they are the only person in the room.
                hostRef.current = true;
                if (peerVideoRef.current.srcObject) {
                    peerVideoRef.current.srcObject
                        .getTracks()
                        .forEach((track: any) => track.stop()); // Stops receiving all track of Peer.
                }

                // Safely closes the existing connection established with the peer who left.
                if (rtcConnectionRef.current) {
                    rtcConnectionRef.current.ontrack = null;
                    rtcConnectionRef.current.onicecandidate = null;
                    rtcConnectionRef.current.close();
                    rtcConnectionRef.current = null;
                }


            });

            // HANDLE OFFER
            connection.on('offer', (offer: any) => {
                //handleReceivedOffer
                if (!hostRef.current) {
                    rtcConnectionRef.current = createPeerConnection();
                    rtcConnectionRef.current.addTrack(
                        userStreamRef.current.getTracks()[0],
                        userStreamRef.current,
                    );
                    rtcConnectionRef.current.addTrack(
                        userStreamRef.current.getTracks()[1],
                        userStreamRef.current,
                    );
                    rtcConnectionRef.current.setRemoteDescription(offer);

                    rtcConnectionRef.current
                        .createAnswer()
                        .then((answer: any) => {

                            rtcConnectionRef.current.setLocalDescription(answer);
                            connection.emit('answer', answer, roomName);

                        })
                        .catch((error: any) => {
                            console.log(error);
                        });
                }
            });

            // HANDLE ANWSER 
            connection.on('answer', (anwser: any) => {
                //handleAnswer
                //alert("ANWSER")
                rtcConnectionRef.current
                    .setRemoteDescription(anwser)
                    //.catch((err: any) => console.log(err));
            });

            // HANDLE ICE CANDIDATE
            connection.on('ice-candidate', (incoming: any) => {

                //alert("IN COMMING")
                //handlerNewIceCandidateMsg
                // We cast the incoming candidate to RTCIceCandidate
                const candidate = new RTCIceCandidate(incoming);
                rtcConnectionRef.current
                    .addIceCandidate(candidate)
                    //.catch((e: any) => console.log(e));

            });





        }

    }, [connection]);

    const toggleMediaStream = (type: any, state: any) => {
        userStreamRef.current.getTracks().forEach((track: any) => {
            if (track.kind === type) {
                // eslint-disable-next-line no-param-reassign
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

    const leaveRoom = () => {
        connection.emit('leave', roomName); // Let's the server know that user has left the room.

        if (userVideoRef.current.srcObject) {
            userVideoRef.current.srcObject.getTracks().forEach((track: any) => track.stop()); // Stops receiving all track of User.
        }
        if (peerVideoRef.current.srcObject) {
            peerVideoRef.current.srcObject
                .getTracks()
                .forEach((track: any) => track.stop()); // Stops receiving audio track of Peer.
        }

        // Checks if there is peer on the other side and safely closes the existing connection established with the peer.
        if (rtcConnectionRef.current) {
            rtcConnectionRef.current.ontrack = null;
            rtcConnectionRef.current.onicecandidate = null;
            rtcConnectionRef.current.close();
            rtcConnectionRef.current = null;
        }

        //router.push('/')

    };


    return (
        <div className="video-call-session">

            <video autoPlay ref={userVideoRef} />
            <video autoPlay ref={peerVideoRef} />

            <button className='btn btn-sm-1x' onClick={toggleCamera} type="button">
                {cameraActive ? 'Camera On' : 'Camera Off'}
            </button>

            <button className='btn btn-sm-1x' onClick={toggleMic} type="button">
                {micActive ? 'Mute Mic' : 'UnMute Mic'}
            </button>
            <button className='btn btn-sm-1x' onClick={leaveRoom} type="button">
                Leave
            </button>

        </div>
    )
}

export default VideoCallSession