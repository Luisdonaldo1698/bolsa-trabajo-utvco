importScripts('https://www.gstatic.com/firebasejs/9.1.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/9.1.1/firebase-messaging.js');

 firebase.initializeApp({
    apiKey: "AIzaSyB9nyQsiRzmLhEkuQPNeBVtITYjUirnYSg",
    authDomain: "app-covid19-1a7bf.firebaseapp.com",
    projectId: "app-covid19-1a7bf",
    storageBucket: "app-covid19-1a7bf.appspot.com",
    messagingSenderId: "605708998728",
    appId: "1:605708998728:web:3ee096d0bc0fb1747c207d"
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();