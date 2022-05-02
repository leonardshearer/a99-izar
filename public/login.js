import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword, signOut,
  onAuthStateChanged, deleteUser, updatePassword, updateEmail
} from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js';

const firebaseConfig = {
  apiKey: "AIzaSyDrLAiIyZQZI5SSFIGXKWpXWpQYUyToVyM",
  authDomain: "comp426izar.firebaseapp.com",
  projectId: "comp426izar",
  storageBucket: "comp426izar.appspot.com",
  messagingSenderId: "790153031810",
  appId: "1:790153031810:web:ed307d6902b5811a9a049b"
};

// init firebase
const app = initializeApp(firebaseConfig);

// init services
const auth = getAuth()

// Create new user in firebase
window.signupfunction = function () {
  const email = document.getElementById("signupemail").value;
  const password = document.getElementById("signuppassword").value;
  var url = location.protocol + '//' + location.hostname + ':' + location.port + '/app/user/register/' + email
  fetch(url)
    .then(function (response) {
      return response.json()
    })
  createUserWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      const user = userCredential.user
      signupForm.reset()
    })
    .catch(err => {
      console.log(err.message)
    })
}

// Log in existing user
window.loginfunction = function () {
  const email = document.getElementById("loginemail").value;
  const password = document.getElementById("loginpassword").value;
  var url = location.protocol + '//' + location.hostname + ':' + location.port + '/app/user/login/' + email
  fetch(url)
    .then(function (response) {
      return response.json()
    })
  signInWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      const user = userCredential.user;
      location.href = '/home.html';
    })
    .catch(err => {
      console.log(err.message)
    })
}

// Log out user
window.logoutfunction = function () {
  var url = location.protocol + '//' + location.hostname + ':' + location.port + '/app/user/logout/'
  fetch(url)
    .then(function (response) {
      return response.json()
    })
  signOut(auth).then(() => {
    console.log('Log out successful')
  }).catch((error) => {
    console.log('Log out failed.');
  })
  location.href = '/index.html';
};

// Change email
window.changeEmailFunction = function () {
  var url = location.protocol + '//' + location.hostname + ':' + location.port + '/app/user/changeemail'
  fetch(url)
    .then(function (response) {
      return response.json()
    })
  const newEmail = document.getElementById("emailInput").value;
  const user = auth.currentUser;
  updateEmail(user, newEmail).then(() => {
    console.log("Email updated!");
  }).catch((error) => { console.log(error); });
}

// Change password
window.changePasswordFunction = function () {
  var url = location.protocol + '//' + location.hostname + ':' + location.port + '/app/user/changepassword'
  fetch(url)
    .then(function (response) {
      return response.json()
    })
  const currentPassword = document.getElementById("oldPasswordInput").value;
  const newPassword = document.getElementById("passwordInput").value;
  const user = auth.currentUser;
  signInWithEmailAndPassword(auth, user.email, currentPassword)
    .then(userCredential => {
      console.log('Authenticated')
    })
    .catch(err => {
      console.log(err.message)
    })
  updatePassword(user, newPassword).then(() => {
    console.log("Password updated!");
  }).catch((error) => { console.log(error); });
}

// Change password
window.deleteAccountFunction = function () {
  var url = location.protocol + '//' + location.hostname + ':' + location.port + '/app/user/delete'
  fetch(url)
    .then(function (response) {
      return response.json()
    })
  const user = auth.currentUser;
  deleteUser(user).then(() => {
    console.log("Account deleted!");
  }).catch((error) => { console.log(error); });
  location.href = '/index.html';
}

window.onload = function () {
  try {
    var item = document.getElementsByClassName("item");
    var it = item[0].getElementsByTagName("div");

    var content = document.getElementsByClassName("content");
    var con = content[0].getElementsByTagName("div");

    for (let i = 0; i < it.length; i++) {
      it[i].onclick = function () {
        for (let j = 0; j < it.length; j++) {
          it[j].className = '';
          con[j].style.display = "none";
        }
        this.className = "active";
        it[i].index = i;
        con[i].style.display = "block";
      }
    }
  } catch (error) {
    console.log("not doing the button switch thingy");
  }
}