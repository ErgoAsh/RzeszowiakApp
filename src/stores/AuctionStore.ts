import DownloadAuctionsService from "../services/DownloadAuctionsService";
import LinkProviderService from "../services/LinkProviderService";
import AuctionConfigStore from "./AuctionConfigStore";
import Auction from "../models/Auction";

import { observable, action } from "mobx";

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

    @action
    downloadAuctions() {
        this.isLoading = true;
        this.downloadService.process(this.linkService.getLinkByOptions(this.configStore.options), (result, hasMore) => {
            if (this.configStore.options.page == 1) {
                this.auctions = result;
            } else {
                this.auctions = this.auctions.concat(result);
            }
            this.isLoading = false;
            this.hasMore = hasMore;
        });
    }

    @action
    downloadMore(page?: number) {
        if (page)
            this.configStore.options.page = page;
        else 
            this.configStore.options.page++;

        this.downloadAuctions();
    }
}

export default AuctionStore;