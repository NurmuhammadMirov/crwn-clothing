import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBOmtnBoeb-l8Rhnf0BzgImSKztLqlBA80",
  authDomain: "crwn-clothing-db-7d222.firebaseapp.com",
  projectId: "crwn-clothing-db-7d222",
  storageBucket: "crwn-clothing-db-7d222.appspot.com",
  messagingSenderId: "486296649748",
  appId: "1:486296649748:web:bedd264bcc2a211cee6701"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account"
});

export const auth = getAuth();
export const singInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {
  if (!userAuth) return;

  const userDocRef = doc(db, 'users', userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation
      });
    } catch (error) {
      console.log('error create the user', error.message)
    }
  }

  return userDocRef;
};


export const createAuthUserWithEmailandPassowrd = async (email, password) => {
  if(!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};


export const signInAuthUserWithEmailandPassowrd = async (email, password) => {
  if(!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};