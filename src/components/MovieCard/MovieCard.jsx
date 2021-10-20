import React from 'react';

import PropTypes from 'prop-types';
import { format } from 'date-fns';
import { Empty } from 'antd';

import './MovieCard.scss';

const MovieCard = ({ title, releaseDate, overview, posterPath }) => {
  function truncate(str, num, useWordBoundary) {
    if (str.length <= num) {
      return str;
    }
    const subString = str.substr(0, num - 1);
    return `${useWordBoundary ? subString.substr(0, subString.lastIndexOf(' ')) : subString} ...`;
  }

  const date = releaseDate ? format(new Date(releaseDate), 'MMMM Q, y') : null;
  const posterUrl = `https://image.tmdb.org/t/p/w200/${posterPath}`;
  const posterImg = <img className="card__poster" src={posterUrl} alt="movies poster" />;
  const text = overview ? truncate(overview, 160, true) : null;
  const empty = <Empty description="Image Not Found" />;

  return (
    <li className="movie-card card">
      <div className="card__poster-wrapper">{posterPath ? posterImg : empty}</div>
      <div className="card__properties">
        <h3 className="card__title">{title}</h3>
        <div className="card__release-date">{date}</div>
        <div className="card__genres">
          <div className="card__genre">action</div>
          <div className="card__genre">drama</div>
        </div>
        <p className="card__overview">{text}</p>
      </div>
    </li>
  );
};

MovieCard.defaultProps = {
  posterPath: '',
};

MovieCard.propTypes = {
  title: PropTypes.string.isRequired,
  releaseDate: PropTypes.string.isRequired,
  overview: PropTypes.string.isRequired,
  posterPath: PropTypes.string,
};

export default MovieCard;
