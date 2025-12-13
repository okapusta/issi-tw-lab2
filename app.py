from flask import Flask, render_template, redirect, request
from models import Movie
from lib.database_manager import DatabaseManager

app = Flask(__name__)

@app.route("/", methods=['GET'])
def home():
    manager = DatabaseManager(dataclass=Movie)
    return render_template("home.html", movies=manager.list_movies())

@app.route("/movies/new", methods=['GET'])
def new_movie():
    return render_template("new.html")

@app.route("/movies", methods=['POST'])
def create_movie():
    movie = Movie(
        title=request.form.get('title'),
        year=request.form.get('year'),
        actors=request.form.get('actors')
    )
    if movie.valid():
        manager = DatabaseManager(dataclass=Movie)
        manager.create_movie(movie)
        return redirect("/")
    else:
        return redirect('/movies/new')

@app.route("/movies-destroy", methods=['POST'])
def destroy_movie():
    movies_to_remove_ids = request.form.getlist('movies-to-remove')
    # app.logger.debug('movies to remove', list(movies_to_remove_ids))
    manager = DatabaseManager(dataclass=Movie)
    manager.destroy_movies(list(movies_to_remove_ids))
    return redirect("/")
