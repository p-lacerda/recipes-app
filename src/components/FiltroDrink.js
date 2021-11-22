import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { drinksFiltThunk } from '../redux/actions';

function FiltrosDrink(props) {
  const {
    filts, setRecipe, allRecipe, drinksFiltInfo, drinksFilt } = props;
  const [category, setCategory] = useState('');

  useEffect(() => {
    if (Object.keys(drinksFilt).length !== 0) {
      setRecipe(drinksFilt.response);
    }
  }, [drinksFilt, setRecipe]);

  const handleClick = (filt) => {
    if (filt !== category) {
      drinksFiltInfo(filt);
      setCategory(filt);
    } else {
      setCategory('');
      setRecipe(allRecipe);
    }
  };

  return (
    <div className="filtros-drink">

      <button
        data-testid="All-category-filter"
        type="button"
        onClick={ () => {
          setRecipe(allRecipe);
          setCategory('');
        } }
      >
        All

      </button>
      { filts.map((filt) => (
        <button
          data-testid={ `${filt}-category-filter` }
          key={ filt }
          type="button"
          onClick={ () => handleClick(filt) }
        >
          {filt}
        </button>))}
    </div>
  );
}

FiltrosDrink.propTypes = {
  drinksFiltInfo: PropTypes.func.isRequired,
  filts: PropTypes.arrayOf(PropTypes.string).isRequired,
  setRecipe: PropTypes.func.isRequired,
  allRecipe: PropTypes.arrayOf(PropTypes.any).isRequired,
  drinksFilt: PropTypes.arrayOf(PropTypes.any).isRequired,
};

const mapStateToProps = (state) => ({
  drinksFilt: state.drinksReducer.drinksFilt,
});

const mapDispatchToProps = (dispatch) => ({
  drinksFiltInfo: (filt) => dispatch(drinksFiltThunk(filt)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FiltrosDrink);
