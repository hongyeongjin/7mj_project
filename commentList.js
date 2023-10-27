// Firebase SDK 라이브러리 가져오기
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-firestore.js";
import {
    getDocs,
    getDoc,
    deleteDoc,
    addDoc,
    collection,
    doc,
    updateDoc,
} from "https://www.gstatic.com/firebasejs/10.5.0/firebase-firestore.js";
import { query, orderBy, where } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-firestore.js";
import { id } from "./detail.js";

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
// const $comment = document.querySelector("#comment");
// const $inputBox = document.querySelector("#inputBox")

const $inputID = document.querySelector("#inputID");
const $inputPW = document.querySelector("#inputPW");
const $inputComment = document.querySelector("#inputComment");

// validation check selector
const $idSuccessMessage = document.querySelector(".id-success-message"); //사용할 수 있는 이름입니다.
const $idFailureMessage = document.querySelector(".id-failure-message"); // 이름은 2~ 5글자여야 합니다.
const $idFailureMessageTwo = document.querySelector(".id-failure-messageTwo"); // 한글 또는 숫자만 가능합니다.

const $pwSuccessMessage = document.querySelector(".pw-success-message"); // 사용할 수 있는 비밀번호입니다.
const $pwFailureMessage = document.querySelector(".pw-failure-message"); // 비밀번호는 4자리 이상입니다.


$postingBtn.addEventListener("click", addLocalStorage);

// add local storage
function addLocalStorage() {
    if ($inputID.value.length >= 2 && $inputID.value.length <=5 && $inputPW.value.length > 4 && $inputComment.value.length > 0) {
        //날짜 생성
        let today = new Date();
        let year = today.getFullYear();
        let month = today.getMonth()+1;
        let date = today.getDate();
        let hours = today.getHours();
        let minutes = today.getMinutes();
        let seconds = today.getSeconds();
        // let now = today.toLocaleString();

        let now = `${year}.${month}.${date} ${String(hours).padStart(2, "0")}:${String(minutes).padStart(
            2,
            "0"
        )}:${String(seconds).padStart(2, "0")}`;
        let submitData = { id: $inputID.value, pw: $inputPW.value, comment: $inputComment.value, date: now };
        let jsonData = JSON.stringify(submitData);
        localStorage.setItem(`${id},${now}`, jsonData);

        getLocalStorage();
    } else {
        alert("이름은 2 ~ 5글자, 비밀번호는 4자리 이상 입력해주세요.");
    }
}

// get local storage
function getLocalStorage() {
    const $commentList = document.querySelector("#comment-list");

    $commentList.innerHTML = "";

    let parsedArr = [];
    for (let i = 0; i < localStorage.length; i++) {
        if (localStorage.key(i).split(",")[0] === `${id}`) {
            const parsedData = JSON.parse(localStorage.getItem(localStorage.key(i)));
            parsedArr.push(parsedData);
        }
    }
    console.log("parsedArr=>", parsedArr);
    parsedArr.sort((a, b) => new Date(b.date) - new Date(a.date));
    console.log("parsedArr=>", parsedArr);
    parsedArr.forEach((obj) => {
        const $commentBox = document.createElement("div");
        $commentBox.id = "commentBox";

        $commentBox.append(`${obj.id} : ${obj.comment} `);
        $commentList.appendChild($commentBox);

        // 날짜부분 css 넣기 편하게 따로 빼놓음
        const $dateBox = document.createElement("span");
        $dateBox.id = "dateBox";
        $dateBox.append(`[${obj.date}]`);
        $commentBox.appendChild($dateBox);
    });

    // submit 하게되면 validation check 비활성화
    // $idSuccessMessage.style.display = "none";
    // $idFailureMessage.style.display = "none";
    // $idFailureMessageTwo.style.display = "none";
}
getLocalStorage();



// ID validation check
$inputID.addEventListener("input", IDvalidationCheck);
let idValue = $inputID.value;

$idSuccessMessage.style.display = "none";
$idFailureMessage.style.display = "none";
$idFailureMessageTwo.style.display = "none";

function IDvalidationCheck(idValue) {
    idValue = $inputID.value;
    //초기 값 없애기
    if (idValue.length !== 0) {
        if (checkNumAndKor(idValue) === false) {
            $idSuccessMessage.style.display = "none";
            $idFailureMessage.style.display = "none";
            $idFailureMessageTwo.style.display = "inline";
        } else if (idLength(idValue) === false) {
            $idSuccessMessage.style.display = "none";
            $idFailureMessage.style.display = "inline";
            $idFailureMessageTwo.style.display = "none";
        } else if (idLength(idValue) === true && checkNumAndKor(idValue) === true) {
            $idSuccessMessage.style.display = "inline";
            $idFailureMessage.style.display = "none";
            $idFailureMessageTwo.style.display = "none";
        }
    } else {
        $idSuccessMessage.style.display = "none";
        $idFailureMessage.style.display = "none";
        $idFailureMessageTwo.style.display = "none";
    }
}

