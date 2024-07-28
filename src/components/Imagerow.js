import React from "react";
import "./ImageRow.css"; // Import the CSS file for styling

const Imagerow = ({ image1, image2, text1, text2 }) => {
  return (
    <>
      <div className="image-row">
        <div className="image-container">
          <div className="App">
            <img
              src={require("./img1.jpg")}
              alt="Image 1"
              className="image"
              style={{ width: "550px", height: "auto", marginbottom: "8px" }}
            />
          </div>
          <p className="text">{text1}</p>
        </div>
        <div className="image-container">
          <div className="App">
            <img
              src={require("./img2.jpg")}
              alt="Image 2"
              className="image"
              style={{ width: "550px", height: "auto", marginbottom: "8px" }}
            />
          </div>
          <p className="text">{text2}</p>
        </div>
      </div>
      <div>
        <p>
          This is the impact of our organization. This is the current years
          statistics status. This is the impact of our organization. The graphs
          below display this year's statistics, highlighting key metrics such as
          community engagement, program participation, and financial growth.
          These visuals showcase our progress, achievements, and the positive
          changes we are making within the communities we serve.
        </p>
      </div>
    </>
  );
};

export default Imagerow;
