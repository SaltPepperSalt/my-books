import React, { useCallback } from 'react';
import Signin from '../pages/Signin';
import { useDispatch } from 'react-redux';
import { startLoginSagaActionCreator } from '../redux/modules/auth';

export default function SigninContainer() {
  const dispatch = useDispatch();
  const login = useCallback((email, password) => {
    dispatch(startLoginSagaActionCreator(email, password))
  }, [dispatch])
  return (<Signin login={login} />)
}