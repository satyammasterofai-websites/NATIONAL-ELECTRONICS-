import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { initializeFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyDiwbxZIGnJSnck03wcevvEji9UG9MyIWw",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "national-electronic-55efb.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "national-electronic-55efb",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "national-electronic-55efb.firebasestorage.app",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "700987324447",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:700987324447:web:abe9db6c8448e77b99fd2a",
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || "G-X6STZBSG84"
};

// Initialize Firebase
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = initializeFirestore(app, { experimentalForceLongPolling: true });

// Collection Names
export const COLLECTIONS = {
  HERO: "hero",
  OFFERS: "offers",
  PRODUCTS: "products",
  BRANDS: "brands",
  REVIEWS: "reviews",
  GALLERY: "gallery",
  OWNER: "owner",
  ABOUT: "about",
  SETTINGS: "settings",
  SEO: "seo",
  CONTACT_MESSAGES: "contactMessages"
};
