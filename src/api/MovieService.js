class MoviesAPI {
  key = '1be9a44c716204acb901eac3dee95b08';

  url = 'https://api.themoviedb.org/3/search/movie';

  async getMovies(query) {
    try {
      const res = await fetch(`${this.url}?api_key=${this.key}&query=${query}`);
      const data = await res.json();
      const movies = data.results.map(this.tranformData);

      return movies;
    } catch (error) {
      throw new Error(error);
    }
  }

  tranformData = (data) => ({
    id: data.id,
    title: data.title,
    releaseDate: data.release_date,
    overview: data.overview,
    posterPath: data.poster_path,
  });
}

export default MoviesAPI;
