import * as React from 'react';

import LinkProviderService, { SearchCategory, TimeQuery, SortStyle, SearchOptions } from '../services/LinkProviderService';
import DownloadAuctionsService from '../services/DownloadAuctionsService';
import ConfigEventDisptcherService from '../services/ConfigEventDispatcherService';
import AuctionListItem from './AuctionListItem';
import Auction from '../models/Auction';
import { Inject } from 'typescript-ioc';
import { observer } from 'mobx-react';

import "../css/Auction.css";

@observer
class AuctionList extends React.Component {

  @Inject
  private readonly downloadService: DownloadAuctionsService;

  @Inject
  private readonly linkService: LinkProviderService;

  @Inject
  private readonly configService: ConfigEventDisptcherService

  constructor(props: any) {
    super(props);

    this.setupNewSearchOptions({
      searchQuery: null, 
      category: SearchCategory.Mieszkania, 
      page: 1, 
      minPrize: null, 
      maxPrize: null, 
      time: 
      TimeQuery.Days_30, 
      sortBy: SortStyle.Prize_DESC
    }, true);

    this.configService.subscribe((auctions: Auction[], refresh: boolean) => {
      if (refresh)
        this.setState({arr: auctions});
      else 
        this.setState({arr: this.state.arr.concat(auctions), counter: 0});
    });
  }

  setupNewSearchOptions(searchOptions: SearchOptions, refresh: boolean): void {
    this.downloadService.process(this.linkService.getLinkByOptions(searchOptions), (result) => {
      if (refresh)
        this.setState({arr: result});
      else 
        this.setState({arr: this.state.arr.concat(result), counter: 0});
    });
  }

  state = {
    arr: new Array<Auction>(),
    counter: 0
  }
  //https://www.npmjs.com/package/react-infinite-scroller
  //TODO remove "n." item prefix in order to make infinite scroller read key from counter
  render() {
    return (
      <div className="content col-md-9">
        <ul>
            {this.state.arr.map(auction => <AuctionListItem key={this.state.counter++} value={auction}/>)}
        </ul>
      </div>
    );
  }
}
  
export default AuctionList;