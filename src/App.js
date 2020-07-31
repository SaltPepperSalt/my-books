import React from 'react';
import ErrorBoundary from 'antd/lib/alert/ErrorBoundary';
import { BrowserRouter, Route, Switch } from 'react-router-dom';


//pages
import Home from './pages/Home'
import Signin from './pages/Signin'
import NotFound from './pages/NotFound'
import FatalError from './pages/FatalError'

import withAuth from './hocs/withAuth';
import withoutAuth from './hocs/withoutAuth';
import PersonContext from './contexts/PersonContext';

const persons = [
  { id: 0, name: 'Mark', age: 38 },
  { id: 1, name: 'Hanna', age: 27 },
];

export default function App() {
  return (
    <ErrorBoundary FallbackComponent={FatalError}>
      <PersonContext.Provider value={persons}>
        <BrowserRouter >
          <Switch>
            <Route path="/signin" component={withoutAuth(Signin)}></Route>
            <Route path="/" exact component={withAuth(Home)}></Route>
            <Route component={NotFound} />
          </Switch>
        </BrowserRouter>
      </PersonContext.Provider>
    </ErrorBoundary>
  )
}