/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable import/no-cycle */
import { createContext, useState } from 'react';
import MovieService from '../../api/MovieService';
import MovieCard from '../MovieCard/MovieCard';

const DataContext = createContext();

function DataProvider({ children }) {
  const movieService = new MovieService();

  const [genreList, setGenreList] = useState([]);

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

  async function getGenres() {
    const allGenres = movieService.getGenres();
    const genres = await allGenres;

    setGenreList(genres.genres);
  }

  const value = {
    showMovies,
    getGenres,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export { DataProvider, DataContext };
