import React from 'react';
import { Redirect } from 'react-router-dom';

export default function withAuth(Component) {
  const displayName = `withAuth(${Component.displayName})`

  const C = (props) => {
    const token = sessionStorage.getItem('token');

    if (token === null) {
      return <Redirect to="/signin" />
    }
    return (
      <Component {...props} token={token}></Component>
    );
  }
  C.displayName = displayName;
  return C;
}