
import {scrape_image} from './image.js'
import {options, scrape_trailer} from './trailer.js'

const queryString = window.location.search
// console.log(queryString)
const urlParams = new URLSearchParams(queryString)
// console.log(urlParams)
const id = urlParams.get('id')
// console.log(id)
const movieId = urlParams.get('id') // 해당 id값은 잘 가져온다.
// console.log(movieId)

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
	let imageURL = 'https://image.tmdb.org/t/p/original'+imageKey
	movieInf.innerHTML = 
	`<div><image src="${imageURL}" style="width:400px;height:400px;"></image></div>`
  }



main2()
image()