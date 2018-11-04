import "reflect-metadata";
import { Singleton, AutoWired } from 'typescript-ioc';

@Singleton 
@AutoWired 
class LinkProviderService {

    getLink(searchQuery: string | null, category: SearchCategory, page: number, minPrize: number | null, maxPrize: number | null, time: TimeQuery, sortBy: SortStyle): URL {

        let base = "http://www.rzeszowiak.pl/Nieruchomosci-Sprzedam-307"; //Last 3 numbers are pages

        base += page.toLocaleString('en-US', {minimumIntegerDigits: 3, useGrouping: false}); //3 next numbers has to be in "001" format

        base += sortBy.valueOf() + 1; //Sorting style
        base += "10" //Amount of results per page
        base += time.valueOf() + 1; //Time constraint

        base += "?r=" + category.valueOf();
        if (minPrize != null && minPrize != 0) base += "&min=" + minPrize;
        if (maxPrize != null && minPrize != 0) base += "&max=" + maxPrize;

        console.log(base);
        return new URL(base);
    }

    getLinkByOptions(searchOptions: SearchOptions): URL {
        return this.getLink(searchOptions.searchQuery, 
            searchOptions.category, 
            searchOptions.page, 
            searchOptions.minPrize, 
            searchOptions.maxPrize, 
            searchOptions.time, 
            searchOptions.sortBy);
    }
}

export class SearchOptions {
    searchQuery: string | null;
    category: SearchCategory;
    page: number;
    minPrize: number | null;
    maxPrize: number | null; 
    time: TimeQuery;
    sortBy: SortStyle;
}

export enum SearchCategory {
    Mieszkania = "mieszkania",
    Domy = "domy", 
    Dzialki = "dzialki",
    Lokale = "lokale"
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

export default LinkProviderService;
