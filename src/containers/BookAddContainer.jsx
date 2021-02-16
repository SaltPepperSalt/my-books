import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { addBooksSagaActionCreator } from '../redux/modules/books'
import AddBooks from '../pages/AddBooks';

export default function SigninContainer() {
  const dispatch = useDispatch();
  const addBook = useCallback((payload) => {
    dispatch(addBooksSagaActionCreator(payload))
  }, [dispatch])
  return (<AddBooks addBook={addBook} />)
}