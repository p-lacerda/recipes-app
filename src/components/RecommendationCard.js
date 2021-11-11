import React from 'react';
import PropTypes from 'prop-types';

const RecommendationCard = ({ img, title, index }) => (
  <div>
    <img src={ img } alt={ title } />
    <h3 data-testid={ `${index}-recomendation-card` }>
      { title }
    </h3>
  </div>
);

RecommendationCard.propTypes = {
  img: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

export default RecommendationCard;
