import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCC2-1LM_3rdmyA0QP32SFiO_4aiRZGtAr",
  authDomain: "project-manager-9acfc.firebaseapp.com",
  projectId: "project-manager-9acfc",
  storageBucket: "project-manager-9acfc.appspot.com",
  messagingSenderId: "912773092864",
  appId: "1:912773092864:web:339d63ebe3b5103a6baae5"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
