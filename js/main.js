const elList = document.querySelector(".list");
const elBookmarksList = document.querySelector(".bookmark__list");
const elInput = document.querySelector(".search");
const elSortSelect = document.querySelector(".js-sort");
//modal Elements
const elFilmModal = document.querySelector(".modal");
const elModalHeading = document.querySelector(".modal__heading");
const elModalPoster = document.querySelector(".modal__poster");
const elModalDesc = document.querySelector(".modal__desc");

const localBookmMarks = JSON.parse(window.localStorage.getItem("BookMarks"));
const BookMarks = localBookmMarks || [];
renderBookMarks(BookMarks, elBookmarksList);

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
    const newOption = document.createElement("option");
    newOption.value = genre;
    newOption.textContent = genre;
    node.appendChild(newOption);
  });
}
//Render Bookmark
function renderBookMarks(arr, node) {
  node.innerHTML = null;
  arr.forEach((row) => {
    //=================Create elements=========================>

    const newLi = document.createElement("li");

    const newButton = document.createElement("button");

    const newImg = document.createElement("img");

    const newOweriew = document.createElement("p");

    //=================Text contents=========================>

    newLi.textContent = row.title;

    newButton.textContent = "delete";

    newButton.dataset.filmId = row.id;

    newOweriew.textContent =
      row.overview.split(" ").slice(0, 10).join(" ") + "...";
    //=================Setattributes=========================>

    newLi.setAttribute("class", "list__item");

    newButton.classList.add("bookmarks__delete-btn");

    newButton.classList.add("button__sumbit__css");

    newButton.setAttribute("type", "button");

    newImg.setAttribute("src", row.poster);

    newImg.setAttribute("alt", row.title + " poster");

    newImg.setAttribute("width", "200");

    newImg.setAttribute("height", "200");

    //=================appendChild=========================>

    newLi.appendChild(newImg);

    newLi.appendChild(newOweriew);

    newLi.appendChild(newButton);

    node.appendChild(newLi);
  });
}
//Bookmark
elBookmarksList.addEventListener("click", (evt) => {
  const isDeleteButton = evt.target.matches(".bookmarks__delete-btn");
  if (isDeleteButton) {
    const filmId = evt.target.dataset.filmId;

    const foundFilmIndex = BookMarks.findIndex((row) => row.id === filmId);

    BookMarks.splice(foundFilmIndex, 1);
    renderBookMarks(BookMarks, elBookmarksList);
    window.localStorage.setItem("BookMarks", JSON.stringify(BookMarks));
  }
});
//modal
elFilmModal.addEventListener("click", (evt) => {
  const isTargetRemover =
    evt.target.matches(".modal") || evt.target.matches(".modal__close-button");
  if (isTargetRemover) {
    elFilmModal.classList.remove("modal-open");
  }
});

function renderFilmModal(film) {
  elModalHeading.textContent = film.title;
  elModalPoster.src = film.poster;
  elModalDesc.textContent = film.overview;
}

//Render films
function renderFilms(arr, node) {
  elList.innerHTML = null;
  node.innerHTML = null;
  arr.forEach((film) => {
    var newLi = document.createElement("li");
    var newHeading = document.createElement("h3");
    var newImage = document.createElement("img");
    var newParagraph = document.createElement("p");
    var newbookMarkBtn = document.createElement("button");
    var newMoreBtn = document.createElement("button");
    var newTime = document.createElement("time");
    var newGenreList = document.createElement("ul");

    newHeading.textContent = film.title;
    newParagraph.textContent =
      film.overview.split(" ").slice(0, 10).join(" ") + "...";

    newMoreBtn.textContent = "More";
    newbookMarkBtn.textContent = "bookmark";

    for (var genre of film.genres) {
      var newGenreLi = document.createElement("li");
      newGenreLi.textContent = genre;
      newGenreList.appendChild(newGenreLi);
    }

    newLi.setAttribute("class", "list__item film");
    newHeading.setAttribute("class", "film__heading");
    newImage.setAttribute("class", "film__image");
    newImage.setAttribute("src", film.poster);
    newImage.setAttribute("alt", film.title + " poster");
    newbookMarkBtn.setAttribute("class", "bookmarkbtn , button__sumbit__css");
    newbookMarkBtn.dataset.filmId = film.id;

    newMoreBtn.setAttribute("class", "more__button , button__sumbit__css");
    newMoreBtn.dataset.filmId = film.id;

    newImage.setAttribute("width", "200");
    newImage.setAttribute("height", "200");

    newLi.appendChild(newImage);
    newLi.appendChild(newHeading);
    newLi.appendChild(newParagraph);
    newLi.appendChild(newTime);
    newLi.appendChild(newGenreList);
    newLi.appendChild(newbookMarkBtn);
    newLi.appendChild(newMoreBtn);
    node.appendChild(newLi);
  });
}

const sortFns = {
  0: (a, b) => {
    if (a.title < b.title) {
      return -1;
    }
    if (a.title > b.title) {
      return 1;
    }
    return 0;
  },
  1: (a, b) => {
    if (a < b) {
      return 1;
    }
    if (a.title > b.title) {
      return -1;
    }
    return 0;
  },
  2: (a, b) => a.release_date - b.release_date,
  3: (a, b) => b.release_date - a.release_date,
};

form.addEventListener("submit", (evt) => {
  evt.preventDefault();

  const genreValue = select.value;
  const searchValue = elInput.value.trim();
  const sortValue = elSortSelect.value;

  const newRegx = new RegExp(searchValue, "gi");

  let filteredFilms = [];

  if (genreValue === "all" && !searchValue) {
    filteredFilms = films;
  } else {
    filteredFilms = films
      .filter((film) => film.genres.includes(genreValue))
      .filter((movie) => movie.title.match(newRegx));
  }

  filteredFilms.sort(sortFns[sortValue]);
  console.log(sortFns[sortValue]);
  renderFilms(filteredFilms, elList);
});

elList.addEventListener("click", (evt) => {
  const isBookmarkBtn = evt.target.matches(".bookmarkbtn");

  const isMoreBtn = evt.target.matches(".more__button");

  if (isBookmarkBtn) {
    const filmId = evt.target.dataset.filmId;

    const foundFilm = films.find((row) => row.id === filmId);

    if (!BookMarks.includes(foundFilm)) {
      BookMarks.push(foundFilm);

      renderBookMarks(BookMarks, elBookmarksList);
      window.localStorage.setItem("BookMarks", JSON.stringify(BookMarks));
    }
  } else if (isMoreBtn) {
    const filmId = evt.target.dataset.filmId;

    const foundFilm = films.find((row) => row.id === filmId);
    elFilmModal.classList.add("modal-open");
    renderFilmModal(foundFilm);
  }
});

renderFilms(films, elList);
generateGenres(films, select);
