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
          <div className="ItemImage col-md-2">
            <img alt="Yes" src="https://demos.creative-tim.com/paper-dashboard-pro/assets/img/faces/face-0.jpg"/*{this.props.value.image}*//>
          </div>
          <div className="ItemInfo col-md-4">
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