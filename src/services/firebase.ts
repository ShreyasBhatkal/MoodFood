import { initializeApp, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getStorage, FirebaseStorage } from 'firebase/storage';
import { getAnalytics, Analytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY || 'your-api-key',
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || 'moodmeal-app.firebaseapp.com',
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || 'moodmeal-app',
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || 'moodmeal-app.appspot.com',
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || '123456789',
  appId: process.env.REACT_APP_FIREBASE_APP_ID || '1:123456789:web:abcdef123456789',
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID || 'G-ABCDEF123456'
};

// Initialize Firebase
const app: FirebaseApp = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth: Auth = getAuth(app);
export const db: Firestore = getFirestore(app);
export const storage: FirebaseStorage = getStorage(app);
export const analytics: Analytics = getAnalytics(app);

export default app;