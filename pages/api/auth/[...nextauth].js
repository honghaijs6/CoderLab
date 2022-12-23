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
        apiKey: process.env.API_KEY,
        authDomain: process.env.AUTH_DOMAIN,
        projectId: process.env.PROJECT_ID,
        storageBucket: process.env.STORAGEBUCKET,
        messagingSenderId: process.env.MESSAGESENDERID,
        appId: process.env.APPID,
        measurementId: process.env.MEASUREMENTID,
        databaseURL: process.env.DATABASEURL,
    }),
    secret: process.env.JWT_SECRET,
};

export default NextAuth(authOptions);
