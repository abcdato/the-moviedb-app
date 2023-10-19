import { useContext, useEffect, useState } from 'react';
import { Pagination, Alert, Spin } from 'antd';
import { DataContext } from '../Context/DataContext';

import MovieService from '../../api/MovieService';

function RatedTab() {
  const movieService = new MovieService();

  const { showMovies } = useContext(DataContext);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [ratedMovies, setRatedMovies] = useState([]);
  const [totalPages, setTotalPages] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const handleError = (message) => {
    setLoading(false);
    setError(true);
    setErrorMessage(message);
  };

  async function loadRatedData(page = 1) {
    try {
      const data = movieService.getRatedMovies(page);
      const rated = await data;

      if (!rated.totalResults) {
        handleError("Unfortunately we couldn't find any movies");
      } else if (rated.totalResults) {
        setRatedMovies(rated.movies);
        setTotalPages(rated.totalPages);
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

  useEffect(() => {
    loadRatedData(currentPage);
  }, [currentPage]);

  const onPageChange = (page) => {
    setCurrentPage(page);
    setLoading(true);
  };

  const hasData = !(loading || error) && ratedMovies.length !== 0;

  const spinner = loading ? <Spin size="large" /> : null;

  const ratedContent = hasData ? (
    <ul className="movie-list list">{showMovies(ratedMovies)}</ul>
  ) : null;

  const errorMsg = error ? (
    <Alert message="Error" description={errorMessage} type="warning" showIcon />
  ) : null;

  const pagination =
    (!spinner && totalPages) > 1 ? (
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
      <main className="main">
        {errorMsg}
        {spinner}
        {ratedContent}
      </main>
      <footer className="footer">{pagination}</footer>
    </>
  );
}

export default RatedTab;
