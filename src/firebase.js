import firebase from "firebase";
const firebaseConfig = {
    apiKey: "******************",
    authDomain: "********************",
    projectId: "netflix-clone-c9d3d",
    storageBucket: "**************",
    messagingSenderId: "*******************",
    appId: "**********************"
  };
  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth=firebase.auth();
  export {auth};
  export default db;
