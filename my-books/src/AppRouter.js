import React from 'react';
import {Route} from 'react-router-dom';
import Header from './Header';
import Tabs from './Tabs';

const AppRouter = ({children, ...rest}) =>
  <Route
    {...rest}
    render={props =>
      <div className="app-router">
        <div className="navbar">
          <Header />
          <Tabs />
        </div>
        {children}
      </div>}
  />;

export default AppRouter;
