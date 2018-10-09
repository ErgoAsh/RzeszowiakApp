import React, { Component } from 'react';
import logo from '../images/logo.svg';
import '../css/App.css';


class App extends Component {
  render() {
    return (
      <div className="sidenav">
       <h1>Kategoria: !KOMPONENT! </h1>
       <p>Cena</p>
      od <input type="text" name="from" /><br />
      do <input type="text" name="to" />
      <p>Szukana fraza</p>
      <input type="text" name="keywords" />
      <p>Ogłoszenia z ostatnich</p>
      <h3><input type="radio" name="date"/> 24 godzin</h3>
      <h3><input type="radio" name="date"/> 3 Dni</h3>
      <h3><input type="radio" name="date"/> 7 Dni</h3>
      <h3><input type="radio" name="date"/> 14 Dni</h3>
      <h3><input type="radio" name="date"/> 30 Dni</h3>
      </div>
    );
  }
}

export default App;
