// 영화 줄거리
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id');

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ZmMyZjNlYjc2OTRiYzdjNzljYjg3N2E3ZTRlNzlmMSIsInN1YiI6IjY1MmY5MGRlYT80dDGo7-1RtO-vBd97qa-2rhOt4dkmtfgifT9OZY8CEco'
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
    $movieOverview1.innerHTML = `<p>${data.overview}</p>`;
    $movieOver.appendChild($movieOverview1);
  })
  .catch(err => console.error(err));

// 영화 출연진 정보 가져오기
fetch(`https://api.themoviedb.org/3/movie/${id}/credits?language=en-US`, options)
  .then((response) => response.json())
  .then((data) => {
    const $moviePerson = document.querySelector(".movieContents");
    const castData = data.cast;
    for(let i=0;i<Math.min(5,castData.length);++i){
      const $movieCc = document.createElement("div");
      $movieCc.className = "movie-castcrew";
      $movieCc.innerHTML = `
        <img src="https://image.tmdb.org/t/p/w500${castData[i].profile_path}">
        <p>${castData[i].name}</p>`;
      $moviePerson.appendChild($movieCc);
    }
  })
  .catch(err => console.error(err));


const contBtn = document.querySelector("#contBtn");
const contBtnClick = (e) => {
  e.preventDefault();
  window.location.href = `https://api.themoviedb.org/3/movie/${id}?language=en-US`;
};

contBtn.addEventListener("click", contBtnClick);
