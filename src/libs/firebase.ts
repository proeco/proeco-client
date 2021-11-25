import { getAuth, GoogleAuthProvider } from '@firebase/auth';

import { initializeApp } from '@firebase/app';

const config = {
  apiKey: 'AIzaSyAqqqO49JBwCwPtWFB3ejiwUTl23YWYqrU',
  authDomain: 'norse-analyst-328513.firebaseapp.com',
  projectId: 'norse-analyst-328513',
  storageBucket: 'norse-analyst-328513.appspot.com',
  messagingSenderId: '580504140285',
  appId: '1:580504140285:web:2c0959ceb65daccef38194',
};

export const auth = getAuth(initializeApp(config));
export const googleAuthProvider = new GoogleAuthProvider();
