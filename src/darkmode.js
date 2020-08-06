import {
  DARK_MODE,
  LIGHT_MODE
} from './action'
import {
  darkMode,
  lightMode
} from './action'


const initialState = {
  mode: false
}

export default function darkModeReducer(action = initialState) {
  return {
    mode: action.mode
  }
}