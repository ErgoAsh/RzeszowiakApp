import { observable, action } from "mobx";
import { SearchOptions, SearchCategory, TimeQuery, SortStyle } from "../services/LinkProviderService";

class AuctionConfigStore {

    @observable 
    public options: SearchOptions = {
        searchQuery: null, 
        category: SearchCategory.Domy, 
        page: 1, 
        minPrize: undefined, 
        maxPrize: undefined, 
        time: TimeQuery.Days_30, 
        sortBy: SortStyle.Date_ASC
    };

    @action
    setQuery(query: string) {
        this.options.searchQuery = query;
    }

    @action
    setCategory(category: SearchCategory) {
        this.options.category = category;
    }

    @action
    setMinimumPrize(minPrize: number | undefined) {
        this.options.minPrize = minPrize;
    }

    @action
    setMaximumPrize(maxPrize: number | undefined) {
        this.options.maxPrize = maxPrize;
    }

    @action
    setTime(time: TimeQuery) {
        this.options.time = time;
    }
    
    @action
    setOrder(sortBy: SortStyle) {
        this.options.sortBy = sortBy;
    }

    @action
    setPage(page: number) {
        this.options.page = page;
    }

    @action
    nextPage() {
        this.options.page++;
    }
}

export default AuctionConfigStore;