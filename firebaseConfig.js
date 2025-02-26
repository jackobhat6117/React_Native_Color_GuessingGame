// firebaseConfig.js
import firebase from '@react-native-firebase/app';

import firestore from '@react-native-firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyB-H8tr6PJ6rLgmf6Ntf7xW4QaeImZX0oA",
  authDomain: "color-guessing-game-2bb27.firebaseapp.com",
  projectId: "color-guessing-game-2bb27",
  storageBucket: "color-guessing-game-2bb27.appspot.com",
  messagingSenderId: "678709528650",
  appId: "1:678709528650:web:c2ba0d10d4beca15a0feb3",
  measurementId: "G-LFGVH97ZL2"
};

// Initialize Firebase only if it hasn't been initialized already
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firestore , firebase}; // Export firestore
