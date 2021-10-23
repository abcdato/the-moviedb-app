/* eslint-disable no-console */
class MoviesAPI {
  key = '1be9a44c716204acb901eac3dee95b08';

  url = 'https://api.themoviedb.org/3/search/movie';

  getData = async (url) => {
    const res = await fetch(`${this.url}?api_key=${this.key}${url}`);
    const data = await res.json();

    return data;
  };

  getMovies = async (query, page) => {
    try {
      const data = await this.getData(`&query=${query}&page=${page}`);
      const movies = this.tranformData(data);
      const totalPages = data.total_pages;

      return { movies, totalPages };
    } catch (error) {
      throw new Error(error);
    }
  };

  tranformData = (data) =>
    data.results.map((item) => ({
      id: item.id,
      title: item.title,
      releaseDate: item.release_date,
      overview: item.overview,
      posterPath: item.poster_path,
    }));
}

export default MoviesAPI;
