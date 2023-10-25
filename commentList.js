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
const $inputBox = document.querySelector("#inputBox")


let today = new Date();
let year = today.getFullYear();
let month = today.getMonth();
let date = today.getDate();
let hours = today.getHours();
let minutes = today.getMinutes();

// 댓글 firebase에 저장
$postingBtn.addEventListener("click", addComment);
$inputBox.addEventListener("submit",addComment);
$inputBox.addEventListener("submit",(event)=>{
    event.preventDefault();
})

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
            "date" : `${year}.${month}.${date} ${hours}:${minutes}`,
        }
        await addDoc(collection(db,"comment"),doc);
        localStorage.setItem("password",password);
        alert('저장되었습니다');


    }
    getComment();
}

// firebase에서 댓글 가져와서 출력
async function getComment() {
    const docs = await getDocs(collection(db, "comment"));

    docs.forEach((doc) => {
        const $movieComment = document.querySelector("#movieComment");

        const data = doc.data();
        const $commentBox = document.createElement("div");
        $commentBox.className = "commentBox";
        $commentBox.innerHTML = `
        작성자: ${data["id"]}
        <br>
        댓글 : ${data["comment"]}
        <br>
        작성시간 : ${data["date"]}`;

        // 수정, 삭제 버튼 추가
        if (data["id"] === localStorage.getItem("userName")) {
            const $temp = document.createElement("div");
            $temp.innerHTML = `
            <button id ="editBtn">수정</button>
            <button id="deleteBtn">삭제</button>
            `;
            $commentBox.append($temp);
        }
        $movieComment.appendChild($commentBox);

    
        // 댓글 수정 리스너
        const $editBtns = document.querySelectorAll("#editBtn")
        $editBtns.forEach((editBtn)=>{
            editBtn.addEventListener("click",editComment);
        })

        // 댓글 삭제 함수
        const $deleteBtns = document.querySelectorAll("#deleteBtn");
        $deleteBtns.forEach((comment) => {
            comment.addEventListener("click", deleteComment);
        });
        // $deleteComment.addEventListener("click", deleteComment);

        async function deleteComment() {
            let checkingPW = prompt("비밀번호를 입력해주세요");
            if (data["password"] === checkingPW) {
                // const parent = event.target.parentElement;
                // parent.remove();
                $commentBox.remove();
                console.log("테스트")
                localStorage.removeItem("comment")
                alert("삭제되었습니다");
                // await deleteDoc(doc(db,"comment",id))

            } else {
                alert("올바르지 않은 비밀번호 입니다.");
            }
        }
    })
;}

// 댓글 수정함수
function editComment() {
    alert("editBtn")
}


// const parentElement = event.target.parentElement;
// const deleteDate = await getDoc(collection(db, "comment", parentElement.id));




//Local stroage에 input text 넣기
// $postingBtn.addEventListener("click", addLocalstorage);

// function addLocalstorage() {
//     const commentValue = $comment.value;
//     let localName = localStorage.getItem('userName')
//     if(localName == undefined){
//         localName = prompt("성함을 입력해주세요")
//         localStorage.setItem("userName", localName)
//     }
//     localStorage.setItem("comment",commentValue);
//     getLoaclstorage();
// }


// Local storage에서 데이터 가져오기
// const $movieComment = document.querySelector("#movieComment");

// function getLoaclstorage() {
//     const localValue = localStorage.getItem("comment")
//     const $commentBox = document.createElement("div");
//     $commentBox.innerHTML = `
//         ${localValue}
//     `
//     $movieComment.appendChild($commentBox);
// }