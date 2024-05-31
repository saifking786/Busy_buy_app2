
  import { initializeApp } from 'firebase/app';

  import { getFirestore } from 'firebase/firestore';


  const firebaseConfig = {
    apiKey: "AIzaSyDW8Qs5BcjLSDp6lQbMINWFVQJzq3_ZdZE",
    authDomain: "buybusy-redux-a69d4.firebaseapp.com",
    projectId: "buybusy-redux-a69d4",
    storageBucket: "buybusy-redux-a69d4.appspot.com",
    messagingSenderId: "846831202515",
    appId: "1:846831202515:web:bc7eb307cdf099a7c9a426"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);