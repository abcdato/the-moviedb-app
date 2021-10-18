export default class MoviesAPI {
  APIKey = '1be9a44c716204acb901eac3dee95b08';

  url = 'https://api.themoviedb.org/3/search/movie';

  async getMovies(query) {
    try {
      const res = await fetch(`${this.url}?api_key=${this.APIKey}&query=${query}`);
      const data = await res.json();
      const movies = data.results.map((movie) => ({
        id: movie.id,
        title: movie.title,
        releaseDate: movie.release_date,
        overview: movie.overview,
        posterPath: movie.poster_path,
      }));

      return movies;
    } catch (error) {
      throw new Error(error);
    }
  }
}
