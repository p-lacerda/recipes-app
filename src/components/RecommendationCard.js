import React from 'react';
import PropTypes from 'prop-types';
import './css/RecommendationCard.css';

const RecommendationCard = ({ img, title }, index) => (
  <div className="recommendation_carousel" data-testid={ `${index}-recomendation-card` }>
    <img src={ img } alt={ title } />
    <p data-testid={ `${index}-recomendation-title` }>
      { title }
    </p>
  </div>
);

RecommendationCard.propTypes = {
  img: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  // index: PropTypes.number.isRequired,
};

export default RecommendationCard;
