import React from 'react';
import { Route, Switch } from 'react-router';
import Login from './pages/Login';
import Comidas from './pages/Comidas';
import Bebidas from './pages/Bebidas';
import ComidasDetalhes from './pages/ComidasDetalhes';
import BebidasDetalhes from './pages/BebidasDetalhes';
import ReceitasFavoritas from './pages/ReceitasFavoritas';
import ReceitasFeitas from './pages/ReceitasFeitas';
import ComidasProgresso from './pages/ComidasProgresso';
import BebidasProgresso from './pages/BebidasProgresso';
import Explorar from './pages/Explorar';
import ExplorarComidas from './pages/ExplorarComidas';
import ExplorarBebidas from './pages/ExplorarBebidas';
import ExplorarIngredientesBebidas from './pages/ExplorarIngredientesBebidas';
import ExplorarIngredientesComidas from './pages/ExplorarIngredientesComidas';
import ExplorarComidasPorArea from './pages/ExplorarComidasPorArea';
import NotFound from './pages/NotFound';
import Perfil from './pages/Perfil';

function Switcher() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/comidas" component={ Comidas } />
      <Route exact path="/bebidas" component={ Bebidas } />
      <Route exact path="/comidas/:id" component={ ComidasDetalhes } />
      <Route exact path="/bebidas/:id" component={ BebidasDetalhes } />
      <Route
        exact
        path="/comidas/:id/in-progress"
        component={ ComidasProgresso }
      />
      <Route
        exact
        path="/bebidas/:id/in-progress"
        component={ BebidasProgresso }
      />
      <Route exact path="/explorar" component={ Explorar } />
      <Route exact path="/explorar/comidas" component={ ExplorarComidas } />
      <Route exact path="/explorar/bebidas" component={ ExplorarBebidas } />
      <Route
        exact
        path="/explorar/comidas/ingredientes"
        component={ ExplorarIngredientesComidas }
      />
      <Route
        exact
        path="/explorar/bebidas/ingredientes"
        component={ ExplorarIngredientesBebidas }
      />
      <Route
        exact
        path="/explorar/comidas/area"
        component={ ExplorarComidasPorArea }
      />
      <Route exact path="/perfil" component={ Perfil } />
      <Route exact path="/receitas-feitas" component={ ReceitasFeitas } />
      <Route exact path="/receitas-favoritas" component={ ReceitasFavoritas } />
      <Route component={ NotFound } />
    </Switch>
  );
}

export default Switcher;
