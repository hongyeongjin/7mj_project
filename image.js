// 이미지 긁어오기
const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNjljODJlODU3MWZkMWZkMzc3ZTBmZDRlZmIyODlmMyIsInN1YiI6IjY1MmY1OGJmYTgwMjM2MDEzNzY4YjI2NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1Awo6M01WgSRBmpdigE4KA2fip55k3C-KgB8B7CL7Qg'
    }
  };
  export async function scrape_image(id) {
  return await fetch(`https://api.themoviedb.org/3/movie/${id}/images`, options)
    .then(response => response.json())
    .then(response => response.backdrops[0].file_path)
    .catch(err => console.error(err));
  }