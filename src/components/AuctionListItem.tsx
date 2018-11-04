import * as React from 'react';
import Auction from '../models/Auction';

interface AuctionItemProps
{
    value: Auction;
} 

class AuctionListItem extends React.Component<AuctionItemProps, any> {

  onClick() {
    if (this.props.value.link != null)
      open(this.props.value.link.toString());
  }

  constructor(props: AuctionItemProps) {
    super(props);
  }

  render() {
    return (
      <div onClick={() => this.onClick()} className="container-fluid">
        <div>
          <div className="ItemInfo col-md-6">
            {this.props.value.title}
            <p>Cena: {this.props.value.prize}</p>   
          </div>
          <div className="ItemDescription col-md-6"><br />
            <p> {this.props.value.description} </p>   
          </div>
        </div>
      </div>
    );
  }                        
}                                
  
export default AuctionListItem;