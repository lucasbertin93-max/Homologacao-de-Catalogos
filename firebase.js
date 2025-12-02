// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, enableIndexedDbPersistence } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBKTdk0cOA_Qj2SbDw3ZRgQ4Rfkl8HL2AA",
  authDomain: "homologacaodecatalogos.firebaseapp.com",
  projectId: "homologacaodecatalogos",
  storageBucket: "homologacaodecatalogos.firebasestorage.app",
  messagingSenderId: "669256907388",
  appId: "1:669256907388:web:977616ce46cf19663fa7f9",
  measurementId: "G-VJDN405NJZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

// Enable offline persistence
enableIndexedDbPersistence(db).catch((err) => {
  if (err.code === 'failed-precondition') {
    console.warn('Persistência offline não disponível: múltiplas abas abertas');
  } else if (err.code === 'unimplemented') {
    console.warn('Persistência offline não suportada neste navegador');
  }
});

// Export Firebase instances
export { app, analytics, db };