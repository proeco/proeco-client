import { getAuth, GoogleAuthProvider } from '@firebase/auth';

import { initializeApp } from '@firebase/app';

const isProd = process.env.NODE_ENV === 'production';

const devConfig = {
  apiKey: 'AIzaSyAqqqO49JBwCwPtWFB3ejiwUTl23YWYqrU',
  authDomain: 'norse-analyst-328513.firebaseapp.com',
  projectId: 'norse-analyst-328513',
  appId: '1:580504140285:web:2c0959ceb65daccef38194',
};

const prodConfig = {
  apiKey: 'AIzaSyDl2T6yg7uh5xnHjfE-5dmHa8TJHtAPfHM',
  authDomain: 'proeco-prod.firebaseapp.com',
  projectId: 'proeco-prod',
  appId: '1:819977946051:web:fad4ad95e150f645037376',
};

export const auth = getAuth(initializeApp(isProd ? prodConfig : devConfig));
export const googleAuthProvider = new GoogleAuthProvider();
