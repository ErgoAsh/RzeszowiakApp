import * as React from 'react';
import { SearchCategory } from '../services/LinkProviderService';
import { observer, inject } from 'mobx-react';
import { computed } from 'mobx';
import '../css/App.css';
import AuctionStore from 'src/stores/AuctionStore';
import AuctionConfigStore from 'src/stores/AuctionConfigStore';
import '../effects/Dropdown';

interface ISideBarState {
  query: string,
  min: number | undefined,
  max: number | undefined
}

@inject("auctionConfigStore", "auctionStore")
@observer
class SideBar extends React.Component<{ auctionStore?: AuctionStore, auctionConfigStore?: AuctionConfigStore}, ISideBarState> {

  @computed get options() {
    return this.props.auctionConfigStore!.options;
  }

  setCategory(input: SearchCategory) {
    this.props.auctionConfigStore!.setCategory(input);
    this.resetPage();
  }

  handleQueryUpdate(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({query: e.currentTarget.value});
    this.props.auctionConfigStore!.setQuery(e.currentTarget.value);
    this.resetPage();
  }

  handleMinPrizeChange(e: React.ChangeEvent<HTMLInputElement>) {
    let val = e.target.value;
    if (val === '') {
      this.setState({min: undefined})
      this.props.auctionConfigStore!.setMinimumPrize(undefined);
    } else {
      let result = parseInt(val);
      this.setState({min: result});
      this.props.auctionConfigStore!.setMinimumPrize(result);
    }
    this.resetPage();
  }

  handleMaxPrizeChange(e: React.ChangeEvent<HTMLInputElement>) {
    let val = e.target.value;
    if (val === '') {
      this.setState({max: undefined})
      this.props.auctionConfigStore!.setMaximumPrize(undefined);
    } else {
      let result = parseInt(val);
      this.setState({max: result});
      this.props.auctionConfigStore!.setMaximumPrize(result);
    }
    this.resetPage();
  }

  resetPage() {
    this.props.auctionConfigStore!.setPage(1);
    this.props.auctionStore!.downloadAuctions();
  }

  state = {
    query: "",
    min: undefined,
    max: undefined
  }

  render() {
    return (
      <div className="sidenav col-md-3">
        <div className="container">
          <p className="text-center"><img src="/./images/rzeszow-logo.png" /></p>
          <h1 className="col-md-12 text-md-center">Kategoria</h1>

            <div className="container-fluid col-md-12 type">
            <div className="btn-group-lg text-center pagination-centered">
              <button onClick={() => this.setCategory(SearchCategory.Mieszkania)} type="button" className="btn btn-warning">Mieszkania</button>
              <button onClick={() => this.setCategory(SearchCategory.Domy)} type="button" className="btn btn-warning">Domy</button>
              <button onClick={() => this.setCategory(SearchCategory.Dzialki)} type="button" className="btn btn-warning">Działki</button>
              <button onClick={() => this.setCategory(SearchCategory.Lokale)} type="button" className="btn btn-warning">Lokale, garaże</button>
            </div>
          </div>
        </div>

        <div className="container">
           
          <fieldset className="float-label">
            <input onChange={(e) => this.handleMinPrizeChange(e)} value={this.state.min} name="od" type="number" className="form-control" required />
            <label htmlFor="od">Od</label>
          </fieldset>

          <fieldset className="float-label">
            <input onChange={(e) => this.handleMaxPrizeChange(e)} value={this.state.max} name="do" type="number" className="form-control" required />
            <label htmlFor="do">Do</label>
          </fieldset>
          
        </div>

        <div className="container">

          <fieldset className="float-label">
            <input onChange={(e) => this.handleQueryUpdate(e)} value={this.state.query} name="phrase" type="text" className="form-control" required />
            <label htmlFor="phrase">Fraza</label>
          </fieldset>
        </div>
        
        <div className="container">
         <div className="dropdown">
           <input type="text" name="seen-value" placeholder="Ogłoszenia z ostatnich" required />
           <input type="hidden" name="hidden-value" required />
             <div className="dropdown__list">
              <ul>
                <li data-value=""></li>
                <li data-value="24">24 Godzin</li>
                <li data-value="3">3 Dni</li>
                <li data-value="7">7 Dni</li>
                <li data-value="14">14 Dni</li>
                <li data-value="30">30 Dni</li>
              </ul>
             </div>
          </div>
        </div>

        <div className="container text-center sorting">
          <div className="btn-group-lg text-center pagination-centered">
            <p className="h2">Sortuj według</p>
            <button type="button" className="btn btn-warning">Ceny</button>
            <button type="button" className="btn btn-warning">Daty dodania</button>
          </div>
        </div>

      </div>
    );
  }
}

export default SideBar;
