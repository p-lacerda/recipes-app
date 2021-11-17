import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ShareIcon from '../images/shareIcon.svg';

const RecipesDoneCard = (props) => {
  const { src, index, name, date, category, tags, area, type, alcoholic, id } = props;
  const [linkCopy, setLinkCopy] = useState('no');
  const url = type === 'comida' ? `http://localhost:3000/comidas/${id}`
    : `http://localhost:3000/bebidas/${id}`;
  const TIME_OUT = 5000;

  useEffect(() => {
    setInterval(() => {
      setLinkCopy('no');
    }, TIME_OUT);
  }, [linkCopy]);

  return (
    <div>
      <Link to={ `/${type}s/${id}` }>
        <img
          src={ src }
          alt={ name }
          width="250px"
          data-testid={ `${index}-horizontal-image` }
        />
        <p data-testid={ `${index}-horizontal-top-text` }>
          { (type === 'comida') ? `${area} - ${category}` : `${alcoholic} - ${category}` }
        </p>
        <p data-testid={ `${index}-horizontal-name` }>
          { name }
        </p>
        <p data-testid={ `${index}-horizontal-done-date` }>
          { date }
        </p>
        { tags && tags.map((tag, ind) => (
          ind < 2
        && (
          <p data-testid={ `${index}-${tag}-horizontal-tag` } key={ ind }>
            {' '}
            {tag}
            {' '}
          </p>
        )
        ))}
      </Link>
      <button
        type="button"
        data-testid={ `${index}-horizontal-share-btn` }
        src={ ShareIcon }
        onClick={ () => {
          window.navigator.clipboard.writeText(url);
          setLinkCopy('Link copiado!');
        } }
      >
        <img src={ ShareIcon } alt="compartilhar" />
      </button>
      {linkCopy === 'Link copiado!' && <p>{linkCopy}</p>}
    </div>
  );
};

RecipesDoneCard.propTypes = {
  src: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  category: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  area: PropTypes.string.isRequired,
  alcoholic: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,

};

export default RecipesDoneCard;
