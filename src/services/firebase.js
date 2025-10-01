// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
import { getFirestore, collection, query, where, getDocs, addDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "SEU_API_KEY",
  authDomain: "SEU_AUTH_DOMAIN",
  projectId: "SEU_PROJECT_ID",
  storageBucket: "SEU_STORAGE_BUCKET",
  messagingSenderId: "SEU_MESSAGING_SENDER_ID",
  appId: "SEU_APP_ID"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const provider = new GoogleAuthProvider();

const loginWithGoogle = () => signInWithPopup(auth, provider);
const logout = () => signOut(auth);

const onAuthChange = (callback) => onAuthStateChanged(auth, callback);

async function checkAvailability(date, studio) {
  const bookingsRef = collection(db, "bookings");
  const q = query(bookingsRef, where("date", "==", date), where("studio", "==", studio));
  const querySnapshot = await getDocs(q);
  return querySnapshot.empty; // true se disponível
}

async function bookStudio(user, date, studio, service) {
  const isAvailable = await checkAvailability(date, studio);
  if (!isAvailable) throw new Error("Horário já está ocupado.");

  const now = new Date();
  const bookingDate = new Date(date);
  const diffHours = (bookingDate - now) / (1000 * 60 * 60);
  if (diffHours < 12) throw new Error("Agendamento deve ser feito com no mínimo 12h de antecedência.");

  await addDoc(collection(db, "bookings"), {
    userId: user.uid,
    userEmail: user.email,
    date,
    studio,
    service,
    createdAt: new Date().toISOString()
  });
}

export { auth, loginWithGoogle, logout, onAuthChange, bookStudio };
