function Movie(title, year, actors) {
  var id;

  function generateUUID() {
    return Math.floor(Math.random() * Date.now()).toString(36);
  }

  if (!title) return alert("Title must be present");
  if (!year) return alert("Year must be present");
  if (!actors) return alert("Actors must be present");

  id = generateUUID();

  return {
    id,
    title,
    year,
    actors,
  }
}

function Movies() {
  var list = [];

  function add(movie) {
    if (movie.id) list.push(movie);
  }

  function remove(movieId) {
    var toBeRemoved = list.findIndex(function (el) {
      return el.id == movieId;
    });
    list.splice(toBeRemoved, 1);
  }

  return {
    list,
    add,
    remove,
  }
}

var movies = new Movies()

// Convenience methods
function getInputValue(target, name) {
  return target.querySelectorAll(`input[name='${name}']`)[0].value;
}

// Event listeners
function onAddMovie(event) {
  event.preventDefault();

  var title = getInputValue(event.target, 'title');
  var year = getInputValue(event.target, 'year');
  var actors = getInputValue(event.target, 'actors');
  var movie = new Movie(title, year, actors);

  movies.add(movie);
  renderMovies();
}

function onDeleteMovies() {
  var moviesToDelete = document.querySelectorAll("input[type='checkbox']:checked");
  moviesToDelete.forEach(function(movie) {
    movies.remove(movie.getAttribute('data-id'));
  });
  renderMovies();
}

// Bindings
var form = document.getElementById("add-movie-form");
if (form) {
  form.addEventListener("submit", onAddMovie);
} else {
  console.error("Failed to bind submit event");
}

// Initialize movies
var matrix = new Movie("The Matrix", "1999", "Keanu Reeves, Laurence Fishbourne")
var indiana = new Movie("Indiana Jones", "1989", "Harrison Ford, Sean Connery")
var casino = new Movie("Casino Royale", "2006", "Daniel Craig, Eva Green")

movies.add(matrix);
movies.add(indiana);
movies.add(casino);


// Render movie list
var movieContainer = document.getElementById('movie-list');

function renderMovies() {
  // Clean container
  movieContainer.innerHTML = '';
  // Add movies
  movies.list.forEach(function(movie) {
    var li = document.createElement("li");
    li.innerHTML = `<input type='checkbox' data-id='${movie.id}'> ${movie.title}, ${movie.year}, ${movie.actors}`;
    movieContainer.appendChild(li);
  });
}

renderMovies();
