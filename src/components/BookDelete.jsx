import React from 'react';
import { CloseCircleOutlined } from '@ant-design/icons'
import { useDispatch } from 'react-redux';
import { deleteBooksSagaActionCreator } from '../redux/modules/books';

export default function BookDelete(props) {
  const dispatch = useDispatch();
  return (
    <CloseCircleOutlined onClick={click} />
  )

  function click() {
    dispatch(deleteBooksSagaActionCreator(props.bookId))
  }
}