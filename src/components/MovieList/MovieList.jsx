import React, { Component } from 'react';
import { Alert, Spin, Input, Pagination } from 'antd';
import debounce from 'lodash.debounce';
import MovieCard from '../MovieCard/MovieCard';

import MovieService from '../../api/MovieService';

import './MovieList.scss';

class MovieList extends Component {
  movieService = new MovieService();

  state = {
    movies: [],
    totalPages: null,
    query: '',
    currentPage: 1,
    loading: false,
    error: false,
    errorMessage: '',
  };

  debouncedLoadData = debounce(this.loadData, 750);

  componentDidUpdate(prevProps, prevState) {
    const { query, currentPage } = this.state;

    if (currentPage !== prevState.currentPage) {
      this.loadData(query, currentPage);
    }
  }

  onError = (message) => {
    this.setState(() => ({
      loading: false,
      error: true,
      errorMessage: message,
    }));
  };

  onPageChange = (page) => {
    this.setState(() => ({
      currentPage: page,
      loading: true,
    }));
  };

  onInputChange = (event) => {
    this.setState(
      () => ({
        query: event.target.value,
        currentPage: 1,
        loading: true,
      }),
      () => {
        const { query } = this.state;
        this.debouncedLoadData(query.trim());
      }
    );
  };

  showMovies = (data) =>
    data &&
    data.map((movie) => {
      const { id, title, releaseDate, overview, posterPath } = movie;

      return <MovieCard key={id} title={title} releaseDate={releaseDate} overview={overview} posterPath={posterPath} />;
    });

  async loadData(movie, page = 1) {
    try {
      const data = await this.movieService.getMovies(movie, page);

      if (movie && !data.totalResults) {
        this.onError("Unfortunately we couldn't find any movies");
      } else if (movie && data.totalResults) {
        this.setState(() => ({
          movies: data.movies,
          totalPages: data.totalPages,
          loading: false,
          error: false,
        }));
      } else if (!data) {
        this.setState(() => ({
          movies: [],
          loading: false,
          error: false,
        }));
      }
    } catch {
      this.onError("Couldn't load the data.");
    }
  }

  render() {
    const { movies, totalPages, currentPage, loading, query, error, errorMessage } = this.state;

    const hasData = !(loading || error) && movies.length !== 0;
    const spinner = loading ? <Spin size="large" /> : null;
    const content = hasData ? this.showMovies(movies) : null;
    const errorMsg = error ? <Alert message="Error" description={errorMessage} type="warning" showIcon /> : null;

    const pagination = hasData ? (
      <Pagination
        current={currentPage}
        pageSize={1}
        showSizeChanger={false}
        onChange={this.onPageChange}
        total={totalPages}
      />
    ) : null;

    return (
      <>
        <header className="header">
          <Input placeholder="Type to search..." value={query} onChange={this.onInputChange} />
        </header>
        <main className="main">
          <ul className="movie-list list">
            {spinner}
            {errorMsg}
            {content}
          </ul>
        </main>
        <footer className="footer">{pagination}</footer>
      </>
    );
  }
}

export default MovieList;
