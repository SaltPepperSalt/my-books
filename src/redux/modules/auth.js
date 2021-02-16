import UserService from '../../services/UserService';
import TokenService from '../../services/TokenService';
import {
  takeEvery
} from 'redux-saga/effects'
import {
  put,
  call,
  delay,
} from 'redux-saga/effects'
import {
  push
} from 'connected-react-router';


const prefix = 'my-books/auth'

const START = `${prefix}/START`
const SUCCESS = `${prefix}/SUCCESS`
const FAIL = `${prefix}/FAIL`

const loginStart = () => ({
  type: START
})


const loginSuccess = (token) => ({
  type: SUCCESS,
  token
})

const loginFail = (err) => ({
  type: FAIL,
  err
})




const initialState = {
  token: null,
  loading: false,
  err: null
}
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case START:
      return {
        token: null,
          loading: true,
          err: null
      }
      case SUCCESS:
        return {
          token: action.token,
            loading: false,
            err: null
        }

        case FAIL:
          return {
            token: null,
              loading: false,
              err: action.err
          }
          default:
            return state
  }
}


// saga
const START_LOGIN_SAGA = 'START_LOGIN_SAGA';
export const startLoginSagaActionCreator = (email, password) => ({
  type: START_LOGIN_SAGA,
  payload: {
    email,
    password,
  }
})

function* startLoginSaga(action) {
  //dispatch => put
  const {
    email,
    password
  } = action.payload
  try {
    yield put(loginStart());
    yield delay(1500);
    const token = yield call(UserService.login, email, password)

    TokenService.save(token)
    yield put(loginSuccess(token))
    yield put(push('/'))
  } catch (err) {
    yield put(loginFail(err));
  }
}
export function* authSaga() {
  yield takeEvery(START_LOGIN_SAGA, startLoginSaga);
}