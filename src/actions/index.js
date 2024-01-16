import { signInWithPopup } from "firebase/auth";
import { auth, provider, storage } from "../firebase";
import db from "../firebase";
import { SET_USER, SET_LOADING_STATUS, GET_ARTICLES } from "./actionType";


// Action creator to set the user in the Redux state
export const setUser = (payload) => ({
  type: SET_USER,
  user: payload,
});

export const setLoading = (status) => ({
  type: SET_LOADING_STATUS,
  status: status,
});

export const getArticles = (payload) => ({
  type: GET_ARTICLES,
  payload: payload,
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

export function postArticleAPI(payload) {
  return (dispatch) => {
    dispatch(setLoading(true))

    const upload = payload.image ? storage.ref(`images/${payload.image.name}`).put(payload.image) : null;

    if (upload) {
      upload.on(
        "state_changed",
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Progress: ${progress}%`);
          
          if (snapshot.state === "RUNNING") {
            console.log(`Progress: ${progress}%`);
          }
        },
        (error) => {
          console.error("Upload error:", error.code);
        },
        async () => {
          try {
            const downloadURL = await upload.snapshot.ref.getDownloadURL();
            dispatch({
              type: "SET_UPLOAD_PROGRESS",
              payload: 100, // Assuming you have an action to update the upload progress
            });
            
            // Dispatch an action or perform any additional logic based on successful upload
            dispatch({
              type: "UPLOAD_SUCCESS",
              payload: downloadURL,
            });

            db.collection("articles").add({
              actor: {
                description: payload.user.email,
                title: payload.user.displayName,
                date: payload.timestamp,
                image: payload.user.photoURL,
              },
              video: payload.video,
              sharedImg: downloadURL,
              Comments: 0,
              description: payload.description,
            });
            dispatch(setLoading(false));
          } catch (error) {
            console.error("Error getting download URL:", error);
            // Handle the error or dispatch an action accordingly
          }
        }
      );
    } else if (payload.video) {
      db.collection("articles").add({
        actor: {
          description: payload.user.email,
          title: payload.user.displayName,
          date: payload.timestamp,
          image: payload.user.photoURL,
        },
        video: payload.video,
        sharedImg: "",
        Comments: 0,
        description: payload.description,
      });
      dispatch(setLoading(false));
    }
  };
}

export function getArticlesAPI(){
  return (dispatch) => {
    let payload;

    db.collection("articles")
      .orderBy("actor.date", "desc")
      .onSnapshot((snapshot)=> {
        payload = snapshot.docs.map((doc) => doc.data());
        dispatch(getArticles(payload));
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
