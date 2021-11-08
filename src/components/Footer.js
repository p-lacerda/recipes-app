import React from 'react';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import './css/Footer.css';

const Footer = () => {
  return (
    <footer data-testid="footer">
      <img src={ drinkIcon } alt="Bebidas" data-testid="drinks-bottom-btn" />
      <img src={ mealIcon } alt="Comidas" data-testid="food-bottom-btn" />
      <img src={ exploreIcon } alt="Explorar" data-testid="explore-bottom-btn" />
    </footer>
  );
};

export default Footer;
