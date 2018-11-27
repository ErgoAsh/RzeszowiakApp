import * as React from 'react';
import Auction from '../models/Auction';

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
        //e.preventDefault();
        window.require("electron").shell.openExternal(this.props.value.link.toString());
    }
  }

  render() {
    return (
      <div className="Item">
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