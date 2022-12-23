

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
    const roomName = router?.query?.user;

    const ICE_SERVERS = {
        iceServers: [
            {
                urls: [
                    'stun:stun1.l.google.com:19302',
                    'stun:stun2.l.google.com:19302',
                ]
            }
        ],
        iceCandidatePoolSize: 10
    };

    // GLOBAL STATE 
    const pc = new RTCPeerConnection(ICE_SERVERS);
    let localStream: any = null;
    let remoteStream: any = null;






    const [micActive, setMicActive] = useState(true);
    const [cameraActive, setCameraActive] = useState(true);

    const userVideoRef = useRef<any>(null);
    const peerVideoRef = useRef<any>(null);
    const rtcConnectionRef = useRef<any>(null);
    const socketRef = useRef<any>(null);
    const userStreamRef = useRef<any>(null);
    const hostRef = useRef<boolean>(false);

    const webcamVideoRef = useRef<any>(null);
    const remoteVideoRef = useRef<any>(null);

    const callButtonRef = useRef<any>(null);
    const callInputRef = useRef<any>(null);
    const answerButtonRef = useRef<any>(null);


    const connection = MySocket._instance.connection;

    const webcamButtonRef = useRef<any>(null);


    useEffect(() => {
        
        if(connection){
            connection.emit('join', roomName);
        
        }

    }, [connection])

    var options = { mimeType: 'video/webm; codecs=vp9' };
    let mediaRecorder = null;

    let videoUrl = null;

    let recordedChunks: any[] = [];


    const webCamHandler = async () => {
        localStream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true,
        });

        remoteStream = new MediaStream();

        // Push tracks from local stream to peer connection
        localStream.getTracks().forEach((track: any) => {
            pc.addTrack(track, localStream);
        });

        // Pull tracks from remote stream, add to video stream
        pc.ontrack = (event) => {
            event.streams[0].getTracks().forEach((track) => {
                remoteStream.addTrack(track);
            });
        };

        webcamVideoRef.current.srcObject = localStream;
        remoteVideoRef.current.srcObject = remoteStream;

    };

    const callHandler = async () => {
        console.log('Starting callid generation .... ');
        // Reference Firestore collections for signaling

        /*const callDoc = firestore.collection('calls').doc();
        const offerCandidates = callDoc.collection('offerCandidates');
        const answerCandidates = callDoc.collection('answerCandidates');
        */


        callInputRef.current.value = roomName;  //callDoc.id;

        // Get candidates for caller, save to db
        pc.onicecandidate = (event) => {

            //alert(JSON.stringify(event));
            //event.candidate && offerCandidates.add(event.candidate.toJSON());



        };

        

        // Create offer
        const offerDescription = await pc.createOffer();
        await pc.setLocalDescription(offerDescription);

        const offer = {
            sdp: offerDescription.sdp,
            type: offerDescription.type,
        };

        alert("hei")


        connection.emit('offer', offer, roomName);


        //await callDoc.set({ offer });

        // Listen for remote answer
        /*callDoc.onSnapshot((snapshot) => {
            const data = snapshot.data();
            if (!pc.currentRemoteDescription && data?.answer) {
                const answerDescription = new RTCSessionDescription(data.answer);
                pc.setRemoteDescription(answerDescription);
            }
        });
        */

        // When answered, add candidate to peer connection
        /*answerCandidates.onSnapshot((snapshot) => {
            snapshot.docChanges().forEach((change) => {
                if (change.type === 'added') {
                    const candidate = new RTCIceCandidate(change.doc.data());
                    pc.addIceCandidate(candidate);
                }
            });
        });
        */

        // hangupButtonRef.current.disabled = false;
    };

    const answerHandler = async () => {

        /*console.log('Joining the call ....');
        const callId = callInputRef.current.value;
        const callDoc = firestore.collection('calls').doc(callId);
        const answerCandidates = callDoc.collection('answerCandidates');
        const offerCandidates = callDoc.collection('offerCandidates');

        pc.onicecandidate = (event) => {
            event.candidate && answerCandidates.add(event.candidate.toJSON());
        };
        console.log('pc', pc);

        const callData = (await callDoc.get()).data();

        const offerDescription = callData.offer;
        await pc.setRemoteDescription(new RTCSessionDescription(offerDescription));

        const answerDescription = await pc.createAnswer();
        await pc.setLocalDescription(answerDescription);

        const answer = {
            type: answerDescription.type,
            sdp: answerDescription.sdp,
        };

        await callDoc.update({ answer });

        offerCandidates.onSnapshot((snapshot) => {
            snapshot.docChanges().forEach((change) => {
                console.log(change);
                if (change.type === 'added') {
                    let data = change.doc.data();
                    pc.addIceCandidate(new RTCIceCandidate(data));
                }
            });
        });

        */
    };



    return (
        <div className="video-call-session">

            <video
                className="webcamVideo"
                ref={webcamVideoRef}
                autoPlay
                playsInline
            ></video>

            <video
                className="webcamVideo"
                ref={remoteVideoRef}
                autoPlay
                playsInline
            ></video>

            <button
                className='btn btn-sm-1x'
                onClick={webCamHandler}
                ref={webcamButtonRef}
            >
                Start webcam
            </button>
            <button
                className='btn btn-sm-1x'
                onClick={callHandler}
                ref={callButtonRef}
            >
                Create Call (offer)
            </button>

            <button
                className='btn btn-sm-1x'
                onClick={answerHandler}
                ref={answerButtonRef}
            >
                Answer
            </button>
            <div>
                <input ref={callInputRef} />
            </div>

        </div>
    )
}

export default VideoCallSession