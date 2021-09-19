import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Default, Generator, Home, SpotifyCallback } from '~/pages';
import Menu from './com/Menu';
import './App.scss';

const App = ({ history }) => {
  return (
    <>
      <Menu history={history} />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/generator" component={Generator} />
        <Route path="/spotify-callback" component={SpotifyCallback} />
        <Route component={Default} />
      </Switch>
    </>
  );
};

export default App;
