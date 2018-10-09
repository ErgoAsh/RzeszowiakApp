import React, { Component } from 'react';


class AuctionListItem extends Component {
    render() {
      return (
        <li>
            <div className="ItemImage">


            </div>
            <div className="ItemInfo">

                
            </div>
            <div className="ItemDescription">
                <p>{this.props.value}</p>
                
            </div>
        </li>
      );
    }
  }
  
  export default AuctionListItem;