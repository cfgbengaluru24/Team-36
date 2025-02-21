import React, { Component } from "react";
import { Link } from "react-router-dom";
export class Navbar extends Component {
  render() {
    return (
      <>
        <nav
          className="navbar navbar-expand-lg "
          style={{ backgroundColor: "rgb(136 184 255)" }}
        >
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">
              Rohini
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link className="nav-link active" aria-current="page" to="/">
                    Home
                  </Link>
                </li>
              </ul>
              <form className="d-flex" role="search">
                <Link className="cr" to="/link">
                  <button className="btn btn-outline-success" type="submit">
                    Sign In
                  </button>
                </Link>
              </form>
            </div>
          </div>
        </nav>
      </>
    );
  }
}

export default Navbar;
