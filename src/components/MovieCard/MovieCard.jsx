/* eslint-disable react/prop-types */
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import { Empty, Rate } from 'antd';
import MovieService from '../../api/MovieService';

import Genres from '../Genres/Genres';

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
  rating,
}) {
  const movieService = new MovieService();

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
  const movieRating = voteCount ? ratingСolor(voteFixed) : null;
  const empty = <Empty description="Image Not Found" />;

  function rateMovie(s) {
    if (s === 0) {
      movieService.deleteRatedMovie(id);
    } else {
      movieService.rateMovie(id, s);
    }
  }

  return (
    <li className="movie-card card">
      <div className="card__poster-wrapper">
        {posterPath ? posterImg : empty}
      </div>
      <div className="card__properties">
        <h3 className="card__title">{title}</h3>
        <div className="card__rating" style={movieRating}>
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
          defaultValue={rating}
          onChange={(v) => rateMovie(v)}
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
