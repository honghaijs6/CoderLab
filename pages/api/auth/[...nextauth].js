import NextAuth from 'next-auth/next';
import GoogleProvider from 'next-auth/providers/google';
import { FirestoreAdapter } from '@next-auth/firebase-adapter';

export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
    ],
    debug: true,
    adapter: FirestoreAdapter({
        apiKey: 'AIzaSyC2vESy2N5_48UQNkjo0sscKlxbVsl_MJo',
        authDomain: 'coderlab-9c523.firebaseapp.com',
        databaseURL: 'https://coderlab-9c523-default-rtdb.asia-southeast1.firebasedatabase.app',
        projectId: 'coderlab-9c523',
        storageBucket: 'coderlab-9c523.appspot.com',
        messagingSenderId: '121900739895',
        appId: '1:121900739895:web:a87e619ae39268dcdb7eb2',
        measurementId: 'G-4TP3EQTEBH',
    }),
    secret: process.env.JWT_SECRET,
};

export default NextAuth(authOptions);
