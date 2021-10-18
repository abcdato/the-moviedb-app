import React from 'react';

import './MovieCard.scss';
import poster from './poster.png';

const MovieCard = () => (
  <div className="movie-card card">
    <img className="card__poster" src={poster} alt="movies poster" />
    <div className="card__properties">
      <h3 className="card__title">The way back</h3>
      <div className="card__release-date">March 10, 2021</div>
      <div className="card__genres">
        <div className="card__genre">action</div>
        <div className="card__genre">drama</div>
      </div>
      <p className="card__overview">
        A former basketball all-star, who has lost his wife and family foundation in a struggle with addiction attempts
        to regain his soul and salvation by becoming the coach of a disparate ethnically mixed high ...
      </p>
    </div>
  </div>
);

export default MovieCard;
