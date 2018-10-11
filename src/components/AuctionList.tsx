import * as React from 'react';

import AuctionListItem from './AuctionListItem';
import DownloadAuctionsService from "../services/DownloadAuctionsService";

import "../css/Auction.css";

class AuctionList extends React.Component {

  state = {
    downloadService: new DownloadAuctionsService()
  }

  render() {
    return (
      <div className="content">
        <ul>
            {this.state.downloadService.process(new URL("http://www.rzeszowiak.pl/Nieruchomosci-Sprzedam-3070011155?r=mieszkania"))
              .map(auction => <AuctionListItem value={auction}/>)}
        </ul>
      </div>
    );
  }
}
  
export default AuctionList;