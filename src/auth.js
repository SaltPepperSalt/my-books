import {
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_FAIL
} from "./action";

const initialState = {
  token: null,
  loading: false,
  err: null
}
export default function auth(state = initialState, action) {
  switch (action.type) {
    case LOGIN_START:
      return {
        token: null,
          loading: true,
          err: null
      }
      case LOGIN_SUCCESS:
        return {
          token: action.token,
            loading: false,
            err: null
        }

        case LOGIN_FAIL:
          return {
            token: null,
              loading: false,
              err: action.err
          }
          default:
            return state
  }
}