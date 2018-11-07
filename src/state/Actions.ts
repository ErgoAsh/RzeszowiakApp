import { ActionTypes } from "./Store";
import Auction from "../models/Auction";

export interface AddAuction {
    type: ActionTypes.ADD_AUCTION,
    payload: {
        auction: Auction
    }
}

export interface ResetAuctions {
    type: ActionTypes.RESET_AUCTIONS,
    payload: {}
}

export function addAuction(title: string | null, link: URL | null, image: ImageBitmap | null, date: Date, prize: number, description: string): AddAuction {
    return {
        type: ActionTypes.ADD_AUCTION,
        payload: {
            auction: {
                title: title,
                link: link, 
                image: image, 
                date: date, 
                prize: prize, 
                description: description
            }
        }
    }

}

export type Action = AddAuction | ResetAuctions;