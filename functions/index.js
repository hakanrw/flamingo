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

const addFlame = async (data, context) => {
  if (!context.auth) return { message: "you need to authorize", status: "error" };
  
  let authorName = context.auth.token.name || null;
  let authorPicture = context.auth.token.picture || null;
  const author = context.auth.uid;

  const isAdmin = context.auth.token.email === "imparatorahmett@gmail.com";

  let tags = data.tags || [];
  if (!Array.isArray(tags)) tags = [];
  tags = tags.slice(0, 8);
  tags = tags.map(tag => tag.trim().substring(0, 20));

  let message = data.message || "";
  if (typeof(message) !== "string") message = "empty flame";
  message = message.substring(0, 400);

  const db = admin.firestore();

  // SPAM PROTECTION BEGIN
  const spamProtection = await Promise.all([
    db.collection("flames").where("author", "==", author).orderBy("createdAt", "desc").limit(1).get(),
    db.collection("flames").where("author", "==", author).where("createdAt", ">=", Date.now() - 60 * 60 * 1000).count().get(),
    db.collection("server").doc("status").get(),
  ]);

  if (spamProtection[2].data() && spamProtection[2].data().code === "down" && !isAdmin) {
    return { message: "server is temporarily closed", status: "error" };
  }
  
  if (spamProtection[1].data().count >= 10) {
    return { message: "you can send 10 flames in an hour maximum.", status: "error" };
  }

  if (!isAdmin && tags.includes("admin")) {
    tags = tags.filter(tag => tag != "admin");
  }

  const lastMsg = await spamProtection[0];
  let recentMessage = false;

  lastMsg.forEach(doc => {
    if (Date.now() - doc.get("createdAt") < 8000) recentMessage = true;
  });
  if (recentMessage) return { message: "you are too fast", status: "error" };
  
  // SPAM PROTECTION END


  if (isAdmin && tags.includes("admin")) {
    authorName = "ADMIN";
    authorPicture = "https://flamingo.candar.dev/avatar.jpg";
  }


  await db
    .collection("flames")
    .doc()
    .set({ message, tags, author, authorName, authorPicture, createdAt: Date.now()});

  return { message: "successfully sent flame", status: "success" };
}


module.exports = {
  authOnCreate: functions.region("europe-west1").auth.user().onCreate(createProfile),
  addFlame: functions.region("europe-west1").https.onCall(addFlame),
}