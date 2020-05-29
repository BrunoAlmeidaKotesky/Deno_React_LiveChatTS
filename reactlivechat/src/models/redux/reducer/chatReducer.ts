import { initialState } from './../store';
import { IStore } from '../../interfaces/IStore';
import { ChatReturns, ChatActions } from '../actions/actionTypes';

export const chatReducer = (state = initialState, action:ChatReturns):IStore => {
    switch (action.type) {
        case ChatActions.SET_GROUP:
            return{...state, userInfo: {name: state.userInfo.name, group: action.payload}};
        case ChatActions.SET_NAME:
            return{...state, userInfo: {name: action.payload, group: state.userInfo.group}}
        default: return state;
    }
}