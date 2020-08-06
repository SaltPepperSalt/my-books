import React, { useState } from 'react';
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
import DarkContext from './contexts/DarkContext';

const persons = [
  { id: 0, name: 'Mark', age: 38 },
  { id: 1, name: 'Hanna', age: 27 },
];

let darkMode = {
  mode: false,
}

export default function App() {
  const [state, setState] = useState(darkMode);
  darkMode = state;
  const NewHome = withAuth(Home);
  return (
    <>

      <ErrorBoundary FallbackComponent={FatalError}>

        <DarkContext.Provider value={darkMode}>

          <PersonContext.Provider value={persons}>

            <BrowserRouter >
              <Switch>
                <Route path="/signin" component={withoutAuth(Signin)}></Route>
                <Route path="/" exact
                  render={() => <NewHome change={setState} />}>
                </Route>
                <Route
                  component={NotFound}
                ></Route>
              </Switch>

            </BrowserRouter>
          </PersonContext.Provider>
        </DarkContext.Provider>

      </ErrorBoundary >
    </>
  )
}

const changeMode = () => {
  return
}