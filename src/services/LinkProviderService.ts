import { ILinkProviderService, TimeQuery, SortStyle, SearchCategory } from "./ILinkProviderService";

export class LinkProviderService implements ILinkProviderService {

    getLink(searchQuery: string | null, category: SearchCategory, page: number, minPrize: number, maxPrize: number, time: TimeQuery, sortBy: SortStyle): URL {

        let base = "http://http://www.rzeszowiak.pl/Nieruchomosci-Sprzedam-307001"; //Last 3 numbers are pages

        //TODO convert page to 001 format

        base += sortBy.valueOf() + 1; //Sorting style
        base += "10" //Amount of results per page


        //Sortowanie
        //Ilość na stronę - 2
        //Data wyszukiwania - 1

        //?r= Kategoria
        //&min=
        //&max=

        return new URL(base);
    }

}