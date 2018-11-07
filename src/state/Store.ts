//import { createStore, combineReducers } from "redux";
//import { reducer } from "./RootReducer";
import Auction from "../models/Auction";

export interface State {
    auctions: Auction[]
}

export const initialState: State = {
    auctions: []
}

export enum ActionTypes {
    ADD_AUCTION = "ADD_AUCTION",
    RESET_AUCTIONS = "RESET_AUCTIONS"
}
/*
export const reduce = combineReducers<State>({
    
});

const store = createStore(reduce, initialState);
export default store;
*/