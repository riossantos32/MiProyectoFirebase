import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import {
  initializeAuth,
  getReactNativePersistence,
  browserLocalPersistence // Importar persistencia para web
} from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import 'react-native-get-random-values';
import 'react-native-url-polyfill/auto';
import { Platform } from 'react-native'; // Importar Platform

// Configuración Web de Firebase
const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
  databaseURL: process.env.EXPO_PUBLIC_FIREBASE_DATABASE_URL
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Servicios
// Configurar persistencia condicionalmente
const auth = initializeAuth(app, {
  persistence: Platform.OS === 'web'
    ? browserLocalPersistence
    : getReactNativePersistence(AsyncStorage)
});
const db = getFirestore(app);

export { app, auth, db };