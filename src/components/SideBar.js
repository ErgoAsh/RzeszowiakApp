import React, { Component } from 'react';
import '../css/App.css';


class SideBar extends Component {
  render() {
    return (
      <div className="sidenav container">
          <div className="container">
            <h1 className="col-md-12 text-md-center">Kategoria: !KOMPONENT! </h1>
          </div>

        <div className="container">
          <p className="col-md-12 text-md-center">Cena</p>
          od <input type="text" name="from" className="input-sm col-md-12" /><br />
          do <input type="text" name="to" className="input-sm col-md-12" />
        </div>

        <div className="container">
          <p>Szukana fraza</p>
          <input type="text" name="keywords" className="input-sm col-md-12" />
        </div>

        <div className="container">
          <p className="col-md-12 text-md-left">Ogłoszenia z ostatnich</p>
            <h3><input type="radio" name="date" className="checkbox-inline" /> 24 godzin</h3>
            <h3><input type="radio" name="date" className="checkbox-inline"/> 3 Dni</h3>
            <h3><input type="radio" name="date" className="checkbox-inline"/> 7 Dni</h3>
            <h3><input type="radio" name="date" className="checkbox-inline"/> 14 Dni</h3>
            <h3><input type="radio" name="date" className="checkbox-inline"/> 30 Dni</h3>
        </div>

      </div>
    );
  }
}

export default SideBar;
