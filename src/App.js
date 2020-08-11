import React, { useState } from 'react';
import ErrorBoundary from 'antd/lib/alert/ErrorBoundary';
import { BrowserRouter, Route, Switch } from 'react-router-dom';



//pages
import Home from './pages/Home'
// import Signin from './pages/Signin'
import NotFound from './pages/NotFound'
import FatalError from './pages/FatalError'

import withAuth from './hocs/withAuth';


import SigninContainer from './containers/SigninContainer';
import BookAddContainer from './containers/BookAddContainer'
import { ConnectedRouter } from 'connected-react-router'
import { history } from './redux/create'



export default function App() {
  const NewHome = withAuth(Home);
  return (
    <>
      <ErrorBoundary FallbackComponent={FatalError}>

        <ConnectedRouter history={history} >
          <Switch>
            <Route path="/addbook" component={BookAddContainer}></Route>
            <Route path="/signin" component={SigninContainer}></Route>
            <Route path="/" exact
              render={() => <NewHome />}>
            </Route>
            <Route
              component={NotFound}
            ></Route>
          </Switch>

        </ConnectedRouter>



      </ErrorBoundary >
    </>
  )
}

