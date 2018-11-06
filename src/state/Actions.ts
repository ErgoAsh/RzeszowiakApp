import { ActionTypes } from "./Store";
import Auction from "../models/Auction";

export interface AddAuction {
    type: ActionTypes.ADD_AUCTION,
    payload: {
        auction: Auction
    }
}

