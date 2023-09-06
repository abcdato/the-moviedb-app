import PropTypes from 'prop-types';
import { Tag } from 'antd';

function Genres({ genreIds, genreList }) {
  return genreIds.map((id) =>
    genreList.map((genre) => {
      if (genre.id === id) {
        return <Tag key={id}>{genre.name}</Tag>;
      }
      return '';
    }),
  );
}

Genres.defaultProps = {
  genreIds: [],
};

Genres.propTypes = {
  genreIds: PropTypes.instanceOf(Array),
};

export default Genres;
