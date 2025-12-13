from dataclasses import dataclass

@dataclass
class Movie():
  title: str
  year: int
  actors: str

  id: int = None

  def valid(self):
    return len(self.title) > 0 and self.year and len(self.actors) > 0
