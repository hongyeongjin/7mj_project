const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ZTFlZDhjM2I0NmM2ZTZiYjY4MjYzMzBiNzM0ZTlkMCIsInN1YiI6IjY1MmYyMWU4ZWE4NGM3MDEyZDcxYWQ1ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1sdyif5DYVbjFmwmxjyHKX8sMQM6MPPDHoleRZROXBU'
  }
};

// 영화 정보 긁어오기
async function scrape_movie(){
	return await fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options)
		.then(res => res.json())
	    .then(res => res.results)
	    .catch(err => console.error(err));
}

// 트레일러 긁어오기
async function scrape_trailer(id){
	return await fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
		.then(res => res.json())
	    .then(res => res.results[0].key)
	    .catch(err => console.error(err));
}

async function main(){
	let movieList = await scrape_movie()
	let trailerList = await Promise.all(movieList.map(async movie => await scrape_trailer(movie.id)))
	let videos = document.getElementById('videos')
	videos.innerHTML = trailerList.map(key => {
		let url = 'https://www.youtube.com/embed/'+key
		console.log(url)
		return `<div><iframe src="${url}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe></div>`
	}).join('')
}

main()