function checkNumAndKor(idValue) {
    let checkKor = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
    let checkNum = /[0-9]/;
    let checkEng = /[a-zA-Z]/;
    return checkKor.test(idValue) || (checkNum.test(idValue) && !checkEng.test(idValue));
}

function idLength(idValue) {
    return idValue.length >= 2 && idValue.length <= 5;
}

// PW validation check
$inputPW.addEventListener("input",PWvalidationCheck)
let pwValue = $inputPW.value;
$pwSuccessMessage.style.display = "none";
$pwFailureMessage.style.display = "none";

function PWvalidationCheck(pwValue) {
    pwValue = $inputPW.value;
    if (pwValue.length !== 0) {
        if (pwLength(pwValue) === false) {
            $pwSuccessMessage.style.display = "none";
            $pwFailureMessage.style.display = "inline";
        } else {
            $pwSuccessMessage.style.display = "inline";
            $pwFailureMessage.style.display = "none";
        }
    } else {
        $pwSuccessMessage.style.display = "none";
        $pwFailureMessage.style.display = "none";
    }
}

function pwLength(pwValue) {
    return pwValue.length >= 4;
}
// 댓글 firebase에 저장
// $postingBtn.addEventListener("click", addComment);
// $inputBox.addEventListener("submit",addComment);
// $inputBox.addEventListener("submit",(event)=>{
//     event.preventDefault();
// })

// // firebase, loacal stroage에 데이터 저장하기
// async function addComment() {
//     let today = new Date();
//     let year = today.getFullYear();
//     let month = today.getMonth();
//     let date = today.getDate();
//     let hours = today.getHours();
//     let minutes = today.getMinutes();
//     // localstorage에 데이터 넣기
//     let localName = localStorage.getItem('userName')
//     if(localName == undefined){
//         localName = prompt("성함을 입력해주세요")
//         localStorage.setItem("userName", localName)
//     }

//     localStorage.setItem("comment",$comment.value);

//     let password = prompt("비밀번호를 입력해주세요")
//     if(password){
//         let doc = {
//             "id" : localName,
//             "password" : password,
//             "comment" : $comment.value,
//             "date" : `${year}.${month}.${date} ${String(hours).padStart(2,"0")}:${String(minutes).padStart(2,"0")}`,
//         }
//         await addDoc(collection(db,"comment"),doc);
//         localStorage.setItem("password",password);
//         alert('저장되었습니다');

//     }
//     getComment();
// }

// // firebase에서 댓글 가져와서 출력
// async function getComment() {

//     const $commentList = document.querySelector("#comment-list");
//     // commentList 초기화
//     $commentList.innerHTML = '';

//     // firebase 데이터 정렬 (시간순)
//     let dataArr = [];
//     const docs = await getDocs(collection(db, "comment"));
//     docs.forEach((doc)=>{
//         const data = doc.data();
//         dataArr.push(data);
//     })

//     dataArr.sort((a,b)=> new Date(b.date) - new Date(a.date))
//     console.log(dataArr)

//     //데이터 넣기
//     dataArr.forEach((detail)=>{
//         const $commentBox = document.createElement("div");
//         $commentBox.className = "commentBox";
//         $commentBox.innerHTML = `
//         작성자: ${detail.id}
//         <br>
//         댓글 : ${detail.comment}
//         <br>
//         작성시간 : ${detail.date}`;

//         // 수정, 삭제 버튼 추가
//         if (detail["id"] === localStorage.getItem("userName")) {
//             const $temp = document.createElement("div");
//             $temp.innerHTML = `
//             <button id ="editBtn">수정</button>
//             <button id="deleteBtn">삭제</button>
//             `;
//             $temp.children[0].addEventListener("click", editComment);
//             $temp.children[1].addEventListener("click", deleteComment);
//             $commentBox.append($temp);
//         }
//         $commentList.appendChild($commentBox);

//         // 댓글 삭제 함수
//         function deleteComment() {
//             let checkingPW = prompt("비밀번호를 입력해주세요");
//             if (detail["password"] === checkingPW) {
//                 $commentBox.remove();
//                 localStorage.removeItem("comment");
//                 localStorage.removeItem("password");
//                 alert("삭제되었습니다");
//                 // await deleteDoc(doc(db,"comment",id))
//             } else {
//                 alert("올바르지 않은 비밀번호 입니다.");
//             }
//         }
//     });
//     }
// getComment();

// // 댓글 수정함수
// function editComment() {
//     alert("editBtn")
// }
