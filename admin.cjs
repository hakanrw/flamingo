var admin = require("firebase-admin");

var serviceAccount = require("./.admin.json");

const app = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://vibing-flamingo-default-rtdb.europe-west1.firebasedatabase.app"
});


const firestore = app.firestore();
const users = firestore.collection("users");
const flames = firestore.collection("flames");