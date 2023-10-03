/* eslint-disable class-methods-use-this */
class MoviesAPI {
  key = '1be9a44c716204acb901eac3dee95b08';

  base = 'https://api.themoviedb.org/3/';

  token = JSON.parse(localStorage.getItem('guestToken'));

  requestGet = (url) =>
    fetch(url).then((res) => {
      if (!res.ok) {
        throw new Error(
          `Error fetching URL: ${url}, response status is ${res.status}`,
        );
      }
      return res.json();
    });

  transformData = (data) =>
    data.results.map((item) => ({
      id: item.id,
      title: item.title,
      releaseDate: item.release_date,
      overview: item.overview,
      posterPath: item.poster_path,
      genreIds: item.genre_ids,
      vote: item.vote_average,
      voteCount: item.vote_count,
    }));

  async createGuestSession() {
    const url = new URL(`${this.base}authentication/guest_session/new`);
    url.searchParams.set('api_key', this.key);

    const data = await this.requestGet(url);

    const session = data.guest_session_id;
    console.log(data, session);
    return session;
  }

  async getMovies(query, page) {
    const url = new URL(`${this.base}search/movie`);
    url.searchParams.set('api_key', this.key);
    url.searchParams.set('query', query);
    url.searchParams.set('page', page);

    const data = await this.requestGet(url);
    const movies = this.transformData(data);
    const totalPages = data.total_pages;
    const totalResults = data.total_results;

    return { movies, totalPages, totalResults };
  }

  async getGenres() {
    const url = new URL(`${this.base}genre/movie/list`);
    url.searchParams.set('api_key', this.key);

    const data = await this.requestGet(url);
    return data;
  }

  async rateMovie(id, rate) {
    const url = new URL(`${this.base}movie/${id}/rating`);
    url.searchParams.set('api_key', this.key);
    url.searchParams.set('guest_session_id', this.token);

    const body = {
      value: rate,
    };
    const headers = {
      'Content-Type': 'application/json;charset=utf-8',
    };

    const data = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(body),
      headers,
    }).catch((e) => {
      throw new Error(e);
    });

    return data;
  }

  async deleteRatedMovie(id) {
    const url = new URL(`${this.base}movie/${id}/rating`);
    url.searchParams.set('api_key', this.key);
    url.searchParams.set('guest_session_id', this.token);

    const headers = {
      'Content-Type': 'application/json;charset=utf-8',
    };

    const data = await fetch(url, {
      method: 'DELETE',
      headers,
    });

    return data;
  }

  async getRatedMovies() {
    const url = new URL(`${this.base}guest_session/${this.token}/rated/movies`);
    url.searchParams.set('api_key', this.key);

    const data = await this.requestGet(url);

    return data;
  }
}

export default MoviesAPI;
