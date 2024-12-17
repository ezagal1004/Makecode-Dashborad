import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAEDFjAOUg3S7_09NDSxYd--rluYKR6Ujw",
  authDomain: "makecode-schools-dashboard.firebaseapp.com",
  databaseURL: "https://makecode-schools-dashboard-default-rtdb.firebaseio.com",
  projectId: "makecode-schools-dashboard",
  storageBucket: "makecode-schools-dashboard.firebasestorage.app",
  messagingSenderId: "214515714586",
  appId: "1:214515714586:web:101db74a42befb94295fa3",
  measurementId: "G-344NZRW7HT"
};
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database };
