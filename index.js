const BASE_URL = 'https://movie-list.alphacamp.io/api/v1/movies/'
const IMAGE_URL = 'https://movie-list.alphacamp.io/posters/'
const data = []
const genres = {
  "1": "Action",
  "2": "Adventure",
  "3": "Animation",
  "4": "Comedy",
  "5": "Crime",
  "6": "Documentary",
  "7": "Drama",
  "8": "Family",
  "9": "Fantasy",
  "10": "History",
  "11": "Horror",
  "12": "Music",
  "13": "Mystery",
  "14": "Romance",
  "15": "Science Fiction",
  "16": "TV Movie",
  "17": "Thriller",
  "18": "War",
  "19": "Western"
}

const genresList = document.querySelector('#genres-list')
const movieContent = document.querySelector('#movie-content')

function initialize() {
  // left genres list
  let htmlContent = ''
  for (const key in genres) {
    htmlContent += `
    <a class="list-group-item list-group-item-action ${(+key === 1) ? 'active' : ''}" data-toggle="list" href="javascript:;" data-id="${key}">${genres[key]}</a>
    `
  }
  genresList.innerHTML = htmlContent

  // get movie data and display it (default is genre 1)
  axios.get(BASE_URL)
    .then(function (response) {
      data.push(...response.data.results)
      displayData(getDataByGenreId(1))
    })
    .catch(function (error) {
      console.log(error)
    })
    .then(function () {
    })
}

function displayData(targetData) {
  targetData = targetData || data
  let htmlContent = ''

  targetData.forEach(movie => {
    let spanContent = ''
    movie.genres.forEach(genreInx => {
      spanContent += `<span class="badge badge-light font-weight-light p-2 mr-1 mb-2">${genres[genreInx]}</span>`
    })

    htmlContent += `
    <div class="col-3">
      <div class="card mb-2">
        <img class="card-img-top" src="${IMAGE_URL + movie.image}" alt="Card image cap">
        <div class="card-body">
          <h5>${movie.title}</h5>
          <p class="card-text mt-3">
            ${spanContent}
          </p>
        </div>
      </div>
    </div>
    `
  })

  movieContent.innerHTML = htmlContent
}

function getDataByGenreId(genresId) {
  return data.filter(movie => {
    if (movie.genres.includes(+genresId)) return true
  })
}

// ======
initialize()
genresList.addEventListener('click', () => {
  displayData(getDataByGenreId(event.target.dataset.id))
})