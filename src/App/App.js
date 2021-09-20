import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Default, Generator, Home, SpotifyCallback } from '~/pages';
import Menu from './com/Menu';
import './App.scss';

const PageObj = { Default, Generator, Home, SpotifyCallback }

const capitalize = s => s && s[0].toUpperCase() + s.slice(1)

const App = ({ history }) => {
  console.log(process.env.RENDER_PATH);
  const renderPath = process.env.RENDER_PATH;
  const renderComponent = renderPath.split('-').map(capitalize).join('')
  return (
    <>
      <Menu history={history} />
      {process.env.NODE_ENV === 'development' ? (
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/generator" component={Generator} />
          <Route path="/spotify-callback" component={SpotifyCallback} />
          <Route component={Default} />
        </Switch>
      ) : (
        <Route exact path={`/${renderPath}`} component={PageObj[renderComponent]} />
      )}
    </>
  );
};

export default App;
