var elList = document.querySelector('.list');
const elInput = document.querySelector('.search');
const elSortSelect = document.querySelector('.js-sort');



function generateGenres(films, node) {
	var result = [];

	films.forEach((film) => {
		film.genres.forEach((genre) => {
			if (!result.includes(genre)) {
				result.push(genre);
			}
		});
	});



	result.forEach((genre) => {
		const newOption = document.createElement('option');
		newOption.value = genre;
		newOption.textContent = genre;
		node.appendChild(newOption);
	});

}





function renderFilms(arr, node) {
	elList.innerHTML = null;
	node.innerHTML = null;
	arr.forEach((film) => {
		var newLi = document.createElement('li');
		var newHeading = document.createElement('h3');
		var newImage = document.createElement('img');
		var newParagraph = document.createElement('p');
		var newTime = document.createElement('time');
		var newGenreList = document.createElement('ul');

		newHeading.textContent = film.title;
		newParagraph.textContent =
			film.overview.split(' ').slice(0, 10).join(' ') + '...';
		newTime.textContent = normalizeDate(film.release_date);

		for (var genre of film.genres) {
			var newGenreLi = document.createElement('li');
			newGenreLi.textContent = genre;
			newGenreList.appendChild(newGenreLi);
		}

		newLi.setAttribute('class', 'list__item film');
		newHeading.setAttribute('class', 'film__heading');
		newImage.setAttribute('class', 'film__image');
		newImage.setAttribute('src', film.poster);
		newImage.setAttribute('alt', film.title + ' poster');

		newImage.setAttribute('width', '200');
		newImage.setAttribute('height', '200');

		newLi.appendChild(newHeading);
		newLi.appendChild(newImage);
		newLi.appendChild(newParagraph);
		newLi.appendChild(newTime);
		newLi.appendChild(newGenreList);

		node.appendChild(newLi);
	});
}

const sortFns = {
	0: (a, b) => {
		if (a.title < b.title){
			return -1
		}
		if (a.title > b.title) {
			return 1
		}
		return 0
	},
	1: (a, b) => {
		if (a < b){
			return 1
		}
		if (a.title > b.title) {
			return -1
		}
		return 0
	}, 
	2: (a, b) => a.release_date - b.release_date,
	3: (a, b) => b.release_date - a.release_date, 
}

form.addEventListener('submit', (evt) => {
	evt.preventDefault();

	const genreValue = select.value;
	const searchValue = elInput.value.trim();
	const sortValue = elSortSelect.value;

	const newRegx = new RegExp(searchValue, 'gi');

	let filteredFilms = [];

	if (genreValue === 'all' && !searchValue) {
		filteredFilms = films;
	} else {
		filteredFilms = films
			.filter((film) => film.genres.includes(genreValue))
			.filter(movie => movie.title.match(newRegx));
		
	}

	filteredFilms.sort(sortFns[sortValue]);
	console.log(sortFns[sortValue]);
	renderFilms(filteredFilms, elList);

});

renderFilms(films, elList);
generateGenres(films, select);