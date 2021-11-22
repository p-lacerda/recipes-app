import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { mealsFiltThunk } from '../redux/actions';

function FiltrosMeal(props) {
  const {
    filts, setRecipe, allRecipe, mealsFiltInfo, mealsFilt } = props;
  const [category, setCategory] = useState('');

  useEffect(() => {
    if (Object.keys(mealsFilt).length !== 0) {
      setRecipe(mealsFilt.response);
    }
  }, [mealsFilt, setRecipe]);

  const handleClick = (filt) => {
    if (filt !== category) {
      mealsFiltInfo(filt);
      setCategory(filt);
    } else {
      setCategory('');
      setRecipe(allRecipe);
    }
  };

  return (
    <div>
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

FiltrosMeal.propTypes = {
  mealsFiltInfo: PropTypes.func.isRequired,
  filts: PropTypes.arrayOf(PropTypes.string).isRequired,
  setRecipe: PropTypes.func.isRequired,
  allRecipe: PropTypes.arrayOf(PropTypes.any).isRequired,
  mealsFilt: PropTypes.arrayOf(PropTypes.any).isRequired,
};

const mapStateToProps = (state) => ({
  mealsFilt: state.mealsReducer.mealsFilt,
});

const mapDispatchToProps = (dispatch) => ({
  mealsFiltInfo: (filt) => dispatch(mealsFiltThunk(filt)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FiltrosMeal);
