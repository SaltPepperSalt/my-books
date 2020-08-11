import React from 'react';
import { Redirect } from 'react-router-dom';

export default function withoutAuth(Component) {
  const displayName = `withoutAuth(${Component.displayName})`

  const C = (props) => {
    const token = sessionStorage.getItem('token');

    if (token !== null) {
      return <Redirect to="/" />
    }
    return (
      <Component {...props}></Component>
    );
  };
  C.displayName = displayName;
  return C;
}