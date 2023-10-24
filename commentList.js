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
$postingBtn.addEventListener("click", addComment);

async function addComment() {
    // localstorage에 데이터 넣기
    let localName = localStorage.getItem('userName')
    if(localName == undefined){
        localName = prompt("성함을 입력해주세요")
        localStorage.setItem("userName", localName)
    }

    localStorage.setItem("comment",$comment.value);

    let password = prompt("비밀번호를 입력해주세요")
    if(password){
        let doc = {
            "id" : localName,
            "password" : password,
            "comment" : $comment.value,
        }
        await addDoc(collection(db,"comment"),doc);
        localStorage.setItem("password",password);
        alert('저장되었습니다');
    }
    
    getComment();
}

// firebase에서 댓글 가져와서 출력
async function getComment() {
    const docs = await getDocs(collection(db,"comment"));
    
    docs.forEach((doc)=>{
        const data = doc.data();
        const $commentBox = document.createElement("div");
        $commentBox.innerHTML = `
        <li>작성자: ${data["id"]}</li>
        <li>댓글 : ${data["comment"]}</li>`

    });
}



//Local stroage에 input text 넣기
$postingBtn.addEventListener("click", addLocalstorage);

function addLocalstorage() {
    const commentValue = $comment.value;
    let localName = localStorage.getItem('userName')
    if(localName == undefined){
        localName = prompt("성함을 입력해주세요")
        localStorage.setItem("userName", localName)
    }
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