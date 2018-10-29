import * as React from 'react';

import { resolve } from "inversify-react";

import IDownloadService from '../services/IDownloadService';
import AuctionListItem from './AuctionListItem';

import "../css/Auction.css";

class AuctionList extends React.Component {

  @resolve("nameProvider")
  private readonly downloadService: IDownloadService;

  constructor(props: any) {
    super(props);

    this.downloadService.process(new URL("http://www.rzeszowiak.pl/Nieruchomosci-Sprzedam-3070011155?r=mieszkania"), (result) => {
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