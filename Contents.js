// 영화 줄거리
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id');

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ZTFlZDhjM2I0NmM2ZTZiYjY4MjYzMzBiNzM0ZTlkMCIsInN1YiI6IjY1MmYyMWU4ZWE4NGM3MDEyZDcxYWQ1ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1sdyif5DYVbjFmwmxjyHKX8sMQM6MPPDHoleRZROXBU'
  }
};

// 영화 줄거리 가져오기
fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, options)
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    const $movieOver = document.querySelector(".movieContents");
    const $movieOverview1 = document.createElement("div");
    $movieOverview1.className = "movie-Cont";
    $movieOverview1.innerHTML = `<p id="overview">${data.overview}</p>`;
    $movieOver.appendChild($movieOverview1);
  })
  .catch(err => console.error(err));

// 영화 출연진 정보 가져오기
  fetch(`https://api.themoviedb.org/3/movie/${id}/credits?language=en-US`, options)
  .then((response) => response.json())
  .then((data) => {
    const $moviePerson = document.querySelector(".movieContents");
	console.log(data.cast)
	$moviePerson.innerHTML += `<p class="indent">출연진</p><hr>`
    const castData = data.cast;
	const $movieCc = document.createElement("div");
	$movieCc.id = "movie-castcrew";
    for(let i=0;i<Math.min(5,castData.length);++i){
      $movieCc.innerHTML += `<div class = "movieC">
        <img class="photo" src="https://image.tmdb.org/t/p/w500${castData[i].profile_path}">
        <p>${castData[i].name}</p>
        </div>`;
    }
	$moviePerson.appendChild($movieCc);
  })
  .catch(err => console.error(err));

