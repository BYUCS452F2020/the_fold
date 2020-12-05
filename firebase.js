const admin = require('firebase-admin');
const serviceAccount = require('./the-fold-297721-b1398f24077e.json');

var docRef;
var db;

async function startFirebase() {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });

  db = admin.firestore();

  docRef = db.collection('users').doc('V4O9kspAcr7AouGksEiU');
  console.log("END");
}

// async function addData() 
let addData = async () => {
  await docRef.set({
    Email: 'Ada.lovelace@gmail.com',
    FullName: 'Ada Lovelace',
    UserID: 4593560
  });
};

let readData = async () => {
    const snapshot = await db.collection('users').get();
    snapshot.forEach((doc) => {
    console.log(doc.id, '=>', doc.data());
  });
};

// startFirebase();
// addData();
// readData();

module.exports = {
  startFirebase: startFirebase,
};


// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// var firebaseConfig = {
//   apiKey: "AIzaSyC6pTvTD_kbs3oiGATwyWdCTBDSobXYUec",
//   authDomain: "the-fold-2c238.firebaseapp.com",
//   databaseURL: "https://the-fold-2c238-default-rtdb.firebaseio.com",
//   projectId: "the-fold-2c238",
//   storageBucket: "the-fold-2c238.appspot.com",
//   messagingSenderId: "949025090246",
//   appId: "1:949025090246:web:71ba7b7985deab7c6385c7",
//   measurementId: "G-XWDKS61S9F"
// };
// // Initialize Firebase
// firebase.initializeApp(firebaseConfig);
// // Reference messages collection
// var messagesRef = firebase.database().ref('the_fold');
// firebase.analytics();

// <!-- The core Firebase JS SDK is always required and must be listed first -->
// <script src="https://www.gstatic.com/firebasejs/8.1.2/firebase-app.js"></script>

// <!-- TODO: Add SDKs for Firebase products that you want to use
//      https://firebase.google.com/docs/web/setup#available-libraries -->
// <script src="https://www.gstatic.com/firebasejs/8.1.2/firebase-analytics.js"></script>

// <script>
//   // Your web app's Firebase configuration
//   // For Firebase JS SDK v7.20.0 and later, measurementId is optional
//   var firebaseConfig = {
//     apiKey: "AIzaSyC6pTvTD_kbs3oiGATwyWdCTBDSobXYUec",
//     authDomain: "the-fold-2c238.firebaseapp.com",
//     databaseURL: "https://the-fold-2c238-default-rtdb.firebaseio.com",
//     projectId: "the-fold-2c238",
//     storageBucket: "the-fold-2c238.appspot.com",
//     messagingSenderId: "949025090246",
//     appId: "1:949025090246:web:71ba7b7985deab7c6385c7",
//     measurementId: "G-XWDKS61S9F"
//   };
//   // Initialize Firebase
//   firebase.initializeApp(firebaseConfig);
//   firebase.analytics();
// </script>
