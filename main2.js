import {scrape_trailer} from './trailer.js'

const queryString = window.location.search
//console.log(queryString)
const urlParams = new URLSearchParams(queryString)
//console.log(urlParams)
const id = urlParams.get('id')
//console.log(id)

async function main2(){
	let trailerKey = await scrape_trailer(id)
	let moviePreview = document.getElementById('moviePreview')
	let trailerURL = 'https://www.youtube.com/embed/'+trailerKey
	moviePreview.innerHTML = `<div><iframe src="${trailerURL}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe></div>`
}

main2()