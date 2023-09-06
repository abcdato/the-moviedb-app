class MoviesAPI {
  key = '1be9a44c716204acb901eac3dee95b08';

  url = 'https://api.themoviedb.org/3/';

  // getData = async (value) => {
  //   const res = await fetch(`${this.url}?api_key=${this.key}${value}`);
  //   const data = await res.json();

  //   return data;
  // };

  getMovies = async (query, page) => {
    try {
      if (query) {
        const res = await fetch(
          `${this.url}search/movie?api_key=${this.key}&query=${query}&page=${page}`,
        );
        const data = await res.json();
        const movies = this.tranformData(data);
        const totalPages = data.total_pages;
        const totalResults = data.total_results;

        return { movies, totalPages, totalResults };
      }
      return false;
    } catch (error) {
      throw new Error(error);
    }
  };

  getGenres = async () => {
    const res = await fetch(`${this.url}genre/movie/list?api_key=${this.key}`);
    const data = await res.json();

    return data;
  };

  // eslint-disable-next-line class-methods-use-this
  tranformData = (data) =>
    data.results.map((item) => ({
      id: item.id,
      title: item.title,
      releaseDate: item.release_date,
      overview: item.overview,
      posterPath: item.poster_path,
      genreIds: item.genre_ids,
      vote: item.vote_average,
    }));
}
export default MoviesAPI;
