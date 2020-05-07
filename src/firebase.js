import firebase from '@firebase/app'
import 'firebase/firestore'
import 'firebase/firebase-auth'
import 'firebase/storage'

  //web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyAmej3dIH-n5ncCk6PD_HGOAlf5-i_TOx0",
    authDomain: "ecom-shop-c3228.firebaseapp.com",
    databaseURL: "https://ecom-shop-c3228.firebaseio.com",
    projectId: "ecom-shop-c3228",
    storageBucket: "ecom-shop-c3228.appspot.com",
    messagingSenderId: "578652784311",
    appId: "1:578652784311:web:c7378ec17f7631eda9af32",
    measurementId: "G-JQLH51NC86"
  };
  // Initialize Firebase
  const fb = firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();
  export {fb,db}
