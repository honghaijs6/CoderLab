export interface iResEventIDE {
    from: string; // THE LASTES UID POST ON SESSION
    text: string; // CURRENT TEXT AT THE SESSION
    console: string | null;
}

export interface iUserInfo {
    id: string;
    fullName?: string;
    image?:string
    name?:string
}

export interface iResSessionInfo {
    from: string; // FROM THE LAST USER ID
    text: string; // CURRENT ROOM CODE TEXT
    console: string;
    members: iUserInfo[]; // ALL MEMBERS ON THIS SESSION
}

export interface iRoomData {
    [key: string]: iResSessionInfo;
}

class LiveSession {
    static _instance: any;
    rooms: iRoomData;
    constructor() {
        this.rooms = {};

        if (!LiveSession._instance) {
            LiveSession._instance = this;
        }
        return LiveSession._instance;
    }

    initRoom(roomName: string, userId: string, userFullName: string) {
        console.log('::: ROOM CREATED ::: ');

        try {
            this.setInfo(roomName, {
                from: userId,
                text: '',
                console: '',
                members: [{ id: userId, fullName: userFullName }],
            });
        } catch {}
    }

    getInfo(roomName: string) {
        return this.rooms[roomName];
    }

    setInfo(roomName: string, data: iResSessionInfo) {
        this.rooms[roomName] = data;
    }

    isExistedRooom(roomName: string) {
        return Boolean(this.rooms[roomName]);
    }

    addMember(roomName: string, userId: string, userFullName: string) {
        try {
            if (!this.rooms[roomName]?.members?.some((i: iUserInfo) => i.id === userId)) {
                this.rooms[roomName].members.push({
                    id: userId,
                    fullName: userFullName,
                });
            }
        } catch {}
    }

    updateContent(roomName: string, data: iResEventIDE) {
        this.rooms[roomName].from = data.from;
        this.rooms[roomName].text = data.text;
        this.rooms[roomName].console = data.console || '';
    }
}

export default LiveSession;
