import { API_KEY, APP_ID } from '@env';

// firebaseConfig.js
import firebase from '@react-native-firebase/app';

import firestore from '@react-native-firebase/firestore';

const firebaseConfig = {
  apiKey:API_KEY,
  authDomain: "color-guessing-game-2bb27.firebaseapp.com",
  projectId: "color-guessing-game-2bb27",
  storageBucket: "color-guessing-game-2bb27.appspot.com",
  messagingSenderId: "678709528650",
  appId: APP_ID,
  measurementId: "G-LFGVH97ZL2"
};

// Initialize Firebase only if it hasn't been initialized already
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firestore , firebase}; // Export firestore
