import * as React from 'react';

import '../css/App.css';

class SideBar extends React.Component {
  render() {
    return (
      <div className="sidenav col-md-3">
          <div className="container">

            <h1 className="col-md-12 text-md-center">Kategoria </h1>

             <div className="row col-md-12">
              <div className="btn-group-lg text-center pagination-centered">
                <button type="button" className="btn btn-warning">Mieszkania</button>
                <button type="button" className="btn btn-warning">Domy</button>
                <button type="button" className="btn btn-warning">Działki</button>
                <button type="button" className="btn btn-warning">Lokale,garaże</button>
              </div>
            </div>
          </div>

        <div className="container">
           
          <fieldset className="float-label">
          <input name="od" type="text" className="form-control" required />
          <label htmlFor="od">Od</label>
          </fieldset>

            <fieldset className="float-label">
          <input name="do" type="text" className="form-control" required />
          <label htmlFor="do">Do</label>
          </fieldset>
          
        </div>

        <div className="container">

          <fieldset className="float-label">
          <input name="phrase" type="text" className="form-control" required />
          <label htmlFor="phraze">Fraza</label>
          </fieldset>
        </div>

        <div className="container">
          <p className="col-md-12 text-md-left">Ogłoszenia z ostatnich</p>
            <div className="container">





            </div>
        </div>
      </div>
    );
  }
}

export default SideBar;
