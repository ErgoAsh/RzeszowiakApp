import * as React from 'react';
import * as InfiniteScroll from 'react-infinite-scroller';
import { observer, inject } from 'mobx-react';
import AuctionListItem from './AuctionListItem';
import Auction from '../models/Auction';

import "../css/Auction.css";

@inject("auctionConfigStore", "auctionStore")
@observer
class AuctionList extends React.Component<any, any> {

  state = {
    id_counter: 0
  }

  render() {
    this.state.id_counter = 0;

    let items: JSX.Element[] = [];
    this.props.auctionStore.auctions.map((auction: Auction) => {
      items.push(
        <AuctionListItem key={this.state.id_counter++} value={auction}/>
      )
    });

    return (
      <div className="content col-md-9">
        <InfiniteScroll
          pageStart={0}
          initialLoad={true}
          loadMore={() => this.props.auctionStore.downloadMore()}
          hasMore={this.props.auctionStore.hasMore}
          loader={<div className="loader">Loading ...</div>}
          useWindow={false}>

          {items}
        </InfiniteScroll>
      </div>
    );
  }
}
  
export default AuctionList;