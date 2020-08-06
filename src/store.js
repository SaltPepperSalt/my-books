import {
  createStore,
  applyMiddleware,
  combineReducers
} from 'redux';
import books from './books';
import auth from './auth'
import darkmode from './darkmode'
import thunk from 'redux-thunk';
import {
  composeWithDevTools
} from 'redux-devtools-extension';

const reducer = combineReducers({
  books,
  auth,
  darkmode,
})

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));
export default store;