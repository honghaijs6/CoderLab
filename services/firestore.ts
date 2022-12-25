import db from 'config/firebase';

import { collection, getDocs, onSnapshot } from 'firebase/firestore';

export const getNotes = () => {
    return new Promise(resolve => {
        const noteRef = collection(db, 'users');

        //const notesList = notesSnapshot.docs.map((doc) => doc.data());

        onSnapshot(noteRef, snapshot => {

            console.log(snapshot);
            
            resolve(
                snapshot.docs.map(doc => {
                    return {
                        id: doc.id,
                        ...doc.data(),
                    };
                })
            )
        });
    });
};
