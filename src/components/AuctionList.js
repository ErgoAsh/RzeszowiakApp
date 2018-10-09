import AuctionListItem from './AuctionListItem.js';
import React, { Component } from 'react';
import "../css/Auction.css";

const AuctionsMock = [
  {
    title : "Title",
    image : "http://localhost:3000/images/placeholder.jpg",
    link : "Link",
    date : "Date",
    category : "Cate",
    prize : 2,
    description : "Desc",
  }
];

class AuctionList extends Component {
    render() {
      return (
        <div className="content col-xs-12">
          <ul>
              {AuctionsMock.map(auction => <AuctionListItem key={auction.toString()} value={auction}/>)}
          </ul>
        </div>
      );
    }
  }
  
  export default AuctionList;