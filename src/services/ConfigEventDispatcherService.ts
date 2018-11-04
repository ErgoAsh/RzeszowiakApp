import { Singleton, AutoWired, Inject } from 'typescript-ioc';
import LinkProviderService, { SearchOptions } from './LinkProviderService';
import DownloadAuctionsService from './DownloadAuctionsService';
import Auction from '../models/Auction';

@Singleton 
@AutoWired 
export default class ConfigEventDisptcherService {

    @Inject private readonly linkService: LinkProviderService;
    @Inject private readonly downloadService: DownloadAuctionsService;

    private callback: Function;

    subscribe(callback: (auctions: Auction[], refresh: boolean) => void) {
        this.callback = callback;
    }

    dispatch(options: SearchOptions) {
        this.downloadService.process(this.linkService.getLinkByOptions(options), (result) => {
            if (options.page == 1) 
                this.callback(result, true);
            else 
                this.callback(result, false);
        });
    }
}