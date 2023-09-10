import { useEffect, useState } from 'react';
import { Alert, Input, Pagination, Tabs, Spin } from 'antd';
import { useDebounce } from '../../hooks/useDebounce';

import MovieCard from '../MovieCard/MovieCard';
import MovieService from '../../api/MovieService';

import './MovieList.scss';

function MovieList() {
  const movieService = new MovieService();

  const [movies, setMovies] = useState([]);
  const [genreList, setGenreList] = useState([]);
  const [totalPages, setTotalPages] = useState(null);
  const [query, setQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const debouncedQuery = useDebounce(query, 500);

  const onInputChange = (event) => {
    setQuery(event.target.value);
    setCurrentPage(1);
    if (event.target.value) {
      setLoading(true);
    }
  };

  const onError = (message) => {
    setLoading(false);
    setError(true);
    setErrorMessage(message);
  };

  async function loadData(movie, page = 1) {
    try {
      const data = await movieService.getMovies(movie, page);

      if (movie && !data.totalResults) {
        onError("Unfortunately we couldn't find any movies");
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
      onError("Couldn't load the data.");
    }
  }

  const onPageChange = (page) => {
    setCurrentPage(page);
    setLoading(true);
  };

  const showMovies = (data) =>
    data &&
    data.map((movie) => {
      const { id, title, releaseDate, overview, posterPath, genreIds, vote } =
        movie;

      return (
        <MovieCard
          key={id}
          title={title}
          releaseDate={releaseDate}
          overview={overview}
          posterPath={posterPath}
          genreIds={genreIds}
          genreList={genreList}
          vote={vote}
        />
      );
    });

  useEffect(() => {
    async function getGenreName() {
      const allGenres = movieService.getGenres();
      const genres = await allGenres;

      setGenreList(genres.genres);
    }
    getGenreName();
  }, []);

  useEffect(() => {
    loadData(debouncedQuery, currentPage);
  }, [debouncedQuery, currentPage]);

  const hasData = !(loading || error) && movies.length !== 0;
  const spinner = loading ? <Spin size="large" /> : null;
  const content = hasData ? showMovies(movies) : null;
  const errorMsg = error ? (
    <Alert message="Error" description={errorMessage} type="warning" showIcon />
  ) : null;

  const pagination =
    hasData && totalPages > 1 ? (
      <Pagination
        current={currentPage}
        pageSize={1}
        showSizeChanger={false}
        // showQuickJumper
        onChange={onPageChange}
        total={totalPages}
      />
    ) : null;

  const items = [
    {
      key: '1',
      label: 'Search',
      children: (
        <>
          <header className="header">
            <Input
              placeholder="Type to search..."
              value={query}
              onChange={onInputChange}
            />
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
      ),
    },
    {
      key: '2',
      label: 'Rated',
      children: (
        <>
          <main className="main">
            {/* <ul className="movie-list list">
              {spinner}
              {errorMsg}
              {content}
            </ul> */}
          </main>
          {/* <footer className="footer">{pagination}</footer> */}
        </>
      ),
    },
  ];

  return <Tabs centered defaultActiveKey="1" items={items} />;
}

export default MovieList;
