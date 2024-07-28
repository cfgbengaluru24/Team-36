import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Option extends Component {
  render() {
    return (
      <div className="container d-flex align-items-center justify-content-center vh-100">
        <div className="row">
          <div className="col-md-6 d-flex justify-content-center mb-4">
            <div className="card mx-4" style={{ width: "18rem" }}>
              <img
                src={require("./formpic.jpg")}
                className="card-img-top"
                alt="Form"
              />
              <div className="card-body">
                <h5 className="card-title"></h5>
                <p className="card-text">Enter Patient Details Via Form</p>
                <Link to="/form" className="btn btn-primary">
                  Enter
                </Link>
              </div>
            </div>
          </div>

          <div className="col-md-6 d-flex justify-content-center mb-4">
            <div className="card mx-4" style={{ width: "18rem" }}>
              <img
                src={require("./chatpic.jpg")}
                className="card-img-top"
                alt="Form"
              />
              <div className="card-body">
                <h5 className="card-title"></h5>
                <p className="card-text">Enter Patient Details Via Chatbot</p>
                <Link
                  to="/doctor/uploaddata/chatbot"
                  className="btn btn-primary"
                >
                  Enter
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
