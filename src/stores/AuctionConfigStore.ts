import { observable, action } from "mobx";
import { SearchOptions, SearchCategory, TimeQuery, SortStyle } from "../services/LinkProviderService";

class AuctionConfigStore {

    @observable 
    public options: SearchOptions = {
        searchQuery: null, 
        category: SearchCategory.Domy, 
        page: 1, 
        minPrize: null, 
        maxPrize: null, 
        time: TimeQuery.Days_30, 
        sortBy: SortStyle.Prize_DESC
    };

    @action
    set(options: SearchOptions) {
        this.options = options;
    }

    @action
    update(functor: (old: SearchOptions) => SearchOptions) {
        console.log(JSON.stringify(this.options));
        this.options = functor(this.options);
        console.log(JSON.stringify(this.options));
    }
}

export default AuctionConfigStore;