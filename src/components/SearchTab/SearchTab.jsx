import { useContext, useEffect } from 'react';
import { Input } from 'antd';
import { DataContext } from '../Context/DataContext';

function SearchTab() {
  const {
    getGenres,
    loadData,
    debouncedQuery,
    currentPage,
    query,
    onInputChange,
    spinner,
    errorMsg,
    content,
    pagination,
  } = useContext(DataContext);

  useEffect(() => {
    getGenres();
  }, []);

  useEffect(() => {
    loadData(debouncedQuery, currentPage);
  }, [debouncedQuery, currentPage]);

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
