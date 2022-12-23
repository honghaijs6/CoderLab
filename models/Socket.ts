// CONSTANCE
const ICE_SERVERS = {
    iceServers: [
        {
            urls: ['stun:openrelay.metered.ca:80'],
        },
    ],
    iceCandidatePoolSize: 10,
};

import SETTINGS from 'config/App.json';
import { encode, decode } from 'ultils/base64';
import io from 'socket.io-client';

interface iUserInfo {
    id: string;
    fullName: string;
    image?: string;
}
class MySocket {
    static _instance: MySocket;

    connection: any;
    private mainRoom: string;
    videoConRoom: string;
    private rooms: string[];

    hostRef: any;
    userStreamRef: any;
    userVideoRef: any;
    rtcConnectionRef: any;
    peerVideoRef: any;

    members: iUserInfo[];

    constructor() {
        if (!MySocket._instance) {
            MySocket._instance = this;
        }

        this.members = [];
        this.mainRoom = '';
        this.rooms = [];
        this.videoConRoom = '';

        return MySocket._instance;
    }

    test() {
        alert('ok');
    }
    /**
     *
     * INITIAL SOCKET AND START JOIN LIVECODE ROOM
     */
    async init(roomName: string, userInfo: iUserInfo, cb = (status: string) => {}) {
        await fetch('/api/socket');

        const ROOM_NAME = String(roomName).replace(/\./g, '');
        this.connection = io({
            reconnectionDelayMax: 10000,
            query: {
                roomName: ROOM_NAME,
                userId: userInfo?.id,
                userFullName: userInfo?.fullName,
            },
        });

        this.connection.on('connect', (socket: any) => {
            console.log('connected');

            this.joinRoom(
                'join_livecode',
                JSON.stringify({
                    roomName: ROOM_NAME,
                    userInfo,
                }),
            );

            this.addMember(userInfo);
            cb('connected');
        });
    }

    addMember(member: iUserInfo) {
        if (this.members.length === 0) {
            this.members.push(member);

            return;
        }
        this.members.forEach(item => {
            if (item?.id !== member?.id) {
                this.members.push(member);
            }
        });
    }

    /**
     * CLIENT JOIN ROOM
     */
    async joinRoom(eventName: string, roomName: string) {
        this.mainRoom = roomName;
        this.connection.emit(eventName, roomName);
    }

    /**
     * BROADCAST USER ACTION
     */
    async textUserAction(data = { from: '', text: '' }) {
        const { SOCKET_EVENTS } = SETTINGS;

        const strData = encode(JSON.stringify(data));
        this.connection.emit(SOCKET_EVENTS.CLIENT_SERVER.USER_ACTION, strData);
    }

    /**
     * BRODCAST USER ACTION
     */
    async actionChangeQuestion(data = { from: '', questionId: '' }) {
        try {
            //const { SOCKET_EVENTS } = SETTINGS;

            const strData = encode(JSON.stringify(data));
            this.connection.emit('user_action_change_question', strData);
        } catch {}
    }

    /**
     * BROADCAST USER TYPING
     */
    async textShot(data = { from: '', text: '' }) {
        try {
            const { SOCKET_EVENTS } = SETTINGS;

            const strData = encode(JSON.stringify(data));
            this.connection.emit(SOCKET_EVENTS.CLIENT_SERVER.IDE, strData);
        } catch {}
    }

    ////////////////////////// THIS SESSION FOR  VIDEO CONFERENCE /////////////////////////////

    iniConference(roomName: string, hostRef: any, userStreamRef: any, userVideoRef: any, rtcConnectionRef: any, peerVideoRef: any) {
        try {
            this.videoConRoom = roomName;
            this.joinRoom('join_conference', this.videoConRoom);
            this.hostRef = hostRef;
            this.userStreamRef = userStreamRef;
            this.userVideoRef = userVideoRef;
            this.rtcConnectionRef = rtcConnectionRef;
            this.peerVideoRef = peerVideoRef;

            this.listeningVideoCon();
        } catch {}
    }

    createPeerConnection() {
        // We create a RTC Peer Connection
        const pc = new RTCPeerConnection(ICE_SERVERS);

        // We implement our onicecandidate method for when we received a ICE candidate from the STUN server
        pc.onicecandidate = event => {
            if (event.candidate) {
                this.connection.emit('ice-candidate', event.candidate, this.videoConRoom);
            }
        };

        // We implement our onTrack method for when we receive tracks
        pc.ontrack = (event: any) => {
            this.peerVideoRef.current.srcObject = event.streams[0];
        };
        return pc;
    }

