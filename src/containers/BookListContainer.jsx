import React from 'react';
import BookList from '../components/BookList'
import { useSelector, useDispatch } from 'react-redux';
import { getBooksSagaActionCreator } from '../redux/modules/books';


export default function BookListContainer({ token }) {
  const books = useSelector(state => state.books.books);
  const loading = useSelector(state => state.books.loading);
  const error = useSelector(state => state.books.error);
  const dispatch = useDispatch();
  const getBooks = React.useCallback(() => {
    dispatch(getBooksSagaActionCreator());
  }, [dispatch])

  return (
    <BookList books={books} loading={loading} error={error} getBooks={getBooks} />
  )

}