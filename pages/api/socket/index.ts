import SETTINGS from 'config/App.json';
import { decode, encode } from 'ultils/base64';

import type { NextApiRequest, NextApiResponse } from 'next';
import { Server } from 'socket.io';

import LiveSession, { iResEventIDE, iUserInfo, iResSessionInfo, iRoomData } from './LiveSession';

import compileCode from './compileCode';

const ls = new LiveSession();

export default async function SocketHandler(req: NextApiRequest, res: any) {
    const { SOCKET_EVENTS } = SETTINGS;

    if (res?.socket?.server?.io) {
        console.log('Socket is already attached');
        return res.end();
    }

    const io = new Server(res.socket.server);
    res.socket.server.io = io;

    io.on('connection', (socket: any) => {
        console.log(`User Connected :${socket.id}`);

        console.log('::: NEW ONE CONNECTED TO THE ROOM:::');
        // CONNECT AND JOIN INTO A ROOM
        const query = socket.handshake.query;

        //socket.join(query?.roomName);

        // INITIAL ROOM
        if (!ls.isExistedRooom(query?.roomName)) {
            ls.initRoom(query?.roomName, query?.userId, query?.userFullName);
        } else {
            ls.addMember(query.roomName, query?.userId, query?.userFullName);
            // NOTIFY NEW MEMBER COME
            const resNewMember: iResSessionInfo = ls.rooms[query?.roomName];

            // EMIT ON EVENT NEW MEMBER
            const encResNewMember = encode(JSON.stringify(resNewMember.members));
            socket.in(query?.roomName).emit(SOCKET_EVENTS.SERVER_CLIENT.NEW_MEMBER, encResNewMember);

            // EMIT ON EVENT IDE CHANGE
            const enCodeMessageIDE = encode(JSON.stringify(ls.getInfo(query?.roomName)));
            socket.in(query?.roomName).emit(SOCKET_EVENTS.SERVER_CLIENT.IDE, enCodeMessageIDE);
        }

        // EVENTS ON USER ACTION
        socket.on(SOCKET_EVENTS.CLIENT_SERVER.USER_ACTION, async (postData: string) => {
            console.log(':: LISTENING EVENT USER ACTIONS :::');

            const data: iResEventIDE = JSON.parse(decode(postData));
            if (!data) return;

            //data.console = await compileCode(String(data.text).trim(), query?.roomName);

            //console.log('RUN CODE HERE');
            //console.log(data.console);

            if (ls.isExistedRooom(query?.roomName)) {
                ls.updateContent(query?.roomName, data);
            }

            const enCodeMessage = encode(JSON.stringify(ls.rooms[query?.roomName]));
            socket.in(query?.roomName).emit(SOCKET_EVENTS.SERVER_CLIENT.IDE, enCodeMessage);
        });

        // EVENTS ON IDE TEXT CHANGE
        socket.on(SOCKET_EVENTS.CLIENT_SERVER.IDE, async (postData: string) => {
            console.log(':: LISTENING EVENT IDE CHANGE :::');

            const data: iResEventIDE = JSON.parse(decode(postData));
            if (!data) return;

            //data.console = await compileCode(String(data.text).trim(), query?.roomName);

            //console.log('RUN CODE HERE');
            //console.log(data.console);

            if (ls.isExistedRooom(query?.roomName)) {
                ls.updateContent(query?.roomName, data);
            }

            const enCodeMessage = encode(JSON.stringify(ls.rooms[query?.roomName]));
            socket.in(query?.roomName).emit(SOCKET_EVENTS.SERVER_CLIENT.IDE, enCodeMessage);
        });

        // EVENT ON USER ACTIONS CHANGE
        //user_action
        socket.on('user_action_change_question', async (strData: string) => {
            console.log(':: LISTENING user_action_change_question :::');

            const data: iResEventIDE = JSON.parse(decode(strData));
            if (!data) return;

            console.log(data);

            const enCodeMessage = encode(JSON.stringify(strData));
            socket.in(query?.roomName).emit('on_user_action_change_question', enCodeMessage);
        });

        // EVENT ON JOIN LIVE CODE
        socket.on('join_livecode', (strData: string) => {
            try {
                const data = JSON.parse(strData);

                socket.join(data?.roomName);
                const enCodeMessage = encode(JSON.stringify(ls.rooms[query?.roomName]));
                socket.in(data?.roomName).emit('on_join_livecode', enCodeMessage);
                // SEND TO ME
                //socket.emit('on_join_livecode', enCodeMessage);
            } catch {}
        });

        //////////////////////// /////////////////////////////////////////

        // Triggered when a peer hits the join room button.
        socket.on('join_conference', (roomName: string) => {
            const { rooms } = io.sockets.adapter;
            const room = rooms.get(roomName);

            console.log('::: EVENT JOIN ::::');

            // room == undefined when no such room exists.

            console.log('::: ROOM SIZE :::');
            console.log(room?.size);
            console.log('ROOM NAME: ' + roomName);
            console.log(room);

            if (room === undefined) {
                socket.join(roomName);
                socket.emit('created');
            } else if (room.size === 1) {
                // room.size == 1 when one person is inside the room.
                socket.join(roomName);
                socket.emit('joined');
            } else {
                // when there are already two people inside the room.
                socket.emit('full');
            }
            console.log('::: VIEW ROOMS :::');
            console.log(rooms);
        });

        // Triggered when the person who joined the room is ready to communicate.
        socket.on('ready', (roomName: any) => {
            console.log('::: READY ::::');
            socket.broadcast.to(roomName).emit('ready'); // Informs the other peer in the room.
        });

        // Triggered when server gets an icecandidate from a peer in the room.
        socket.on('ice-candidate', (candidate: RTCIceCandidate, roomName: string) => {
            console.log('::: EVENT ice-candidate ::::');
            console.log(candidate);
            socket.broadcast.to(roomName).emit('ice-candidate', candidate); // Sends Candidate to the other peer in the room.
        });

        // Triggered when server gets an offer from a peer in the room.
        socket.on('offer', (offer: any, roomName: any) => {
            console.log('::: EVENT OFFER :::');

            socket.broadcast.to(roomName).emit('offer', offer); // Sends Offer to the other peer in the room.
        });

        // Triggered when server gets an answer from a peer in the room.
        socket.on('answer', (answer: any, roomName: any) => {
            console.log('::: EVENT ANWSER ::::');

            socket.broadcast.to(roomName).emit('answer', answer); // Sends Answer to the other peer in the room.
        });

        socket.on('leave', (roomName: any) => {
            socket.leave(roomName);
            socket.broadcast.to(roomName).emit('leave');
        });
    });

    /*if (res?.socket?.server?.io) {
        console.log('Socket is already running');

        require('events').EventEmitter.prototype._maxListeners = 100;

        res?.socket?.server?.io.on('connection', (socket: any) => {
            console.log('::: NEW ONE CONNECTED TO THE ROOM:::');
            // CONNECT AND JOIN INTO A ROOM
            const query = socket.handshake.query;
            socket.join(query?.roomName);

            // INITIAL ROOM

            if (!ls.isExistedRooom(query?.roomName)) {
                ls.initRoom(query?.roomName, query?.userId, query?.userFullName);
            } else {
                ls.addMember(query.roomName, query?.userId, query?.userFullName);
                // NOTIFY NEW MEMBER COME
                const resNewMember: iResSessionInfo = ls.rooms[query?.roomName];

                // EMIT ON EVENT NEW MEMBER
                const encResNewMember = encode(JSON.stringify(resNewMember.members));
                socket.in(query?.roomName).emit(SOCKET_EVENTS.SERVER_CLIENT.NEW_MEMBER, encResNewMember);

                // EMIT ON EVENT IDE CHANGE
                const enCodeMessageIDE = encode(JSON.stringify(ls.getInfo(query?.roomName)));
                socket.in(query?.roomName).emit(SOCKET_EVENTS.SERVER_CLIENT.IDE, enCodeMessageIDE);
            }

            // EVENTS ON IDE TEXT CHANGE
            socket.on(SOCKET_EVENTS.CLIENT_SERVER.IDE, async (postData: string) => {
                console.log(':: LISTENING EVENT IDE CHANGE :::');

                const data: iResEventIDE = JSON.parse(decode(postData));
                if (!data) return;

                //data.console = await compileCode(String(data.text).trim(), query?.roomName);

                //console.log('RUN CODE HERE');
                //console.log(data.console);

                if (ls.isExistedRooom(query?.roomName)) {
                    ls.updateContent(query?.roomName, data);
                }

                const enCodeMessage = encode(JSON.stringify(ls.rooms[query?.roomName]));
                socket.in(query?.roomName).emit(SOCKET_EVENTS.SERVER_CLIENT.IDE, enCodeMessage);
            });
        });
    } else {
        console.log('Socket is initializing');
        const io = new Server(res.socket.server);
        res.socket.server.io = io;
    }
    */

    return res.end();
}
