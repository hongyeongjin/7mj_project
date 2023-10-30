
import {scrape_image} from './image.js'
import {options, scrape_trailer} from './trailer.js'
import {scrape_information} from './detail-inromation.js'

const queryString = window.location.search
// console.log(queryString)
const urlParams = new URLSearchParams(queryString)
// console.log(urlParams)
export const id = urlParams.get('id')
// console.log(id)


async function movieCast(id){
	return fetch(`https://api.themoviedb.org/3/movie/${id}/credits?language=ko-KR`, options)
	  .then(res => res.json())
	  .then(res => res.cast)
	  .catch(err => console.error(err));
}

async function main2(){
/* // 출연진 불러오기
	let movieInfo = document.getElementById('movieInformation')
	let cast = await movieCast(id)
	for(let i=0;i<Math.min(5,cast.length);++i)
		movieInfo.innerHTML += `<p class="indent">${cast[i].name}</p>` */
	
	// 트레일러 불러오기
	let trailerKey = await scrape_trailer(id)
	let moviePreview = document.getElementById('moviePreview')
	let trailerURL = 'https://www.youtube.com/embed/'+trailerKey
	moviePreview.innerHTML += `<div><iframe id="trailer" src="${trailerURL}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe></div>`
}

// 이미지 긁어오기
async function image(){
	let imageKey = await scrape_image(id)
	let movieInf = document.getElementById('movieInformation')
	let imageURL = 'https://image.tmdb.org/t/p/original'+imageKey
	movieInf.innerHTML = `<div><image id="poster" src="${imageURL}"></image></div>`
}

// 정보 긁어오기
async function information(){
	let a = await scrape_information(id)
	let inforDiv = document.getElementById('movieInformation')
	inforDiv.innerHTML += `<div id="detail">
		<p id="title">${a.title}</p>
		<p>개봉일 : ${a.release_date}</p>
		<p>장르 : ${a.genres.map(a => a.name).join(', ')}</p>
		<p>상영시간 : ${a.runtime}분</p>
		<p>평점 : ${a.vote_average}</p>
	</div>`
}
main2()
image()
information()

