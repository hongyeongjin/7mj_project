const options = {
	method: 'GET',
	headers: {
		accept: 'application/json',
		Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ZTFlZDhjM2I0NmM2ZTZiYjY4MjYzMzBiNzM0ZTlkMCIsInN1YiI6IjY1MmYyMWU4ZWE4NGM3MDEyZDcxYWQ1ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1sdyif5DYVbjFmwmxjyHKX8sMQM6MPPDHoleRZROXBU'
	}
};

let prevPage = document.getElementById('prevPage')
let nextPage = document.getElementById('nextPage')

let cards = document.getElementById('cards')
let message = document.getElementById('message')
let searchBtn = document.getElementById('searchBtn')
let advancedBtn = document.getElementById('advancedBtn')
let advanced = document.getElementById('advanced')
let genreList
let curPage = document.getElementById('curPage')
let totalPage = document.getElementById('totalPage')

// 영화 정보 긁어오기
async function scrape_movie(m = 3) {
	let proms = [], movieList = []
	message.textContent = "로딩 중입니다. 잠시만 기다려주세요."
	for (let i = 1; i <= m; ++i) proms.push(await fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=' + i, options))
	let proms2 = await Promise.all(proms)
	let jsons = await Promise.all(proms2.map(res => res.json()))
	let results = await jsons.map(r => r.results.map(c => movieList.push(c)))
	return movieList
}

// 장르 정보 긁어오기
async function scrape_genre() {
	return fetch('https://api.themoviedb.org/3/genre/movie/list?language=en', options)
		.then(response => response.json())
		.then(res => {
			let d = {}
			res.genres.forEach(x => d[x.id] = x.name)
			return d
		})
		.catch(err => console.log(err));
}

// 영화 카드 만들기
let moviecard = movie => {
	let card = document.createElement('div')
	card.id = "card_" + movie.title.toUpperCase()
	card.classList.add('card')

	let poster = document.createElement('img')
	poster.classList.add('poster')
	poster.src = 'https://image.tmdb.org/t/p/original' + movie.poster_path
	poster.onclick = () => {
		let w = window.open('detail-page.html?id=' + movie.id);
	}
	card.appendChild(poster)

	let illu = document.createElement('div')
	illu.classList.add('illustration')

	let title = document.createElement('p')
	title.classList.add('title')
	title.textContent = movie.title
	title.style.display = 'inline-block'
	title.addEventListener('click', () => poster.click())
	illu.appendChild(title)

	let year_genre = document.createElement('p')
	year_genre.classList.add('year')
	card.genres = movie.genre_ids.map(i => genreList[Number(i)])
	year_genre.textContent = movie.release_date.slice(0, 4) + ' · ' + card.genres.join(', ')
	illu.appendChild(year_genre)

	let rating = document.createElement('p')
	rating.classList.add('rating')
	rating.textContent = 'Rating ' + movie.vote_average

	illu.appendChild(rating)
	
	

	let overview = document.createElement('overview')
	overview.classList.add('overview')

	illu.appendChild(overview)

	card.appendChild(illu)

	return card
}

// 장르 체크박스 만들기
let genrecheck = (id, name) => {
	let div = document.createElement('div')
	div.style.display = 'flex'

	let check = document.createElement('input')
	check.setAttribute("type", "checkbox");
	check.className = "checkBox"
	check.id = name
	check.checked = true
	div.appendChild(check)

	let label = document.createElement('label')
	label.setAttribute("for", name)
	label.textContent = name
	div.appendChild(label)

	return div
}

// 영화 장르 중 원하는 장르에 포함되는게 있는지 확인
let fit = card => {
	for (let genre of card.genres)
		if (document.getElementById(genre).checked) return true
	return false
}

async function main2() {
	let movieList = await scrape_movie()
	genreList = await scrape_genre()

	// 장르 체크박스 만들어 넣기
	let allgenres = genrecheck(0, "All")
	allgenres.firstChild.addEventListener('change', function () {
		if (this.checked)
			for (const check of advanced.children)
				check.firstChild.checked = true
		else
			for (const check of advanced.children)
				check.firstChild.checked = false
	})
	Object.entries(genreList).forEach(genre => {
		let gc = genrecheck(...genre)
		gc.firstChild.addEventListener('change', function () {
			allgenres.firstChild.checked = [...advanced.children].slice(0, -1).every(c => c.firstChild.checked)
		})
		advanced.appendChild(gc)
	})
	advanced.appendChild(allgenres)
	advancedBtn.onclick = () => advanced.style.display = advanced.style.display == 'none' ? 'grid' : 'none'
	message.textContent = ""

	// 영화 카드 만들어 넣기
	movieList.map(movie => cards.appendChild(moviecard(movie)))

	// 검색 기능
	let keyword = document.getElementById('keyword')
	let cardList = []
	const cardPerPage = 10
	searchBtn.onclick = () => {
		let kw = keyword.value.trim()
		let kwupper = kw.toUpperCase()
		keyword.value = ''
		if ([...advanced.children].slice(0, -1).every(c => !c.firstChild.checked)) {
			message.textContent = "검색 조건을 입력해주세요."; return
		}
		message.textContent = kw ? kw + "의 검색 결과" : "장르 검색 결과"
		cardList = []
		for (const card of cards.children) {
			if (card.id.slice(5).includes(kwupper) && fit(card)) cardList.push(card)
			card.style.display = "none"
		}
		let cardnum = cardList.length
		let pages = (cardnum + cardPerPage - 1) / cardPerPage | 0
		totalPage.textContent = pages
		curPage.max = Math.max(pages, 1)
		if (!pages) {
			message.textContent = "검색 결과가 없습니다."; return
		}
		curPage.textContent = 1
		for (let i = 0; i < Math.min(cardPerPage, cardnum); ++i) cardList[i].style.display = "flex"
	}
	// 페이지 이동 기능
	prevPage.onclick = () => {
		let p = Number(curPage.textContent)
		if (1 < p) {
			for (let i = cardPerPage * (p - 1); i < Math.min(cardList.length, cardPerPage * p); ++i) cardList[i].style.display = "none"
			curPage.textContent = --p
			for (let i = cardPerPage * (p - 1); i < cardPerPage * p; ++i) cardList[i].style.display = "flex"
		}
	}
	nextPage.onclick = () => {
		let p = Number(curPage.textContent)
		if (p < totalPage.textContent) {
			for (let i = cardPerPage * (p - 1); i < cardPerPage * p; ++i) cardList[i].style.display = "none"
			curPage.textContent = ++p
			for (let i = cardPerPage * (p - 1); i < Math.min(cardList.length, cardPerPage * p); ++i) cardList[i].style.display = "flex"
		}
	}
	// keyword.addEventListener('keypress', event => {
	// 	if (event.key == "Enter") searchBtn.click()
	// })
}
// 영화 상세정보
fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options)  
.then((response) => response.json())
.then((data) => {
  const $movieInf = document.querySelector("#movieInformation");
	data.results.forEach((movie) => {
	const $moviePost = document.createElement("div"); // div를 만든것
        $moviePost.className = "movie-card";
	$moviePost.innerHTML = `
          <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">` // 클릭시 아이디를 비교해서 같은 걸 가져온다.

  $movieInf.appendChild($moviePost); // div안에 넣은것 
  });

})
.catch(err => console.error(err));



main2()
