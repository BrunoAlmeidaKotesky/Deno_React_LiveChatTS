import { chatReducer } from './reducer/chatReducer';
import {createStore, Store, applyMiddleware, compose, combineReducers} from 'redux';
import reduxImmutableStateInvariant from  'redux-immutable-state-invariant';
import thunkMiddleware from 'redux-thunk';
import { IStore } from '../interfaces/IStore';

declare global {
    interface Window {
      __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

export const initialState: IStore = {userInfo: {group: '', name: ''}};
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const rootReducer = combineReducers({chatReducer: chatReducer});
export type RootState = ReturnType<typeof rootReducer>;

function configureStore(){
    return createStore(rootReducer, undefined, composeEnhancers(applyMiddleware(reduxImmutableStateInvariant(), thunkMiddleware)));
}
const store = configureStore;
export {store};
