import React, { useContext, useCallback } from 'react';

import { startLoading } from '../action';
import { useSelector, useDispatch } from 'react-redux';


export default function NotFound() {
  const loading = useSelector(state => state.loading);
  const dispatch = useDispatch();
  const click = useCallback(() => {
    dispatch(startLoading());
  }, [dispatch])

  return (
    <>
      <h1>Page Not Found</h1>
      <p>{JSON.stringify(loading)}</p>
      <p>
        <button onClick={click}>button</button>
      </p>
    </>
  );
}


