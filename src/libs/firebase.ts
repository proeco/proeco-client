import { getAuth, GoogleAuthProvider } from '@firebase/auth';

import { initializeApp } from '@firebase/app';

const config = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || 'AIzaSyAqqqO49JBwCwPtWFB3ejiwUTl23YWYqrU',
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || 'norse-analyst-328513.firebaseapp.com',
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'norse-analyst-328513',
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || '1:580504140285:web:2c0959ceb65daccef38194',
};

export const auth = getAuth(initializeApp(config));
export const googleAuthProvider = new GoogleAuthProvider();
