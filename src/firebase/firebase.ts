// import { initializeApp } from 'firebase/app';
import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyDvCEjXxhDek9HnHhEJKJNK5YGJpQ0UpsA',
  authDomain: 'ecommerce-1dbc1.firebaseapp.com',
  projectId: 'ecommerce-1dbc1',
  storageBucket: 'ecommerce-1dbc1.appspot.com',
  messagingSenderId: '334814072110',
  appId: '1:334814072110:web:6307746852de0e604f7ebf',
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();

export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

// export const auth = initializeApp(firebaseConfig);
