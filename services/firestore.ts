import db from 'config/firebase';
import {
    collection,
    onSnapshot,
    doc,
    addDoc,
    updateDoc,
    setDoc,
    getDocs,
    where,
    limit,
    orderBy,
    query,
    QuerySnapshot,
    deleteDoc,
} from '@firebase/firestore';

/**
 * THIS IS GET DOCUMENT FIRESTORE
 */
export const doGet = async (colName: string, UserId: string = '') => {
    try {
        const colRef = collection(db, colName);
        const q = query(colRef, where('UserId', '==', UserId));

        // THIS IS REALTIME CHANGE
        /*onSnapshot(q, snapshot => {
            const list = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
            resolve(list);
        });
        */

        const querySnapshot = await getDocs(q);
        let list: any = [];

        querySnapshot.forEach(doc => {
            list.push({
                id: doc.id,
                ...doc.data(),
            });
        });

        return list;
    } catch (err) {
        console.log('::: CATCHER AT doGet()::::');
        console.log(err);
        return;
    }
};

export const doPost = async (colName: string, postData: any) => {
    try {
        return await addDoc(collection(db, colName), postData).catch(err => console.error(err));
    } catch (err) {
        console.log(':::: CATCHER AT DO POST :::');
        console.log(err);
        return;
    }
};

export const doUpdate = async (colName: string = '', id = '', postData: any) => {
    try {
        const docRef = doc(db, colName, id);
        return await updateDoc(docRef, postData);
    } catch (err) {
        console.log('::: CATCHER AT doUpdate()');
        console.log(err);
    }
};

export const doDelete = async (colName = '', id = '') => {
    try {
        return await deleteDoc(doc(db, colName, id));
    } catch (err) {
        console.log(':: CATCHER doDelete :::');
        console.log(err);
    }
};
