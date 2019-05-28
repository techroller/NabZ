import {
  createStore,
  combineReducers,
  applyMiddleware,
  compose
} from 'redux';
import {createEpicMiddleware} from 'redux-observable';
import {reducer as snackMachine} from './snack/reducer'
import sitesReducer from './sites/reducer';
import sites from './sites';

const rootReducer = combineReducers({
  sites: sitesReducer,
  snack: snackMachine
});

const epicMiddleware = createEpicMiddleware();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

function configureStore() {
  const store = createStore(rootReducer, composeEnhancers(applyMiddleware(epicMiddleware)));
  epicMiddleware.run(sites);
  return store;
}

export default configureStore();