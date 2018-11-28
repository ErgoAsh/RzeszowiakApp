import DownloadAuctionsService from "../services/DownloadAuctionsService";
import LinkProviderService, { SearchOptions } from "../services/LinkProviderService";
import AuctionConfigStore from "./AuctionConfigStore";
import Auction from "../models/Auction";

import { observable, action, computed } from "mobx";

class AuctionStore {

    private downloadService: DownloadAuctionsService;
    private linkService: LinkProviderService;
    private configStore: AuctionConfigStore;

    @observable auctions: Auction[] = new Array<Auction>();
    @observable isLoading: boolean = false;
    @observable hasMore: boolean = true;

    constructor(downloadService: DownloadAuctionsService, linkService: LinkProviderService, configStore: AuctionConfigStore) {
        this.downloadService = downloadService;
        this.linkService = linkService;
        this.configStore = configStore;
    }

    @computed get config(): SearchOptions {
        return this.configStore.options;
    }

    @action
    downloadAuctions(reload: boolean) {
        this.isLoading = true;
        if (reload) {
            this.auctions = [];
        }
        this.downloadService.process(this.linkService.getLinkByOptions(this.config), (result, hasMore) => {
            if (this.config.page == 1) {
                this.auctions = result;
            } else {
                this.auctions = this.auctions.concat(result);
            }
            this.isLoading = false;
            this.hasMore = hasMore;
        });
    }

    @action
    downloadMore() { 
        this.downloadAuctions(false);
        this.configStore.nextPage();
    }
}

export default AuctionStore;