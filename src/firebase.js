import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAWHkoKWwDu3uu7f9xY9mTTOz1VPCtlPmE",
    authDomain: "crud-app-aaaf8.firebaseapp.com",
    projectId: "crud-app-aaaf8",
    storageBucket: "crud-app-aaaf8.appspot.com",
    messagingSenderId: "755296398784",
    appId: "1:755296398784:web:325b4495ee99eb19eb2c25"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

export default db;