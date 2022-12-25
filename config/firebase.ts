import { initializeApp } from '@firebase/app';
import { getFirestore } from '@firebase/firestore';

const credentials = {
    apiKey: 'AIzaSyC2vESy2N5_48UQNkjo0sscKlxbVsl_MJo',
    authDomain: 'coderlab-9c523.firebaseapp.com',
    databaseURL: 'https://coderlab-9c523-default-rtdb.asia-southeast1.firebasedatabase.app',
    projectId: 'coderlab-9c523',
    storageBucket: 'coderlab-9c523.appspot.com',
    messagingSenderId: '121900739895',
    appId: '1:121900739895:web:a87e619ae39268dcdb7eb2',
    measurementId: 'G-4TP3EQTEBH',
};

const firebaseApp = initializeApp(credentials);
const db = getFirestore(firebaseApp);

export default db;
