import sqlite3

from models import Movie
class DatabaseManager():
  def with_connection(func):
    def wrapper(self):
      self.db = sqlite3.connect('movies.db')
      self.cursor = self.db.cursor()
      result = func(self)
      self.db.close()

      return result

    return wrapper

  @with_connection
  def list_movies(self):
    movies = []
    self.cursor.execute('SELECT * FROM movies')
    for row in self.cursor:
      movies.append(Movie(id=row[0], title=row[1], year=row[2], actors=row[3]))

    return movies

  @with_connection
  def create_movie(self, movie):
    self.cursor.execute(f'INSERT INTO movies (title, year, actors) VALUES ("{movie.title}", "{movie.year}", "{movie.actors}")')
    self.db.commit()

  @with_connection
  def destroy_movies(self, ids_to_remove):
    self.cursor.execute(f'DELETE FROM movies WHERE id IN (?)', ids_to_remove)
    self.db.commit()
