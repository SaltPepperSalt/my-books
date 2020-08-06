import {
  createStore,
  applyMiddleware,
  combineReducers
} from 'redux';
import books from './books';
import auth from './auth'
import thunk from 'redux-thunk';
import {
  composeWithDevTools
} from 'redux-devtools-extension';

const reducer = combineReducers({
  books,
  auth,
})

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));
export default store;