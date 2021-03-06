import firebase from "firebase/app";
import "firebase/auth";
import "firebase/functions";
import "firebase/firestore";
import "firebase/storage";

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE,
  });
}

const db = firebase.firestore();

const mapUserFromFirebaseAuthToUser = (user) => {
  const { displayName, email, photoURL, uid } = user;

  return {
    avatar: photoURL,
    username: displayName,
    email,
    uid,
  };
};

export const onAuthStateChanged = (onChange) => {
  return firebase.auth().onAuthStateChanged((user) => {
    const normalizedUser = user ? mapUserFromFirebaseAuthToUser(user) : null;
    onChange(normalizedUser);
  });
};

export const loginWithGitHub = () => {
  const githubProvider = new firebase.auth.GithubAuthProvider();
  return firebase.auth().signInWithPopup(githubProvider);
};

export const addDevit = ({ avatar, content, img, userId, userName }) => {
  return db.collection("devits").add({
    avatar,
    content,
    img,
    userId,
    userName,
    createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
    likesCount: 0,
    sharedCount: 0,
  });
};

const mapDevitFromFirabaseToDevitObject = (doc) => {
  const data = doc.data();
  const id = doc.id;
  const { createdAt } = data;
  return {
    ...data,
    id,
    createdAt: +createdAt.toDate(),
  };
};

export const listenLatestDevits = (callback) => {
  return db
    .collection("devits")
    .orderBy("createdAt", "desc")
    .limit(20)
    .onSnapshot(({ docs }) => {
      const newDevists = docs.map(mapDevitFromFirabaseToDevitObject);
      callback(newDevists);
    });
};

export const fetchLatestDevits = () => {
  return db
    .collection("devits")
    .get()
    .then(({ docs }) => {
      const newDevists = docs.map(mapDevitFromFirabaseToDevitObject);
      return newDevists;
    });
};

export const uploadImage = (file) => {
  const ref = firebase.storage().ref(`images/${file.name}`);
  const task = ref.put(file);
  return task;
};
