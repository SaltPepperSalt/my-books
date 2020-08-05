// Wirte all Actions here
import axios from 'axios';
import BookService from './services/BookService';
import UserService from './services/UserService';
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

export const loginStart = () => ({
  type: LOGIN_START
})


export const loginSuccess = (token) => ({
  type: LOGIN_SUCCESS,
  token
})

export const loginFail = (err) => ({
  type: LOGIN_FAIL,
  err
})

export const loginThunk = (email, password) => {
  return async (dispatch) => {
    try {
      const token = await UserService.login(email, password);
      sessionStorage.setItem('token', token);
      this.props.history.push('/');
    } catch (err) {
      const errCode = err.response.data.error;
      console.log(errCode)

    }
  }
}