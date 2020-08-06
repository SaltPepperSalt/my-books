import React, { useCallback } from 'react';
import Signin from '../pages/Signin';
import { useDispatch } from 'react-redux';
import { loginThunk } from '../action';

export default function SigninContainer({ history }) {
  const dispatch = useDispatch();
  const login = useCallback((email, password, history) => {
    dispatch(loginThunk(email, password, history))
  }, [dispatch])
  return (<Signin login={login} />)
}