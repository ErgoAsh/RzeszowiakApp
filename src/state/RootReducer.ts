import { initialState, State, ActionTypes } from "./Store";
import { Action } from './Actions';

export function reducer(state: State = initialState, action: Action) {
    switch (action.type) {
        case ActionTypes.ADD_AUCTION:
            return {
                ...state,
                auctions: [...state.auctions, action.payload.auction]
            }
        case ActionTypes.RESET_AUCTIONS:
            return {
                ...state,
                auctions: []
            }
        default:
            return state;
    }
}