import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, EmailAuthProvider, reauthenticateWithCredential, updatePassword } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBrrfnNfsXnnKFzbaEkYSxMpduywR6nyNY",
  authDomain: "ssd-projectupt.firebaseapp.com",
  databaseURL: "https://ssd-projectupt-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "ssd-projectupt",
  storageBucket: "ssd-projectupt.firebasestorage.app",
  messagingSenderId: "887894143853",
  appId: "1:887894143853:web:94ce211f6eefd30436a064",
  measurementId: "G-NKZRK5MKNY"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db= getFirestore(app);
const googleProvider = new GoogleAuthProvider();
const emailProvider = new EmailAuthProvider();


export { auth, googleProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, emailProvider, reauthenticateWithCredential, updatePassword, db };