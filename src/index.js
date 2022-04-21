import { initializeApp } from 'firebase/app'
import {
  getFirestore, collection, onSnapshot,
  addDoc, deleteDoc, doc,
  query, where,
  orderBy, serverTimestamp,
  updateDoc,
  getDocs
} from 'firebase/firestore'
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword, signOut,
  onAuthStateChanged
} from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyAVXNNKdpdNsjd_R2_fyqwBOQZdtWMs4cU",
    authDomain: "a99-izar-a634d.firebaseapp.com",
    projectId: "a99-izar-a634d",
    storageBucket: "a99-izar-a634d.appspot.com",
    messagingSenderId: "1123701224",
    appId: "1:1123701224:web:f8c751105c279fa358545d"
};

// init firebase
initializeApp(firebaseConfig)

// init services
const db = getFirestore()
const auth = getAuth()

// collection ref
const colRef = collection(db, 'books')

//testing firestore
getDocs(colRef)
    .then((snapshot) => {
        let books = []
        snapshot.docs.forEach((doc) => {
            books.push({ ...doc.data(), id: doc.id})
        })
        console.log(books)
    })

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
    console.log("working");
    const email = document.getElementById("signupemail").value;
    const password = document.getElementById("signuppassword").value;
    createUserWithEmailAndPassword(auth, email, password)
    .then(cred => {
      console.log('user created:', cred.user)
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
const logoutButton = document.querySelector('.logout')
logoutButton.addEventListener('click', () => {
  signOut(auth)
    .then(() => {
      console.log('user signed out')
    })
    .catch(err => {
      console.log(err.message)
    })
})

const loginForm = document.querySelector('.login')
loginForm.addEventListener('submit', (e) => {
  e.preventDefault()

  const email = loginForm.email.value
  const password = loginForm.password.value

  signInWithEmailAndPassword(auth, email, password)
    .then(cred => {
      console.log('user logged in:', cred.user)
      loginForm.reset()
    })
    .catch(err => {
      console.log(err.message)
    })
})

window.onload=function(){
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
}