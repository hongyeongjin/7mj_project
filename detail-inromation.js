const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNjljODJlODU3MWZkMWZkMzc3ZTBmZDRlZmIyODlmMyIsInN1YiI6IjY1MmY1OGJmYTgwMjM2MDEzNzY4YjI2NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1Awo6M01WgSRBmpdigE4KA2fip55k3C-KgB8B7CL7Qg'
    }
  };
  export async function scrape_information(id) {
    return fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, options)
    .then(response => response.json())
    .catch(err => console.error(err));
    
  } 
  // response.title = 영화제목
  // response.release_date = 개봉날짜
  // response.genres[0].name = 장르
  // response.runtime = 상영시간
  // response.vote_average = 영화평점