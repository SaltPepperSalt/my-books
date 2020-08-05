import {
  createStore,
  applyMiddleware,
  combineReducers
} from 'redux';
import reducer from './reducer';
import auth from './auth'
import thunk from 'redux-thunk';
import {
  composeWithDevTools
} from 'redux-devtools-extension';

const Reducer = combineReducers(
  reducer,
  auth,
)

const store = createStore(Reducer, composeWithDevTools(applyMiddleware(thunk)));
export default store;