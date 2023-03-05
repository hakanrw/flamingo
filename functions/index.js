const functions = require("firebase-functions");
const admin = require("firebase-admin");

const app = admin.initializeApp();

const createProfile = (userRecord, context) => {
  
  const db = admin.firestore();
  const { email, uid, displayName } = userRecord;

  return db
    .collection("users")
    .doc(uid)
    .set({ email, bio: "i use flamingo!" })
    .catch(console.error);
};

const addFlame = (data, context) => {
  let tags = data.tags || [];
  if (!Array.isArray(tags)) tags = [];
  tags = tags.slice(0, 8);

  let message = data.message || "";
  if (typeof(message) !== "string") message = "empty flame";
  message = message.substring(0, 400);

  const db = admin.firestore();
  return db
    .collection("flames")
    .doc()
    .set({ message: message, tags: tags || [], author: context.auth.uid, authorName: context.auth.token.name || null, authorPicture: context.auth.token.picture || null, createdAt: Date.now()})
}


module.exports = {
  authOnCreate: functions.auth.user().onCreate(createProfile),
  addFlame: functions.https.onCall(addFlame),
}