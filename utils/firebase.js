import firebase from "firebase/app";
import "firebase/auth";
import "firebase/functions";
import "firebase/firestore";

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  });
}

const mapUserFromFirebaseAuthToUser = (user) => {
  const { displayName, email, photoUrl } = user;

  return {
    avatar: photoUrl,
    username: displayName,
    email: email,
  };
};

export const onAuthStateChanged = (onChange) => {
  return firebase.auth().onAuthStateChanged((user) => {
    const normalizeduser = mapUserFromFirebaseAuthToUser(user);
    onChange(normalizeduser);
  });
};

export const loginWithGitHub = () => {
  const githubProvider = new firebase.auth.githubProvider();
  return firebase.auth().signInWithPopup(githubProvider);
};

export default firebase;
