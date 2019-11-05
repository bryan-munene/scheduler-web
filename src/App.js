import React from 'react';
import { Switch, Route } from 'react-router-dom';
import MainContainer from './components/container';
import Home from './components/home';

const App = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/auth" component={MainContainer} />
  </Switch>
);

export default App;
