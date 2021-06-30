import firebase from 'firebase/app';
const firebaseConfig = {
    apiKey: "AIzaSyDLw8GW7n6Esn_4OtxpfDppC_8c-lqdpwc",
    authDomain: "radio-22579.firebaseapp.com",
    projectId: "radio-22579",
    storageBucket: "radio-22579.appspot.com",
    messagingSenderId: "1041676080851",
    appId: "1:1041676080851:web:bd213bf260fb60b923e626"
  };

const fire=firebase.initializeApp(firebaseConfig);
export default fire;