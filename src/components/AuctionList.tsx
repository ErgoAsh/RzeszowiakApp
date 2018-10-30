import * as React from 'react';

import { resolve } from "inversify-react";

import LinkProviderService, { SearchCategory, TimeQuery, SortStyle } from '../services/LinkProviderService';
import DownloadAuctionsService from '../services/DownloadAuctionsService';
import AuctionListItem from './AuctionListItem';
import Auction from '../models/Auction';

import "../css/Auction.css";

class AuctionList extends React.Component {

  @resolve("downloadService")
  private readonly downloadService: DownloadAuctionsService;

  @resolve("linkService")
  private readonly linkService: LinkProviderService;

  constructor(props: any) {
    super(props);

    this.downloadService.process(this.linkService.getLink(null, SearchCategory.Domy, 1, null, null, TimeQuery.Days_30, SortStyle.Prize_DESC), (result) => {
      this.state.arr = result;
      console.warn(result.length);
      this.forceUpdate();
    });
  }

  state = {
    arr: new Array<Auction>()
  }
  //https://www.npmjs.com/package/react-infinite-scroller
  render() {
    return (
      <div className="content col-md-9">
        <ul>
            {this.state.arr.map(auction => <AuctionListItem key={auction.toString()} value={auction}/>)}
        </ul>
      </div>
    );
  }
}
  
export default AuctionList;