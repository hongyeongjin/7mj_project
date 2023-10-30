const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ZmMyZjNlYjc2OTRiYzdjNzljYjg3N2E3ZTRlNzlmMSIsInN1YiI6IjY1MmY5MGRlYTgwMjM2MDEzNzY4ZDM1YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.dDGo7-1RtO-vBd97qa-2rhOt4dkmtfgifT9OZY8CEco'
  }
};

fetch('https://api.themoviedb.org/3/movie/240/credits?language=ko-KR', options)
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err));

  console.log(response);



  