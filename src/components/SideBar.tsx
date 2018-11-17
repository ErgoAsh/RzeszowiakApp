import * as React from 'react';
import { SearchCategory, SearchOptions } from '../services/LinkProviderService';
import { observer, inject } from 'mobx-react';
import { computed } from 'mobx';
import '../css/App.css';

@inject("auctionConfigStore", "auctionStore")
@observer
class SideBar extends React.Component<any, any> {

  @computed get options() {
    return this.props.auctionConfigStore.options;
  }

  setCategory(input: SearchCategory) {
    this.props.auctionConfigStore.update((old: SearchOptions) => {old.category = input; return old;});
    this.resetPage();
  }

  handleQueryUpdate(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({query: e.currentTarget.value});
    this.props.auctionConfigStore.update((old: SearchOptions) => {old.searchQuery = e.currentTarget.value; return old;});
    this.resetPage();
  }

  handleMinPrizeChange(e: React.ChangeEvent<HTMLInputElement>) {
    let result = parseInt(e.currentTarget.value);
    if (!isNaN(result)) {
      this.setState({min: result});
      this.props.auctionConfigStore.update((old: SearchOptions) => {old.minPrize = result; return old;});
    }
    this.resetPage();
  }

  handleMaxPrizeChange(e: React.ChangeEvent<HTMLInputElement>) {
    let result = parseInt(e.currentTarget.value);
    if (!isNaN(result)) {
      this.setState({max: result});
      this.props.auctionConfigStore.update((old: SearchOptions) => {old.maxPrize = result; return old;});
    }
    this.resetPage();
  }

  resetPage() {
    this.props.auctionConfigStore.update((old: SearchOptions) => {old.page = 1; return old;});
    this.props.auctionStore.downloadAuctions();
  }

  state = {
    query: "",
    min: 0,
    max: 0
  }

  render() {
    return (
      <div className="sidenav col-md-3">
        <div className="container">

          <h1 className="col-md-12 text-md-center">Kategoria </h1>

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
            <input onChange={(e) => this.handleMinPrizeChange(e)} value={this.state.min} placeholder="" name="od" type="text" className="form-control" required />
            <label htmlFor="od">Od</label>
          </fieldset>

          <fieldset className="float-label">
            <input onChange={(e) => this.handleMaxPrizeChange(e)} value={this.state.max} placeholder="" name="do" type="text" className="form-control" required />
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
