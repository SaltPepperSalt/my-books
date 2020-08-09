import React from 'react';
import withAuth from '../hocs/withAuth'

import BookListContainer from '../containers/BookListContainer';

function Home(props) {


  return (
    <BookListContainer token={props.token} />
  );
}

export default withAuth(Home);






