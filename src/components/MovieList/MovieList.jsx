import React, { Component } from 'react';
import { Alert, Spin } from 'antd';
import MovieCard from '../MovieCard/MovieCard';

import MovieService from '../../api/MovieService';

import './MovieList.scss';

class MovieList extends Component {
  constructor() {
    super();

    this.state = {
      movies: [],
      loading: true,
      error: false,
    };
  }

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
      const movieService = new MovieService();
      const data = await movieService.getMovies('return');

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
      <Alert message="Error" description="Couldn't load the data." type="error" showIcon />
    ) : null;

    return (
      <ul className="movie-list">
        {spinner}
        {errorMsg}
        {content}
      </ul>
    );
  }
}

export default MovieList;
