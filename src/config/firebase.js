import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: 'AIzaSyBAQtJQiwTJ2woQ3JHhigeKOggQPXmkk_0',
  authDomain: 'gradial-rt.firebaseapp.com',
  projectId: 'gradial-rt',
  storageBucket: 'gradial-rt.firebasestorage.app',
  messagingSenderId: '542211895610',
  appId: '1:542211895610:web:e92aa5f72572586539a003',
  measurementId: 'G-9QBT21L5KJ',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app, analytics };
