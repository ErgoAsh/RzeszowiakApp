import * as React from 'react';

import AuctionListItem from './AuctionListItem';
import DownloadAuctionsService from "../services/DownloadAuctionsService";

import "../css/Auction.css";

class AuctionList extends React.Component {
  constructor(props: any) {
    super(props);

    this.state.downloadService.process(new URL("http://www.rzeszowiak.pl/Nieruchomosci-Sprzedam-3070011155?r=mieszkania"), (result) => {
      this.state.arr = result;
      console.warn(result.length);
      this.forceUpdate();
    });
  }

  state = {
    downloadService: new DownloadAuctionsService(),
    arr: new Array<Auction>()
  }

  render() {
    return (
      <div className="content">
        <ul>
            {this.state.arr.map(auction => <AuctionListItem key={auction.toString()} value={auction}/>)}
        </ul>
      </div>
    );
  }
}
  
export default AuctionList;