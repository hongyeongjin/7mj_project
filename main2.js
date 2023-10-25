<<<<<<< HEAD
import {scrape_trailer} from './trailer.js'
import {scrape_image} from './image.js'
=======
import {options, scrape_trailer} from './trailer.js'
>>>>>>> 88b8af0974076471cdf1090fc76a2ab9f6edabc8

const queryString = window.location.search
// console.log(queryString)
const urlParams = new URLSearchParams(queryString)
// console.log(urlParams)
const id = urlParams.get('id')
// console.log(id)
const movieId = urlParams.get('id') // 해당 id값은 잘 가져온다.
console.log(movieId)

async function movieCast(id){
	return fetch(`https://api.themoviedb.org/3/movie/${id}/credits?language=en-US`, options)
	  .then(res => res.json())
	  .then(res => res.cast)
	  .catch(err => console.error(err));
}

async function main2(){
	// 출연진 불러오기
	let movieInfo = document.getElementById('movieInformation')
	let cast = await movieCast(id)
	for(let i=0;i<Math.min(5,cast.length);++i)
		movieInfo.innerHTML += `<p>${cast[i].name}</p>`
	
	// 트레일러 불러오기
	let trailerKey = await scrape_trailer(id)
	let moviePreview = document.getElementById('moviePreview')
	let trailerURL = 'https://www.youtube.com/embed/'+trailerKey
	moviePreview.innerHTML = `<div><iframe src="${trailerURL}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe></div>`
}

// 이미지 긁어오기
async function image(){
	let imageKey = await scrape_image(id)
	let movieInf = document.getElementById('movieInformation')
	let imageURL = +imageKey
	movieInf.innerHTML = `<div style=backgroundcolor.red><image src=``></image></div>`
  }


// // 영화 정보 긁어오기
// const options1 = {
// 	method: 'GET',
// 	headers: {
// 	  accept: 'application/json',
// 	  Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNjljODJlODU3MWZkMWZkMzc3ZTBmZDRlZmIyODlmMyIsInN1YiI6IjY1MmY1OGJmYTgwMjM2MDEzNzY4YjI2NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1Awo6M01WgSRBmpdigE4KA2fip55k3C-KgB8B7CL7Qg'
// 	}
//   };
  
//   async function scrapeMovie(iD){
//   return await fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options1)
// 	.then(response => response.json())
// 	.then(response => console.log(response))
// 	.catch(err => console.error(err));
//   }

// async function inFm() {
// 	let movieKey = await scrapeMovie(movieId)
// 	let movieInf = document.getAnimations('movieInformation')
// 	let movieURL = `https://image.tmdb.org/t/p/w500+${movieKey}${id.poster_path}`
// 	movieInf.innerHTML = `<div><img src="${movieURL}"></img></div>`
// }

// // // 영화 상세정보
// // nextPage.onclick을 하면 id값을 비교해서 맞는 id값의 영화 poster_path를 가져온다.
// const options = {
// 	method: 'GET',
// 	headers: {
// 		accept: 'application/json',
// 		Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ZTFlZDhjM2I0NmM2ZTZiYjY4MjYzMzBiNzM0ZTlkMCIsInN1YiI6IjY1MmYyMWU4ZWE4NGM3MDEyZDcxYWQ1ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1sdyif5DYVbjFmwmxjyHKX8sMQM6MPPDHoleRZROXBU'
// 	}
// };

// fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options)
// .then((response) => response.json())
// .then((data) => {
//   const $movieInf = document.querySelector("#movieInformation");
// 	data.results.forEach((movie) => {
// 		console.log(movie);
// 	const $moviePost = document.createElement("div"); // div를 만든것
// 	$moviePost.className = "movie-card";
// 	$moviePost.innerHTML = `
// 	  <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">` // 클릭시 아이디를 비교해서 같은 걸 가져온다.

//   $movieInf.appendChild($moviePost); // div안에 넣은것
//   });

// })
// .catch(err => console.error(err));

main2()