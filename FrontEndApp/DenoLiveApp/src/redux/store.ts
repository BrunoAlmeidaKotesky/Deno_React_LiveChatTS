import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import reduxImmutableStateInvariant from  'redux-immutable-state-invariant';
import thunkMiddleware from 'redux-thunk';
import chatReducer from './reducers/chatReducer';

declare global {
    interface Window {
      __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
  }
export const initialState = {user: []};
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const rootReducer = combineReducers({
    chatReducer
});

export type RootState = ReturnType<typeof rootReducer>;

function configureStore(){
    return createStore(rootReducer, undefined, composeEnhancers(applyMiddleware(reduxImmutableStateInvariant(), thunkMiddleware)));
}
let store = configureStore;
export default store;