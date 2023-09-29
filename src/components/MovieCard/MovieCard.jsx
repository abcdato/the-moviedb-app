/* eslint-disable react/prop-types */
import { useContext } from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import { Empty, Rate } from 'antd';

import Genres from '../Genres/Genres';
// eslint-disable-next-line import/no-cycle
import { DataContext } from '../Context/DataContext';

import './MovieCard.scss';

function MovieCard({
  id,
  title,
  releaseDate,
  overview,
  posterPath,
  genreIds,
  genreList,
  vote,
  voteCount,
  star,
  disabled,
}) {
  const { setRatedMovies } = useContext(DataContext);

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

  const ratingСolor = (num) => {
    let color;

    switch (true) {
      case num <= 3:
        color = '#E90000';
        break;
      case num <= 5:
        color = '#E97E00';
        break;
      case num <= 7:
        color = '#E9D100';
        break;
      case num > 7:
        color = '#66E900';
        break;
      default:
        break;
    }

    return {
      borderColor: color,
    };
  };

  const text = overview ? truncate(overview, 140, true) : null;
  const voteFixed = vote ? vote.toFixed(1) : null;
  const rating = voteCount ? ratingСolor(voteFixed) : null;
  const empty = <Empty description="Image Not Found" />;

  function rateMovie(i, v) {
    const movie = {
      id: i,
      star: v,
      title,
      releaseDate,
      overview,
      genreIds,
      posterPath,
      vote,
      voteCount,
      disabledRate: true,
    };
    console.log(v);
    setRatedMovies((prevData) => [...prevData, movie]);
  }

  return (
    <li className="movie-card card">
      <div className="card__poster-wrapper">
        {posterPath ? posterImg : empty}
      </div>
      <div className="card__properties">
        <h3 className="card__title">{title}</h3>
        <div className="card__rating" style={rating}>
          {voteFixed}
        </div>
        <div className="card__release-date">{date}</div>
        <div className="card__genres">
          {genreIds ? (
            <Genres genreIds={genreIds} genreList={genreList} />
          ) : null}
        </div>
        <p className="card__overview">{text}</p>
        <Rate
          allowHalf
          count={10}
          defaultValue={star}
          disabled={disabled}
          onChange={(v) => rateMovie(id, v)}
        />
      </div>
    </li>
  );
}

MovieCard.defaultProps = {
  vote: null,
  voteCount: null,
  posterPath: '',
  releaseDate: '',
  genreIds: [],
  genreList: [],
};

MovieCard.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  releaseDate: PropTypes.string,
  vote: PropTypes.number,
  voteCount: PropTypes.number,
  overview: PropTypes.string.isRequired,
  posterPath: PropTypes.string,
  genreIds: PropTypes.instanceOf(Array),
  genreList: PropTypes.instanceOf(Array),
};

export default MovieCard;
