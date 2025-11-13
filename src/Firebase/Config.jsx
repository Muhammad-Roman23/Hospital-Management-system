// // src/firebase.js
// import { initializeApp } from "firebase/app";
// // import { getAuth } from "firebase/auth";
// import { getFirestore } from "firebase/firestore";

// const firebaseConfig = {
//   apiKey: "AIzaSyCz2OiUpvAYD5rIYUvWd9Jwkld7bT05koQ",
//   authDomain: "hospital-management-d8401.firebaseapp.com",
//   projectId: "hospital-management-d8401",
//   storageBucket: "hospital-management-d8401.firebasestorage.app",
//   messagingSenderId: "326922167329",
//   appId: "1:326922167329:web:312c842fc079faa6f76f60"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);

// // export const auth = getAuth(app);
// export const db = getFirestore(app);



// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBPZk2E6cyKoO6CTXup_uVOuk2cI3_wJ0Y",
  authDomain: "new-hospital-managemet-system.firebaseapp.com",
  projectId: "new-hospital-managemet-system",
  storageBucket: "new-hospital-managemet-system.firebasestorage.app",
  messagingSenderId: "180598278812",
  appId: "1:180598278812:web:10951d3190a8aebd053b59"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);