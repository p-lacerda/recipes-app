export const initValues = () => {
  const init = {
    cocktails: {

    },
    meals: {

    },
  };

  const initFavorites = [];

  if (!localStorage.favoriteRecipes) {
    localStorage.favoriteRecipes = JSON.stringify(initFavorites);
  }

  if (!localStorage.inProgressRecipes) {
    localStorage.inProgressRecipes = JSON.stringify(init);
  }
};

export const setCheckLocalStorage = (comp, id, ingredient) => {
  const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
  if (inProgressRecipes.cocktails[id] !== undefined) {
    if (comp === true) {
      const newProgressRecipe = inProgressRecipes.cocktails[id].filter((ingrediente) => (
        ingredient !== ingrediente
      ));
      inProgressRecipes.cocktails = {
        [id]: newProgressRecipe,
      };
      localStorage.inProgressRecipes = JSON.stringify(inProgressRecipes);
    } else {
      const idPush = inProgressRecipes.cocktails[id];
      idPush.push(ingredient);
      inProgressRecipes.cocktails = {
        ...inProgressRecipes.cocktails,
        [id]: idPush,
      };

      localStorage.inProgressRecipes = JSON.stringify(inProgressRecipes);
    }
  }
};

export const setCheckLocalStorageMeals = (comp, id, ingredient) => {
  const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
  if (inProgressRecipes.meals[id] !== undefined) {
    if (comp === true) {
      const newProgressRecipe = inProgressRecipes.meals[id].filter((ingrediente) => (
        ingredient !== ingrediente
      ));
      inProgressRecipes.meals = {
        [id]: newProgressRecipe,
      };
      localStorage.inProgressRecipes = JSON.stringify(inProgressRecipes);
    } else {
      const idPush = inProgressRecipes.meals[id];
      idPush.push(ingredient);
      inProgressRecipes.meals = {
        ...inProgressRecipes.meals,
        [id]: idPush,
      };

      localStorage.inProgressRecipes = JSON.stringify(inProgressRecipes);
    }
  }
};
export const verifyDisableButtonComidas = (setDisabled, id) => {
  const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
  if (inProgressRecipes.meals[id] && !inProgressRecipes.meals[id].length > 0) {
    setDisabled(false);
  } else {
    setDisabled(true);
  }
};

export const verifyDisableButtonBebidas = (setDisabled, id) => {
  const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
  if (inProgressRecipes.cocktails[id] && !inProgressRecipes.cocktails[id].length > 0) {
    setDisabled(false);
  } else {
    setDisabled(true);
  }
};
export const verifyFavorite = (id, setHeartIcon, blackHeartIcon) => {
  const favorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
  if (favorites !== undefined) {
    const filtraFavoID = favorites.filter((favorite) => favorite.id === String(id));
    if (filtraFavoID.length > 0) {
      setHeartIcon(blackHeartIcon);
    }
  }
};
