import { useContext } from 'react';
import { DataContext } from '../Context/DataContext';

function RatedTab() {
  const {
    ratedContent,
    // pagination,
  } = useContext(DataContext);

  return (
    <>
      <main className="main">
        <ul className="movie-list list">{ratedContent}</ul>
      </main>
      {/* <footer className="footer">{pagination}</footer> */}
    </>
  );
}

export default RatedTab;
