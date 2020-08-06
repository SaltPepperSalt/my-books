// Wirte all Actions here
import BookService from './services/BookService';
import UserService from './services/UserService';
import TokenService from './services/TokenService';
// 액션의 타입을 정의하여 변수로 빼는 단계
export const START_LOADING = 'START_LOADING';
export const END_LOADING = 'END_LOADING';

// 액션 객체를 만들어 내는 함수 (Action Creator)을 만드는 단계
export function startLoading() {
  return {
    type: START_LOADING
  }
}

export function endLoading() {
  return {
    type: END_LOADING,
  }
}

//books
export const START_GET_BOOKS = 'START_GET_BOOKS';
export const SUCCESS_GET_BOOKS = 'SUCCESS_GET_BOOKS';
export const FAIL_GET_BOOKS = 'FAIL_GET_BOOKS';

export function startGetBooks() {
  return {
    type: START_GET_BOOKS,

  }
}
export function successGetBooks(books) {
  return {
    type: SUCCESS_GET_BOOKS,
    books,
  }
}
export function failGetBooks(err) {
  return {
    type: FAIL_GET_BOOKS,
    err,
  }
}

export function getBooksThunk(token) {
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

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, ms)
  })
}

//login
export const LOGIN_START = 'LOGIN_START'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAIL = 'LOGIN_FAIL'

const loginStart = () => ({
  type: LOGIN_START
})


const loginSuccess = (token) => ({
  type: LOGIN_SUCCESS,
  token
})

const loginFail = (err) => ({
  type: LOGIN_FAIL,
  err
})

export const loginThunk = (email, password, history) => {
  return async (dispatch) => {
    try {
      dispatch(loginStart())
      const token = await UserService.login(email, password);
      TokenService.save(token)
      dispatch(loginSuccess(token))
      history.push('/')
    } catch (err) {
      dispatch(loginFail(err));

    }
  }
}

//dark mode
export const DARK_MODE = 'DARK_MODE';
export const LIGHT_MODE = 'LIGHT_MODE';

export const darkMode = () => ({
  mode: true
})

export const lightMode = () => ({
  mode: false
})