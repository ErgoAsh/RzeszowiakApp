import { ILinkProviderService, TimeQuery, SortStyle, SearchCategory } from "./ILinkProviderService";

export class LinkProviderService implements ILinkProviderService {

    getLink(searchQuery: string | null, category: SearchCategory, page: number, minPrize: number | null, maxPrize: number | null, time: TimeQuery, sortBy: SortStyle): URL {

        let base = "http://http://www.rzeszowiak.pl/Nieruchomosci-Sprzedam-307001"; //Last 3 numbers are pages

        //TODO convert page to 001 format

        base += sortBy.valueOf() + 1; //Sorting style
        base += "10" //Amount of results per page
        base += time.valueOf() + 1; //Time constraint

        base += "?r=" + category.toString().toLowerCase();
        if (minPrize != null) base += "&min=" + minPrize;
        if (maxPrize != null) base += "&max=" + maxPrize;

        return new URL(base);
    }

}