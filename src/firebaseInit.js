
  import { initializeApp } from 'firebase/app';
  import { getAuth } from 'firebase/auth';
  import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyCBdcZzwUeVtEqVqNCxvb6rwiaLb3NpVY4",
  authDomain: "buybusynew.firebaseapp.com",
  projectId: "buybusynew",
  storageBucket: "buybusynew.appspot.com",
  messagingSenderId: "677315938753",
  appId: "1:677315938753:web:16ee159309848ef61c4740"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);