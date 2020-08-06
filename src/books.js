// 보내온 액션과 현재 상태를 이용해서 새로운 상태를 만드는 함수

//상태는 항상 고정적으로 만들어 둔다.

import {
  START_GET_BOOKS,
  SUCCESS_GET_BOOKS,
  FAIL_GET_BOOKS
} from './action';

const initialState = {
  loading: false,
  books: [],
  error: null,
};

export default function books(prevState = initialState, action) {
  switch (action.type) {
    case START_GET_BOOKS:
      return {
        loading: true,
          books: [],
          error: null,
      }
      case SUCCESS_GET_BOOKS:
        return {
          loading: true,
            books: action.books,
            error: null,
        }
        case FAIL_GET_BOOKS:
          return {
            loading: true,
              books: [],
              error: action.err,
          }
          default:
            return prevState
  }
}