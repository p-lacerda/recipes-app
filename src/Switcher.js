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
      <Route path="/comidas" component={ Comidas } />
      <Route path="/bebidas" component={ Bebidas } />
      <Route path="/comidas/:id" component={ ComidasDetalhes } />
      <Route path="/bebidas/:id" component={ BebidasDetalhes } />
      <Route
        path="/comidas/:id/in-progress"
        component={ ComidasProgresso }
      />
      <Route
        path="/bebidas/:id/in-progress"
        component={ BebidasProgresso }
      />
      <Route path="/explorar" component={ Explorar } />
      <Route path="/explorar/comidas" component={ ExplorarComidas } />
      <Route path="/explorar/bebidas" component={ ExplorarBebidas } />
      <Route
        path="/explorar/comidas/ingredientes"
        component={ ExplorarIngredientesComidas }
      />
      <Route
        path="/explorar/bebidas/ingredientes"
        component={ ExplorarIngredientesBebidas }
      />
      <Route
        path="/explorar/comidas/area"
        component={ ExplorarComidasPorArea }
      />
      <Route path="/perfil" component={ Perfil } />
      <Route path="/receitas-feitas" component={ ReceitasFeitas } />
      <Route path="/receitas-favoritas" component={ ReceitasFavoritas } />
      <Route component={ NotFound } />
    </Switch>
  );
}

export default Switcher;
