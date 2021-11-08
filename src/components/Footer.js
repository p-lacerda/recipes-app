import React from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import './css/Footer.css';

const Footer = () => (
  <footer data-testid="footer">
    <Link to="/bebidas">
      <img src={ drinkIcon } alt="Bebidas" data-testid="drinks-bottom-btn" />
    </Link>
    <Link to="/comidas">
      <img src={ mealIcon } alt="Comidas" data-testid="food-bottom-btn" />
    </Link>
    <Link to="/explorar">
      <img src={ exploreIcon } alt="Explorar" data-testid="explore-bottom-btn" />
    </Link>
  </footer>
);

export default Footer;
