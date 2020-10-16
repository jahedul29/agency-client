import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "../../firebase.config";

// function for initializing login framework
export const initializeLoginFramework = () => {
  if (firebase.app.length) {
    firebase.initializeApp(firebaseConfig);
  }
};

// Google sign In handler
export const handleGoogleSignIn = () => {
  var provider = new firebase.auth.GoogleAuthProvider();

  return firebase
    .auth()
    .signInWithPopup(provider)
    .then((res) => {
      var user = res.user;
      const newUser = {
        name: user.displayName,
        email: user.email,
        photo: user.photoURL,
      };
      // setUserToken();
      return newUser;
      // ...
    })
    .catch(function (error) {
      // Handle Errors here.
      console.log(error.message);
      // ...
    });
};

// Email and Password account creator handler
export const handleCreateWithEmailAndPassword = (name, email, password) => {
  return firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((res) => {
      updateCurrentUserInfo(name);
      const newUser = {
        name: name,
        email: email,
      };
      sendEmailVerification();
      return newUser;
    })
    .catch((error) => {
      console.log("From create method", error.message);
      return error.message;
    });
};

// Email and Password login handler
export const handleSignInWithEmailAndPassword = (email, password) => {
  return firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((res) => {
      if (!res.user.emailVerified) {
        return "Check your email to confirm your account";
      }
      const newUser = {
        name: res.user.displayName,
        email: res.user.email,
      };
      // setUserToken();
      return newUser;
    })
    .catch(function (error) {
      return error.message;
    });
};

// Sign Out handler
export const handleSignOut = () => {
  return firebase
    .auth()
    .signOut()
    .then(function () {
      const newUser = {
        name: "",
        email: "",
        isAdmin: "",
        photo: "",
      };
      sessionStorage.removeItem("agency-token");
      return newUser;
      // Sign-out successful.
    })
    .catch(function (error) {
      // An error happened.
    });
};

// function for updating existing user name
const updateCurrentUserInfo = (name) => {
  const user = firebase.auth().currentUser;

  user
    .updateProfile({
      displayName: name,
    })
    .then(() => {
      // Update successful.
      console.log("Update Succesful");
    })
    .catch(function (error) {
      // An error happened.
      console.log("Update failed");
    });
};

// Password reset
export const handlePasswordReset = (email) => {
  return firebase
    .auth()
    .sendPasswordResetEmail(email)
    .then((res) => {})
    .catch(function (error) {
      return error.message;
    });
};

// Email varification
export const sendEmailVerification = () => {
  var user = firebase.auth().currentUser;

  user
    .sendEmailVerification()
    .then((res) => {})
    .catch((error) => {});
};

// Setting usertoken to session storage
// const setUserToken = () => {
//   firebase
//     .auth()
//     .currentUser.getIdToken(/* forceRefresh */ true)
//     .then(function (idToken) {
//       // Send token to your backend via HTTPS
//       sessionStorage.setItem("agency-token", idToken);
//     })
//     .catch(function (error) {
//       // Handle error
//     });
// };
