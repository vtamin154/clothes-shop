import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyD0j2YEOkaHfkxgYW0iEH6jO38lpfI6t5Q',
  authDomain: 'e-commerce-7dd93.firebaseapp.com',
  projectId: 'e-commerce-7dd93',
  storageBucket: 'e-commerce-7dd93.appspot.com',
  messagingSenderId: '184824631676',
  appId: '1:184824631676:web:5c337eefe313718f9514f9',
  measurementId: 'G-40LCBH91JP',
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

export { auth, db, storage };
// firebase deploy --only hosting:wendiesshop
