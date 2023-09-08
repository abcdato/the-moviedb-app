import PropTypes from 'prop-types';
import { format } from 'date-fns';
import { Empty, Rate } from 'antd';

import Genres from '../Genres/Genres';
import './MovieCard.scss';

function MovieCard({
  title,
  releaseDate,
  overview,
  posterPath,
  genreIds,
  genreList,
  vote,
}) {
  const truncate = (str, num, useWordBoundary) => {
    if (str.length <= num) {
      return str;
    }
    const subString = str.substr(0, num - 1);
    return `${
      useWordBoundary
        ? subString.substr(0, subString.lastIndexOf(' '))
        : subString
    } ...`;
  };

  const date = releaseDate
    ? format(new Date(releaseDate), 'MMMM d, yyyy')
    : null;
  const posterUrl = `https://image.tmdb.org/t/p/w200/${posterPath}`;
  const posterImg = (
    <img
      className="card__poster"
      src={posterUrl}
      alt="movie poster"
      loading="lazy"
      height="280"
      width="185"
    />
  );
  const text = overview ? truncate(overview, 140, true) : null;
  const voteFixed = vote ? vote.toFixed(1) : null;
  const empty = <Empty description="Image Not Found" />;

  return (
    <li className="movie-card card">
      <div className="card__poster-wrapper">
        {posterUrl ? posterImg : empty}
      </div>
      <div className="card__properties">
        <h3 className="card__title">{title}</h3>
        {voteFixed ? <div className="card__rating">{voteFixed}</div> : null}
        <div className="card__release-date">{date}</div>
        <div className="card__genres">
          {genreIds ? (
            <Genres genreIds={genreIds} genreList={genreList} />
          ) : null}
        </div>
        <p className="card__overview">{text}</p>
        <Rate allowHalf count={10} />
      </div>
    </li>
  );
}

MovieCard.defaultProps = {
  vote: null,
  posterPath: '',
  releaseDate: '',
  genreIds: [],
  genreList: [],
};

MovieCard.propTypes = {
  title: PropTypes.string.isRequired,
  releaseDate: PropTypes.string,
  vote: PropTypes.number,
  overview: PropTypes.string.isRequired,
  posterPath: PropTypes.string,
  genreIds: PropTypes.instanceOf(Array),
  genreList: PropTypes.instanceOf(Array),
};

export default MovieCard;
