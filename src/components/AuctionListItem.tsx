import * as React from 'react';

interface AuctionItemProps
{
    value: Auction;
} 

class AuctionListItem extends React.Component<AuctionItemProps, any> {
  constructor(props: AuctionItemProps) {
    super(props);
    console.warn("Should Warn!!");
  }

  render() {
    return (
      <div className="container-fluid">
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