import React, { Component } from 'react';


class AuctionListItem extends Component {
    render() {
      return (
        <li>
            <div className="ItemImage">
              <img src={this.props.value.image}/>
            </div>
            <div className="ItemInfo">
              <p>{this.props.value.title}</p>
              <p>Cena: {this.props.value.prize}</p>             
            </div>
            <div className="ItemDescription">
             {this.props.value.description}
                
            </div>
        </li>
      );
    }                               
  }                                 
  
  export default AuctionListItem;