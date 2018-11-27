export default class Auction {

    title : string;
    link : URL | null;
    image_src : string;
    date : string;
    prize : number;
    description : string;
    type: AuctionType
}

export enum AuctionType {
    Promo,
    Special,
    Normal
}