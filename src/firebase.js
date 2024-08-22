// import "dotenv/config";
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { doc, getFirestore, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBtPt6my4qgqPqBQ4jy3sLMmwIn1TTUEwQ",
  authDomain: "personal-finance-tracker-f1613.firebaseapp.com",
  projectId: "personal-finance-tracker-f1613",
  storageBucket: "personal-finance-tracker-f1613.appspot.com",
  messagingSenderId: "113433879965",
  appId: "1:113433879965:web:60e9363d385dbd221f3b74",
  measurementId: "G-VH2Z4WZEDH",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();
export { auth, db, doc, provider, setDoc };
