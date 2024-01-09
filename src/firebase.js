// Import the required functions from the Firebase modular SDK
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyCYSXHimdfjvZV8-FCkukdIEYkC9-_zOIM",
    authDomain: "linkedin-clone-1a5a5.firebaseapp.com",
    projectId: "linkedin-clone-1a5a5",
    storageBucket: "linkedin-clone-1a5a5.appspot.com",
    messagingSenderId: "577340444153",
    appId: "1:577340444153:web:0cdc11d77052009ce24128"
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);
const provider = new GoogleAuthProvider();
const storage = getStorage(firebaseApp);

// export const signInWithGoogle = () => {
//     signInWithPopup(auth, provider)
//     .then((result) => {
//         console.log(result);
//     })
//     .catch((error) => {
//         console.log(error);
//     })
// };

export { auth, provider, storage };
export default db;

