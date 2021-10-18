import React, { Component } from 'react';
import MovieCard from '../MovieCard/MovieCard';

import MovieService from '../../api/MovieService';

import './MovieList.scss';

class MovieList extends Component {
  constructor() {
    super();

    this.state = {
      movies: [],
    };
  }

  async componentDidMount() {
    try {
      const movieService = new MovieService();
      const data = await movieService.getMovies('return');

      this.setState({ movies: data });
    } catch (error) {
      throw new Error(error);
    }
  }

  render() {
    const { movies } = this.state;

    const data = movies.map((movie) => {
      const { id, title, releaseDate, overview, posterPath } = movie;

      return <MovieCard key={id} title={title} releaseDate={releaseDate} overview={overview} posterPath={posterPath} />;
    });

    return <div className="movie-list">{data}</div>;
  }
}

export default MovieList;
