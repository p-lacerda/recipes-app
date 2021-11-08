import React from 'react';
import PropTypes from 'prop-types';
// import { generatesFilters } from '../services/APIs';

function Filtros(props) {
  const { meals } = props;
  console.log(meals());

  //    generatesFilters(meals) {
  //     const arrFilt = [];
  //     meals.map((meal) => {
  //       if (!arrFilt.includes(`${meal.strCategory}`)) {
  //         arrFilt.push(meal.strCategory);
  //       }
  //       return arrFilt;
  //     });
  //   }

  return (
    <div>
      {/* {meals && meals.map(
        (category) => <button type="button" key={ category }>{category}</button>,
      )} */}
      oi
    </div>
  );
}

Filtros.propTypes = {
  meals: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Filtros;