    /**
     * LISTENING VIDEO CON EVENTS
     */
    listeningVideoCon() {
        // START SESSION VIDEO CON
        this.connection.on('created', () => {
            try {
                this.hostRef.current = true;
                navigator.mediaDevices
                    .getUserMedia({
                        audio: true,
                        video: { width: 200, height: 200 },
                    })
                    .then(stream => {
                        /* use the stream */
                        this.userStreamRef.current = stream;
                        this.userVideoRef.current.srcObject = stream;
                        this.userVideoRef.current.onloadedmetadata = () => {
                            this.userVideoRef.current.play();
                        };
                    })
                    .catch(err => {
                        /* handle the error */
                        console.log(err);
                    });
            } catch {}
        });

        // WHEN PEER JOINED
        this.connection.on('joined', () => {
            navigator.mediaDevices
                .getUserMedia({
                    audio: true,
                    video: { width: 200, height: 200 },
                })
                .then(stream => {
                    /* use the stream */
                    this.userStreamRef.current = stream;
                    this.userVideoRef.current.srcObject = stream;
                    this.userVideoRef.current.onloadedmetadata = () => {
                        this.userVideoRef.current.play();
                    };
                    this.connection.emit('ready', this.videoConRoom);
                })
                .catch(err => {
                    /* handle the error */
                    console.log('error', err);
                });
        });

        //WHEN BOTH READY
        this.connection.on('ready', () => {
            if (this.hostRef.current) {
                this.rtcConnectionRef.current = this.createPeerConnection();
                this.rtcConnectionRef.current.addTrack(this.userStreamRef.current.getTracks()[0], this.userStreamRef.current);

                this.rtcConnectionRef.current.addTrack(this.userStreamRef.current.getTracks()[1], this.userStreamRef.current);

                this.rtcConnectionRef.current
                    .createOffer()
                    .then((offer: any) => {
                        try {
                            this.rtcConnectionRef.current.setLocalDescription(offer);
                            this.connection.emit('offer', offer, this.videoConRoom);
                        } catch (err) {
                            alert(err);

                            /*setTimeout(() => {
                                window.location.reload();
                            }, 2000);
                            */
                        }
                    })
                    .catch((error: any) => {
                        console.log(error);
                    });
            }
        });

        // WHEN OFFER
        this.connection.on('offer', (offer: any) => {
            //handleReceivedOffer
            try {
                if (!this?.hostRef?.current) {
                    try {
                        this.rtcConnectionRef.current = this.createPeerConnection();
                        this.rtcConnectionRef.current?.addTrack(this.userStreamRef.current.getTracks()[0], this.userStreamRef.current);
                        this.rtcConnectionRef.current?.addTrack(this.userStreamRef.current.getTracks()[1], this.userStreamRef.current);
                        this.rtcConnectionRef?.current?.setRemoteDescription(offer);

                        this.rtcConnectionRef?.current
                            .createAnswer()
                            .then((answer: any) => {
                                this.rtcConnectionRef.current.setLocalDescription(answer);
                                this.connection.emit('answer', answer, this.videoConRoom);
                            })
                            .catch((error: any) => {
                                console.log(error);
                            });
                    } catch {}
                }
            } catch {}
        });

        //WHEN AWNSER
        this.connection.on('answer', (anwser: any) => {
            //handleAnswer
            //alert("ANWSER")
            try {
                this.rtcConnectionRef.current?.setRemoteDescription(anwser).catch((err: any) => console.log(err));
            } catch {}
        });

        // HANDLE ICE CANDIDATE
        this.connection.on('ice-candidate', (incoming: any) => {
            //alert("IN COMMING")
            try {
                const candidate = new RTCIceCandidate(incoming);
                this.rtcConnectionRef?.current?.addIceCandidate(candidate).catch((e: any) => console.log(e));
            } catch (err) {
                alert(err);
                //window.location.reload();
            }
        });

        // WHEN LEAVE
        // WHEN USER LEAVE
        this.connection.on('leave', () => {
            try {
                //onPeerLeave
                // This person is now the creator because they are the only person in the room.
                this.hostRef.current = true;
                if (this.peerVideoRef.current.srcObject) {
                    this.peerVideoRef.current.srcObject.getTracks().forEach((track: any) => track.stop()); // Stops receiving all track of Peer.
                }

                // Safely closes the existing connection established with the peer who left.
                if (this.rtcConnectionRef.current) {
                    this.rtcConnectionRef.current.ontrack = null;
                    this.rtcConnectionRef.current.onicecandidate = null;
                    this.rtcConnectionRef.current.close();
                    this.rtcConnectionRef.current = null;
                }
            } catch {}
        });
    }

    leaveVideoCon() {
        try {
            this.connection.emit('leave', this.videoConRoom);

            if (this.userVideoRef?.current.srcObject) {
                this.userVideoRef?.current.srcObject.getTracks().forEach((track: any) => track.stop());
            }
            if (this.peerVideoRef?.current?.srcObject) {
                this.peerVideoRef?.current?.srcObject.getTracks().forEach((track: any) => track.stop());
            }

            // Checks if there is peer on the other side and safely closes the existing connection established with the peer.
            if (this.rtcConnectionRef?.current) {
                this.rtcConnectionRef.current.ontrack = null;
                this.rtcConnectionRef.current.onicecandidate = null;
                this.rtcConnectionRef.current.close();
                this.rtcConnectionRef.current = null;
            }
        } catch {}
    }
}

export default MySocket;
