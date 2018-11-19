import * as React from 'react';
import { SearchCategory } from '../services/LinkProviderService';
import { observer, inject } from 'mobx-react';
import { computed } from 'mobx';
import '../css/App.css';
import AuctionStore from 'src/stores/AuctionStore';
import AuctionConfigStore from 'src/stores/AuctionConfigStore';

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

          <h1 className="col-md-12 text-md-center">Kategoria</h1>

            <div className="row col-md-12">
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
          <p className="col-md-12 text-md-left">Ogłoszenia z ostatnich</p>
          <div className="container">
            <div className="custom-checkbox">
              <input type="checkbox" name="checkbox-cust-1" className="checkbox-custom" id="checkbox-cust-1" />
              <label htmlFor="checkbox-cust-1" className="checkbox-custom-label">24 godzin</label>
            </div>
            <div className="custom-checkbox">
              <input type="checkbox" name="checkbox-cust-2" className="checkbox-custom" id="checkbox-cust-2" />
              <label htmlFor="checkbox-cust-2" className="checkbox-custom-label">3 dni</label>
            </div>
            <div className="custom-checkbox">
              <input type="checkbox" name="checkbox-cust-3" className="checkbox-custom" id="checkbox-cust-3" />
              <label htmlFor="checkbox-cust-3" className="checkbox-custom-label">7 dni</label>
            </div>
            <div className="custom-checkbox">
              <input type="checkbox" name="checkbox-cust-4" className="checkbox-custom" id="checkbox-cust-4" />
              <label htmlFor="checkbox-cust-4" className="checkbox-custom-label">14 dni</label>
            </div>
            <div className="custom-checkbox">
              <input type="checkbox" name="checkbox-cust-5" className="checkbox-custom" id="checkbox-cust-5" />
              <label htmlFor="checkbox-cust-5" className="checkbox-custom-label">30 dni</label>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SideBar;
