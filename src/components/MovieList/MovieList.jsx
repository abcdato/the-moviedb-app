import React, { Component } from 'react';
import { Alert, Spin, Input, Pagination } from 'antd';
import MovieCard from '../MovieCard/MovieCard';

import MovieService from '../../api/MovieService';

import './MovieList.scss';

class MovieList extends Component {
  movieService = new MovieService();

  state = {
    movies: [],
    loading: true,
    error: false,
  };

  componentDidMount() {
    this.loadData();
  }

  onError() {
    this.setState({
      loading: false,
      error: true,
    });
  }

  async loadData() {
    try {
      const data = await this.movieService.getMovies('return');

      this.setState({
        movies: data,
        loading: false,
        error: false,
      });
    } catch {
      this.onError();
    }
  }

  showData(data) {
    return (
      data &&
      data.map((movie) => {
        const { id, title, releaseDate, overview, posterPath } = movie;

        return (
          <MovieCard key={id} title={title} releaseDate={releaseDate} overview={overview} posterPath={posterPath} />
        );
      })
    );
  }

  render() {
    const { movies, loading, error } = this.state;

    const hasData = !(loading || error);
    const spinner = loading ? <Spin size="large" /> : null;
    const content = hasData ? this.showData(movies) : null;
    const errorMsg = error ? (
      <Alert message="Error" description="Couldn't load the data." type="warning" showIcon />
    ) : null;

    return (
      <>
        <header className="header">
          <Input placeholder="Type to search..." />
        </header>
        <main className="main">
          <ul className="movie-list list">
            {spinner}
            {errorMsg}
            {content}
          </ul>
        </main>
        <footer className="footer">
          <Pagination />
        </footer>
      </>
    );
  }
}

export default MovieList;
