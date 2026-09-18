import firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCtYdgC0Be1IDQ7FhBio2vAelHXfEeSpEM",
  authDomain: "devtter-deefe.firebaseapp.com",
  projectId: "devtter-deefe",
  storageBucket: "devtter-deefe.firebasestorage.app",
  messagingSenderId: "1075038681801",
  appId: "1:1075038681801:web:7d6e78dede24b319096b18",
  measurementId: "G-83F8D3Y0Y2"
};

!firebase.apps.length && firebase.initializeApp(firebaseConfig);

const mapUserFromFirebaseAuthToUser = user => {
  const { displayName, email, photoURL } = user;

  return {
    avatar: photoURL,
    email,
    name: displayName
  };
};

export const onAuthStateChanged = onChange => {
  return firebase.auth().onAuthStateChanged(user => {
    if (!user) return;
    else {
      const normalizedUser = mapUserFromFirebaseAuthToUser(user);
      onChange(normalizedUser);
    }
  });
};

export const loginWithGitHub = () => {
  const githubProvider = new firebase.auth.GithubAuthProvider();
  return firebase.auth().signInWithPopup(githubProvider);
};
