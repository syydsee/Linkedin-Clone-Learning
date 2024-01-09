import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase";
import { SET_USER } from "./actionType";

// Action creator to set the user in the Redux state
export const setUser = (payload) => ({
  type: SET_USER,
  user: payload,
});

// Async action creator for Google sign-in
export const signInWithGoogle = () => async (dispatch) => {
  try {
    const result = await signInWithPopup(auth, provider);
    
    const user = result.user || result.additionalUserInfo?.user;
    
    if (user) {
      console.log('Sign-in successful:', user);
      dispatch(setUser(user));  // Dispatch the setUser action to update the Redux state
    } else {
      console.error('User information not found in the expected structure:', result);
    }
  } catch (error) {
    console.error('Sign-in error:', error.message);
  }
};

export function getUserAuth() {
  return (dispatch) => {
    auth.onAuthStateChanged(async (user) => {  // Fixed the arrow function syntax here
      if (user) {
        dispatch(setUser(user));
      }
    });
  };
}

export function singOutAPI() {
  return (dispatch) => {
    auth
      .signOut()
      .then(() => {
        dispatch(setUser(null));
      })
      .catch((error) => {
        console.log(error.message)
    });
  };
}


// import { signInWithPopup } from "firebase/auth";
// import {auth, provider} from "../firebase";
// import { SET_USER } from "./actionType";

// export const setUser = (payload) => ({
//   type: SET_USER,
//   user: payload
// });

// export function signInWithGoogle() {
//   return (dispatch) => {
//     auth
//       .signInWithPopup(provider)
//       .then((payload) => {
//         dispatch(setUser(payload.user))
//       })
//       .catch((error) => alert(error.message))
//   };
// }


// export const signInWithGoogle = async () => {
//   try {
//       const result = await signInWithPopup(auth, provider);
//       // Handle successful sign-in, e.g., update state or redirect
//       console.log('Sign-in successful:', result.user);
      
//   } catch (error) {
//       // Handle sign-in failure, e.g., display an error message
//       console.error('Sign-in error:', error.message);
//   }
// };


// import { signInWithPopup } from "firebase/auth";
// import { auth, provider } from "../firebase";

// export const signInWithGoogle = () => {
//   return async (dispatch) => {
//     try {
//       const payload = await auth.signInWithPopup(provider);
//       console.log(payload);
//     } catch (error) {
//       alert(error.message);
//     }
//   };
// };
