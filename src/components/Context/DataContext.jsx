/* eslint-disable import/no-cycle */
import { createContext, useEffect, useState } from 'react';
import { Alert, Pagination, Spin } from 'antd';
import { useDebounce } from '../../hooks/useDebounce';
import MovieService from '../../api/MovieService';
import MovieCard from '../MovieCard/MovieCard';

const DataContext = createContext();

// eslint-disable-next-line react/prop-types
function DataProvider({ children }) {
  const movieService = new MovieService();

  const [movies, setMovies] = useState([]);
  const [genreList, setGenreList] = useState([]);
  const [totalPages, setTotalPages] = useState(null);
  const [query, setQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [ratedMovies, setRatedMovies] = useState(
    () => JSON.parse(localStorage.getItem('ratedMovies')) || [],
  );

  useEffect(() => {
    localStorage.setItem('ratedMovies', JSON.stringify(ratedMovies));
  }, [ratedMovies]);

  const debouncedQuery = useDebounce(query, 500);

  const onInputChange = (event) => {
    setQuery(event.target.value);
    setCurrentPage(1);
    if (event.target.value) {
      setLoading(true);
    }
  };

  const handleError = (message) => {
    setLoading(false);
    setError(true);
    setErrorMessage(message);
  };

  async function loadData(movie, page = 1) {
    try {
      const data = await movieService.getMovies(movie, page);

      if (movie && !data.totalResults) {
        handleError("Unfortunately we couldn't find any movies");
      } else if (movie && data.totalResults) {
        setMovies(data.movies);
        setTotalPages(data.totalPages);
        setLoading(false);
        setError(false);
      } else if (!data) {
        setMovies([]);
        setLoading(false);
        setError(false);
      }
    } catch {
      handleError("Couldn't load the data.");
    }
  }

  const onPageChange = (page) => {
    setCurrentPage(page);
    setLoading(true);
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
        vote,
        voteCount,
        disabledRate,
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
          vote={vote}
          voteCount={voteCount}
          disabled={disabledRate}
        />
      );
    });

  async function getGenres() {
    const allGenres = movieService.getGenres();
    const genres = await allGenres;

    setGenreList(genres.genres);
  }

  const hasData = !(loading || error) && movies.length !== 0;
  const spinner = loading ? <Spin size="large" /> : null;
  const content = hasData ? showMovies(movies) : null;
  const ratedContent = showMovies(ratedMovies);
  const errorMsg = error ? (
    <Alert message="Error" description={errorMessage} type="warning" showIcon />
  ) : null;

  const pagination =
    hasData && totalPages > 1 ? (
      <Pagination
        current={currentPage}
        pageSize={1}
        showSizeChanger={false}
        onChange={onPageChange}
        total={totalPages}
      />
    ) : null;

  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const value = {
    onInputChange,
    loadData,
    onPageChange,
    showMovies,
    getGenres,
    setRatedMovies,
    query,
    debouncedQuery,
    spinner,
    content,
    ratedContent,
    errorMsg,
    pagination,
    currentPage,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export { DataProvider, DataContext };
