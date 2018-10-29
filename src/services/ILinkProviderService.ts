export interface ILinkProviderService {

    getLink(searchQuery: string | null, category: SearchCategory, page: number, minPrize: number, maxPrize: number, time: TimeQuery, sortBy: SortStyle): URL;

}

export enum SearchCategory {
    Mieszkania,
    Domy, 
    Dzialki,
    Lokale
}

export enum TimeQuery {
    Hours_24,
    Days_3,
    Days_7,
    Days_14,
    Days_30
}

export enum SortStyle {
    Date_DESC,
    Date_ASC,
    Prize_DESC,
    Prize_ASC
}