import firebase from 'firebase';

export const config = {
    apiKey: "AIzaSyCSxis-Mr0zUYdKr1Mv1fZdk0-DJ9TravM",
    authDomain: "ecommerce-4ed8f.firebaseapp.com",
    projectId: "ecommerce-4ed8f",
    storageBucket: "ecommerce-4ed8f.appspot.com",
    messagingSenderId: "783075302486",
    appId: "1:783075302486:web:be18c2b36fe6ab02c2aff7"
};


export const firebaseApp = firebase.initializeApp(config);