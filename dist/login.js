import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js';
// import {
//   getFirestore, collection, onSnapshot,
//   addDoc, deleteDoc, doc,
//   query, where,
//   orderBy, serverTimestamp,
//   updateDoc,
//   getDocs
// } from 'firebase/firestore'
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword, signOut,
  onAuthStateChanged, deleteUser, updatePassword, updateEmail
} from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js';

const firebaseConfig = {
    apiKey: "AIzaSyAVXNNKdpdNsjd_R2_fyqwBOQZdtWMs4cU",
    authDomain: "a99-izar-a634d.firebaseapp.com",
    projectId: "a99-izar-a634d",
    storageBucket: "a99-izar-a634d.appspot.com",
    messagingSenderId: "1123701224",
    appId: "1:1123701224:web:f8c751105c279fa358545d"
};

// init firebase
const app = initializeApp(firebaseConfig);

// init services
const auth = getAuth()

// collection ref
// const colRef = collection(db, 'books')

//testing firestore
// getDocs(colRef)
//     .then((snapshot) => {
//         let books = []
//         snapshot.docs.forEach((doc) => {
//             books.push({ ...doc.data(), id: doc.id})
//         })
//         console.log(books)
//     })

// signing users up
// const submitclick = document.getElementById("signupsubmit")
// const signupForm = document.querySelector('.signup')
// submitclick.onclick = function(){
//     console.log("working")
//   const email = signupForm.email.value
//   const password = signupForm.password.value

//   createUserWithEmailAndPassword(auth, email, password)
//     .then(cred => {
//       console.log('user created:', cred.user)
//       signupForm.reset()
//     })
//     .catch(err => {
//       console.log(err.message)
//     })
// }

window.signupfunction = function() {
    console.log("sign up working");
    const email = document.getElementById("signupemail").value;
    const password = document.getElementById("signuppassword").value;
    createUserWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      const user = userCredential.user
      signupForm.reset()
    })
    .catch(err => {
      console.log(err.message)
    })
}

// const signupForm = document.getElementById('signupsubmit')
// signupForm.addEventListener('click', (e) => {
//   e.preventDefault()

//   const email = document.getElementById("signupemail").value
//   const password = document.getElementById("signuppassword").value

//   createUserWithEmailAndPassword(auth, email, password)
//     .then(cred => {
//       console.log('user created:', cred.user)
//       signupForm.reset()
//     })
//     .catch(err => {
//       console.log(err.message)
//     })
// })

// logging in and out
// const logoutButton = document.querySelector('.logout')
// logoutButton.addEventListener('click', () => {
//   signOut(auth)
//     .then(() => {
//       console.log('user signed out')
//     })
//     .catch(err => {
//       console.log(err.message)
//     })
// })

window.loginfunction = function() {
  console.log("log in working");
  const email = document.getElementById("loginemail").value;
  const password = document.getElementById("loginpassword").value;
  signInWithEmailAndPassword(auth, email, password)
  .then(userCredential => {
    const user = userCredential.user;
    location.href = '/homepage.html';
  })
  .catch(err => {
    console.log(err.message)
  })
}

window.logoutfunction = function() {
  console.log("logout working");
  auth.signOut();
  location.href = '/homepage.html';
};

window.changePasswordEmailFunction = function() {
  console.log("change password/email function called");
  const currentPassword = document.getElementById("oldPasswordInput").value;
  const newPassword = document.getElementById("passwordInput").value;
  const newEmail = document.getElementById("emailInput").value;
  const user = auth.currentUser;
  user.updatePassword(newPassword).then(() => {
    console.log("Password updated!");
  }).catch((error) => { console.log(error); });
  user.updateEmail(newEmail).then(() => {
      console.log("Email updated!");
  }).catch((error) => { console.log(error); });
}

window.onload=function(){
  try {
    var item=document.getElementsByClassName("item");
    var it=item[0].getElementsByTagName("div");

    var content=document.getElementsByClassName("content");
    var con=content[0].getElementsByTagName("div");

    for (let i=0;i<it.length;i++){
         it[i].onclick =function(){
            for (let j=0;j<it.length;j++){
                it[j].className='';
                con[j].style.display="none";
            }
            this.className="active";
            it[i].index=i;
            con[i].style.display="block";
        }
    }
  } catch (error) {
    console.log("not doing the button switch thingy");
  }
}