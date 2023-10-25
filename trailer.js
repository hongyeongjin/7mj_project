const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ZTFlZDhjM2I0NmM2ZTZiYjY4MjYzMzBiNzM0ZTlkMCIsInN1YiI6IjY1MmYyMWU4ZWE4NGM3MDEyZDcxYWQ1ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1sdyif5DYVbjFmwmxjyHKX8sMQM6MPPDHoleRZROXBU'
  }
};

// 트레일러 긁어오기
export async function scrape_trailer(id){
	return await fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
		.then(res => res.json())
	    .then(res => res.backdrops[0].file_path)
	    .catch(err => console.error(err));
}
