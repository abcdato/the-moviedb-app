/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable import/no-cycle */
import { createContext, useState } from 'react';
import { Alert, Spin } from 'antd';
import MovieService from '../../api/MovieService';
import MovieCard from '../MovieCard/MovieCard';

const DataContext = createContext();

function DataProvider({ children }) {
  const movieService = new MovieService();

  const [genreList, setGenreList] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [ratedMovies, setRatedMovies] = useState([]);
  const [totalRatedPages, setTotalRatedPages] = useState(null);

  const handleError = (message) => {
    setLoading(false);
    setError(true);
    setErrorMessage(message);
  };

  const showMovies = (data) =>
    data &&
    data.map((movie) => {
      const {
        id,
        title,
        star,
        releaseDate,
        overview,
        posterPath,
        genreIds,
        rating,
        vote,
        voteCount,
      } = movie;

      return (
        <MovieCard
          key={id}
          id={id}
          title={title}
          star={star}
          releaseDate={releaseDate}
          overview={overview}
          posterPath={posterPath}
          genreIds={genreIds}
          genreList={genreList}
          rating={rating}
          vote={vote}
          voteCount={voteCount}
        />
      );
    });

  async function loadRatedData(page = 1) {
    try {
      const data = movieService.getRatedMovies(page);
      const rated = await data;

      if (!rated.totalResults) {
        handleError("Unfortunately we couldn't find any movies");
      } else if (rated.totalResults) {
        setRatedMovies(rated.movies);
        setTotalRatedPages(rated.totalPages);
        setLoading(false);
        setError(false);
      } else if (!rated) {
        setRatedMovies([]);
        setLoading(false);
        setError(false);
      }
    } catch {
      handleError("Couldn't load the data.");
    }
  }

  async function getGenres() {
    const allGenres = movieService.getGenres();
    const genres = await allGenres;

    setGenreList(genres.genres);
  }

  const spinner = loading ? <Spin size="large" /> : null;
  const errorMsg = error ? (
    <Alert message="Error" description={errorMessage} type="warning" showIcon />
  ) : null;

  const ratedContent = showMovies(ratedMovies);

  const value = {
    showMovies,
    getGenres,
    setLoading,
    handleError,
    setError,
    loadRatedData,
    loading,
    spinner,
    error,
    errorMsg,
    ratedContent,
    totalRatedPages,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export { DataProvider, DataContext };
