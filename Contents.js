// 영화 줄거리
const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ZmMyZjNlYjc2OTRiYzdjNzljYjg3N2E3ZTRlNzlmMSIsInN1YiI6IjY1MmY5MGRlYTgwMjM2MDEzNzY4ZDM1YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.dDGo7-1RtO-vBd97qa-2rhOt4dkmtfgifT9OZY8CEco'
    }
  };

fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options) // 안나와요..  
.then((response) => response.json())
.then((data) => {
  const $movieOver = document.querySelector(".movieContents"); 
  console.log($movieOver);
	data.results.forEach((movie) => {
	const $movieOverview1 = document.createElement("div"); 
	$movieOverview1.className = "movie-Cont";
	$movieOverview1.innerHTML = `<p>${movie.overview}</p>`
  $movieOver.appendChild($movieOverview1); 
  });

})
.catch(err => console.error(err));

const contBtn = document.querySelector("#contBtn");
const contBtnClick = () => {
	e.preventDefault();
	window.location.href = `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1`;
}
contBtn.addEventListener("click", contBtnClick);

// 영화 출연진
fetch('https://api.themoviedb.org/3/movie/240/credits?language=en-US', options) // ID값을 비교해서 해당되는 것에 cast배열을 for문으로 불러온다?
.then((response) => response.json())
.then((data) => {
  const $moviePerson = document.querySelector("#movieContents");
	data.results.forEach((movie) => {
	const $movieCc = document.createElement("div"); 
	$movieCc.className = "movie-castcrew";
	$movieCc.innerHTML = `` // 살려주세요
		console.log(response);
  $moviePerson.appendChild($movieCc); 
  });

})
.catch(err => console.error(err));