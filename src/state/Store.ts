import { createStore } from "redux";
import RootReducer from "./RootReducer";
import Auction from "../models/Auction";

export interface State {
    auctions: Auction[]
}

export enum ActionTypes {
    ADD_AUCTION = "ADD_AUCTION",
    RESET_AUCTIONS = "RESET_AUCTIONS",

}

const store = createStore(RootReducer);

export default store;