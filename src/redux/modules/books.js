// 보내온 액션과 현재 상태를 이용해서 새로운 상태를 만드는 함수
import BookService from '../../services/BookService';
import {
  put,
  call,
  takeEvery,
  select,
  delay,
  takeLatest,
  takeLeading
} from 'redux-saga/effects';

//상태는 항상 고정적으로 만들어 둔다.

const prefix = 'my-books/books'

//GET_BOOKS


const GET_START = `${prefix}/GET_START`;
const GET_SUCCESS = `${prefix}/GET_SUCCESS`;
const GET_FAIL = `${prefix}/GET_FAIL`;

const startGetBooks = () => {
  return {
    type: GET_START,

  }
}

const successGetBooks = (books) => {
  return {
    type: GET_SUCCESS,
    books,
  }
}

const failGetBooks = (err) => {
  return {
    type: GET_FAIL,
    err,
  }
}

export const getBooksThunk = (token) => {
  return async (dispatch) => {
    sleep(2000);
    try {
      dispatch(startGetBooks());
      const books = await BookService.getBooks(token);
      dispatch(successGetBooks(books));
    } catch (err) {
      dispatch(failGetBooks(err));
    }
  }

}

function* getBooksSaga() {
  const token = yield select(state => state.auth.token);
  yield put(startGetBooks());
  try {
    yield delay(1500);
    const books = yield call(BookService.getBooks, token);
    yield put(successGetBooks(books));
  } catch (err) {
    yield put(err);
  }
}

const GET_BOOKS_SAGA = 'GET_BOOKS_SAGA';
export const getBooksSagaActionCreator = token => ({
  type: GET_BOOKS_SAGA,
  payload: {
    token
  }
})
const sleep = (ms) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, ms)
  })
}

const initialState = {
  loading: false,
  books: [],
  error: null,
};




//delete

const DELETE_START = `${prefix}/DELETE_START`;
const DELETE_SUCCESS = `${prefix}/DELETE_SUCCESS`;
const DELETE_FAIL = `${prefix}/DELETE_FAIL`;

const startDeleteBooks = () => {
  return {
    type: DELETE_START,

  }
}

const successDeleteBooks = (books) => {
  return {
    type: DELETE_SUCCESS,
    books,
  }
}

const failDeleteBooks = (err) => {
  return {
    type: DELETE_FAIL,
    err,
  }
}


function* deleteBooksSaga(action) {
  const {
    bookId
  } = action.payload;
  const token = yield select(state => state.auth.token);
  yield put(startDeleteBooks());
  try {
    yield delay(1500);
    yield call(BookService.deleteBook, token, bookId);
    const books = yield call(BookService.getBooks, token);
    yield put(successDeleteBooks(books));
  } catch (err) {
    yield put(err);
  }
}

const DELETE_BOOKS_SAGA = 'DELETE_BOOKS_SAGA';
export const deleteBooksSagaActionCreator = bookId => ({
  type: DELETE_BOOKS_SAGA,
  payload: {
    bookId
  }
})

//add

const ADD_START = `${prefix}/ADD_START`;
const ADD_SUCCESS = `${prefix}/ADD_SUCCESS`;
const ADD_FAIL = `${prefix}/ADD_FAIL`;

const startAddBooks = (book) => {
  return {
    type: ADD_START,
    book
  }
}

const successAddBooks = (books) => {
  return {
    type: ADD_SUCCESS,
    books,
  }
}

const failAddBooks = (err) => {
  return {
    type: ADD_FAIL,
    err,
  }
}

function* addBooksSaga(action) {
  const {
    book
  } = action.payload;
  const token = yield select(state => state.auth.token);
  yield put(startAddBooks());
  try {
    yield delay(1500);
    yield call(BookService.addBook, token, book);
    const books = yield call(BookService.getBooks, token);
    yield put(successAddBooks(books));
  } catch (err) {
    yield put(err);
  }
}

const ADD_BOOKS_SAGA = 'ADD_BOOKS_SAGA';
export const addBooksSagaActionCreator = (book) => ({
  type: ADD_BOOKS_SAGA,
  payload: {
    book
  }
})



export function* booksSaga() {
  yield takeLatest(GET_BOOKS_SAGA, getBooksSaga);
  yield takeLeading(DELETE_BOOKS_SAGA, deleteBooksSaga);
  yield takeEvery(ADD_BOOKS_SAGA, addBooksSaga);
}


export default function reducer(prevState = initialState, action) {
  switch (action.type) {
    case GET_START:
      return {
        ...prevState,
        loading: true,
          error: null,
      }
      case GET_SUCCESS:
        return {
          loading: false,
            books: action.books,
            error: null,
        }
        case GET_FAIL:
          return {
            ...prevState,
            loading: true,
              error: action.err,
          }
          case DELETE_START:
            return {
              ...prevState,
              loading: true,
                error: null,
            }
            case DELETE_SUCCESS:
              return {
                ...prevState,
                loading: false,
                  books: action.books,
                  error: null,
              }
              case DELETE_FAIL:
                return {
                  ...prevState,
                  loading: false,
                    error: null,
                }
                case ADD_START:
                  return {
                    ...prevState,
                    loading: true,
                      error: null,
                  }
                  case ADD_SUCCESS:
                    return {
                      loading: false,
                        books: action.books,
                        error: null,
                    }
                    case ADD_FAIL:
                      return {
                        ...prevState,
                        loading: true,
                          error: action.err,
                      }
                      default:
                        return prevState
  }
}