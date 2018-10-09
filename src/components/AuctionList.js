import AuctionListItem from './AuctionListItem.js';
import React, { Component } from 'react';

const AuctionsMock = [{name: "", },'2','3','4','5'];

class AuctionList extends Component {
    render() {
      return (
        <ul>
             {AuctionsMock.map(auction => <AuctionListItem key={auction.toString()} value={auction}>Tak</AuctionListItem>)}
        </ul>
      );
    }
  }
  
  export default AuctionList;