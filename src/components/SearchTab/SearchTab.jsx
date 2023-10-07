import { useContext, useEffect, useState } from 'react';
import { Input, Pagination } from 'antd';
import { DataContext } from '../Context/DataContext';
import MovieService from '../../api/MovieService';
import { useDebounce } from '../../hooks/useDebounce';

function SearchTab() {
  const {
    getGenres,
    spinner,
    errorMsg,
    setLoading,
    showMovies,
    loading,
    error,
    handleError,
    setError,
  } = useContext(DataContext);

  const movieService = new MovieService();

  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);

  const debouncedQuery = useDebounce(query, 500);

  useEffect(() => {
    getGenres();
  }, []);

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

  useEffect(() => {
    loadData(debouncedQuery, currentPage);
  }, [debouncedQuery, currentPage]);

  const onInputChange = (e) => {
    setQuery(e.target.value);
    setCurrentPage(1);
    if (e.target.value) {
      setLoading(true);
    }
  };

  const onPageChange = (page) => {
    setCurrentPage(page);
    setLoading(true);
  };

  const hasData = !(loading || error) && movies.length !== 0;
  const content = hasData ? showMovies(movies) : null;

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

  return (
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
  );
}

export default SearchTab;
