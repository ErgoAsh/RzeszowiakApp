import * as React from 'react';
import Auction, { AuctionType } from '../models/Auction';

declare global {
  interface Window {
    require: any;
  }
}

interface AuctionItemProps
{
    value: Auction;
} 

class AuctionListItem extends React.Component<AuctionItemProps, any> {

  onClick(e: React.MouseEvent<HTMLDivElement>) {
    if (this.props.value.link != null) {
        window.require("electron").shell.openExternal(this.props.value.link.toString());
    }
  }

  render() {

    let className = "Item";
    switch (this.props.value.type) {
      case AuctionType.Promo:
        className += " Item_promotion"; 
        break;
      case AuctionType.Special:
        className += " Item_special";
        break;
      default: break;
    }

    return (
      <div className={className}>
        <div onClick={(e) => this.onClick(e)} className="container-fluid">
            <div className="ItemInfo col-md-4">
              <p>{this.props.value.title}</p>
              <p>Cena: {this.props.value.prize} zł</p>   
            </div>
            <div className="ItemDescription col-md-8"><br />
              <p> {this.props.value.description} </p>   
            </div>
        </div>
      </div>
    );
  }                        
}                                
  
export default AuctionListItem;