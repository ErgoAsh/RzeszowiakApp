import { injectable } from "inversify";
import "reflect-metadata";

@injectable()
class LinkProviderService {

    getLink(searchQuery: string | null, category: SearchCategory, page: number, minPrize: number | null, maxPrize: number | null, time: TimeQuery, sortBy: SortStyle): URL {

        let base = "http://http://www.rzeszowiak.pl/Nieruchomosci-Sprzedam-307"; //Last 3 numbers are pages

        base += page.toLocaleString('en-US', {minimumIntegerDigits: 3, useGrouping: false}); //3 next numbers has to be in "001" format

        base += sortBy.valueOf() + 1; //Sorting style
        base += "10" //Amount of results per page
        base += time.valueOf() + 1; //Time constraint

        base += "?r=" + category.toString().toLowerCase();
        if (minPrize != null) base += "&min=" + minPrize;
        if (maxPrize != null) base += "&max=" + maxPrize;

        console.log(base);
        return new URL(base);
    }

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

export default LinkProviderService;
