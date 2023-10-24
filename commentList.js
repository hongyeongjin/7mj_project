// Firebase SDK 라이브러리 가져오기
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-firestore.js";
import {getDocs, getDoc, deleteDoc, addDoc, collection, doc, updateDoc} from "https://www.gstatic.com/firebasejs/10.5.0/firebase-firestore.js";
import { query, orderBy, where } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-firestore.js";

// firebase 구성 정보 설정
const firebaseConfig = {
    apiKey: "AIzaSyD7Qi-Y0MaiiqQTVQkgHMAYLgGk2fPeuzA",
    authDomain: "sparta-team7.firebaseapp.com",
    projectId: "sparta-team7",
    storageBucket: "sparta-team7.appspot.com",
    messagingSenderId: "625900926887",
    appId: "1:625900926887:web:e43313b09417240ab92882",
    measurementId: "G-CFZCHLHYG9",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// addEventListner 넣어줄 변수들
const $postingBtn = document.querySelector("#postingBtn");
const $comment = document.querySelector("#comment");



// 댓글 firebase에 저장
// $postingBtn.addEventListener("click", addComment);

async function addComment() {
    let doc = {
        "comment" : $comment.value,
    }
    await addDoc(collection(db,"comment"),doc);
    alert('저장 완료!');
    // getComment();
}

// firebase에서 댓글 가져와서 출력
async function getComment() {
    const docs = await getDocs(collection(db,"comment"));
    console.log(docs)
    docs.forEach((doc)=>{
        const data = doc.data();
        console.log(data)
    });
}
// getComment();


//Local stroage에 input text 넣기
$postingBtn.addEventListener("click", addLocalstorage);

function addLocalstorage() {
    const commentValue = $comment.value;
    localStorage.setItem("comment",commentValue);
    getLoaclstorage();
}


// Local storage에서 데이터 가져오기
const $movieComment = document.querySelector("#movieComment");

function getLoaclstorage() {
    const localValue = localStorage.getItem("comment")
    const $commentBox = document.createElement("div");
    $commentBox.innerHTML = `
        ${localValue}
    `
    $movieComment.appendChild($commentBox);
}