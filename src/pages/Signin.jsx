import React from 'react';

export default function Signin() {
  return (
    <div>
      <h1>Sign in</h1>
      <p><input type="text" /></p>
      <p><input type="text" /></p>
      <p>
        <button onClick={click}>Login</button>
      </p>
    </div>
  );

  function click() {
    console.log('Login');
  }
}

