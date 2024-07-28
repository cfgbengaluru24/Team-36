import React, { useState, useEffect } from 'react';
import './formstyles.css';

const Form = () => {
  // State variables
  const [formValues, setFormValues] = useState({
    fullname: '',
    dob: '',
    gender: '',
    locality: '',
    phoneNumber: '',
    parentName: '',
    attendingDoc: '1', // Assuming Dr. John Doe has an ID of 1
    knownAllergies: [],
    medications: [],
    pastTreatments: [],
    plaqueIndex: '',
    gingivalIndex: '',
    caries: '',
    missingTeeth: '',
    gumCondition: '',
    pictures: [],
    rbcCount: '',
    hemoglobin: '',
    ironLevel: '',
    ferritinLevel: '',
    docsComments: '',
    followupVisit: '',
  });

  const [formErrors, setFormErrors] = useState({
    phoneNumber: '',
    followupVisit: '', // Added validation error state
  });

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value, type, files, checked } = e.target;
    if (type === 'checkbox') {
      setFormValues(prevValues => ({
        ...prevValues,
        [name]: checked,
      }));
    } else if (type === 'file') {
      setFormValues(prevValues => ({
        ...prevValues,
        [name]: Array.from(files),
      }));
    } else if (Array.isArray(formValues[name])) {
      // Handle multi-select (arrays) and tags
      setFormValues(prevValues => ({
        ...prevValues,
        [name]: value.split(',').map(item => item.trim()),
      }));
    } else {
      setFormValues(prevValues => ({
        ...prevValues,
        [name]: value,
      }));
    }
  };

  // Validate phone number
  const validatePhoneNumber = () => {
    const phoneNumberPattern = /^\d{10}$/;
    const isValid = phoneNumberPattern.test(formValues.phoneNumber);
    setFormErrors(prevErrors => ({
      ...prevErrors,
      phoneNumber: isValid ? '' : 'Please enter a valid 10-digit phone number.',
    }));
    return isValid;
  };

  // Validate follow-up visit
  const validateFollowupVisit = () => {
    const isValid = !isNaN(formValues.followupVisit) && formValues.followupVisit >= 0;
    setFormErrors(prevErrors => ({
      ...prevErrors,
      followupVisit: isValid ? '' : 'Please enter a valid number for follow-up visit.',
    }));
    return isValid;
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Create a FormData object for file uploads
    const formData = new FormData();
    
    // Handle file uploads separately
    const fileKeys = ['pictures']; // Array of keys for files
  
    fileKeys.forEach(key => {
      if (formValues[key].length > 0) {
        formValues[key].forEach(file => {
          formData.append(key, file);
        });
      }
    });
  
    // Extract non-file data
    const { pictures, ...jsonData } = formValues;
  
    // Convert non-file data to JSON
    const jsonBody = JSON.stringify(jsonData);
  
    try {
      // Make the POST request
      const response = await fetch('http://localhost:3001/api/addPatient', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-File-Data': 'true'  // Custom header to indicate file data is sent
        },
        body: jsonBody,
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      // Handle the response
      const result = await response.json();
      console.log('Success:', result);
      // You can display a success message or redirect the user here
    } catch (error) {
      console.error('Error:', error);
      // Handle errors here (e.g., display an error message to the user)
    }
  };
  
  

  return (
    <div className="container121">
      <h1 className="header">Dentist Analysis Form</h1>
      <form className="form121" onSubmit={handleSubmit}>
        <fieldset className="fieldset121">
          <legend className="legend121">Patient Information</legend>
          <label className="label121" htmlFor="fullname">Full Name:</label>
          <input
            type="text"
            id="fullname"
            name="fullname"
            value={formValues.fullname}
            onChange={handleInputChange}
            required
          />
          
          <label className="label121" htmlFor="dob">Date of Birth:</label>
          <input
            type="date"
            id="dob"
            name="dob"
            value={formValues.dob}
            onChange={handleInputChange}
            required
          />

          <label className="label121" htmlFor="gender">Gender:</label>
          <select
            id="gender"
            name="gender"
            value={formValues.gender}
            onChange={handleInputChange}
            required
          >
            <option value="" disabled>Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>

          <label className="label121" htmlFor="locality">Locality:</label>
          <input
            type="text"
            id="locality"
            name="locality"
            value={formValues.locality}
            onChange={handleInputChange}
            required
          />

          <label className="label121" htmlFor="phoneNumber">Phone Number:</label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            value={formValues.phoneNumber}
            onChange={handleInputChange}
          />
          {formErrors.phoneNumber && <p>{formErrors.phoneNumber}</p>}

          <label className="label121" htmlFor="parentName">Parent Name:</label>
          <input
            type="text"
            id="parentName"
            name="parentName"
            value={formValues.parentName}
            onChange={handleInputChange}
          />

          <label className="label121" htmlFor="attendingDoc">Attending Doctor ID:</label>
          <input
            type="number"
            id="attendingDoc"
            name="attendingDoc"
            value={formValues.attendingDoc}
            onChange={handleInputChange}
            readOnly
          />
        </fieldset>

        <fieldset className="fieldset121">
          <legend className="legend121">Medical History</legend>
          <label className="label121" htmlFor="knownAllergies">Known Allergies:</label>
          <textarea
            id="knownAllergies"
            name="knownAllergies"
            rows="2"
            value={formValues.knownAllergies.join(', ')}
            onChange={handleInputChange}
          ></textarea>

          <label className="label121" htmlFor="medications">Medications:</label>
          <textarea
            id="medications"
            name="medications"
            rows="2"
            value={formValues.medications.join(', ')}
            onChange={handleInputChange}
          ></textarea>

          <label className="label121" htmlFor="pastTreatments">Past Treatments:</label>
          <textarea
            id="pastTreatments"
            name="pastTreatments"
            rows="2"
            value={formValues.pastTreatments.join(', ')}
            onChange={handleInputChange}
          ></textarea>
        </fieldset>

        <fieldset className="fieldset121">
          <legend className="legend121">Dental Assessment</legend>
          <label className="label121" htmlFor="plaqueIndex">Plaque Index:</label>
          <input
            type="number"
            id="plaqueIndex"
            name="plaqueIndex"
            value={formValues.plaqueIndex}
            onChange={handleInputChange}
            required
          />

          <label className="label121" htmlFor="gingivalIndex">Gingival Index:</label>
          <input
            type="number"
            id="gingivalIndex"
            name="gingivalIndex"
            value={formValues.gingivalIndex}
            onChange={handleInputChange}
            required
          />

          <label className="label121" htmlFor="caries">Caries:</label>
          <input
            type="text"
            id="caries"
            name="caries"
            value={formValues.caries}
            onChange={handleInputChange}
            required
          />

          <label className="label121" htmlFor="missingTeeth">Missing Teeth:</label>
          <input
            type="text"
            id="missingTeeth"
            name="missingTeeth"
            value={formValues.missingTeeth}
            onChange={handleInputChange}
            required
          />

          <label className="label121" htmlFor="gumCondition">Gum Condition:</label>
          <input
            type="text"
            id="gumCondition"
            name="gumCondition"
            value={formValues.gumCondition}
            onChange={handleInputChange}
          />

          <label className="label121" htmlFor="pictures">Current Condition Pictures:</label>
          <input
            type="file"
            id="pictures"
            name="pictures"
            accept="image/*"
            onChange={handleInputChange}
            multiple
            required
          />
        </fieldset>

        <fieldset className="fieldset121">
          <legend className="legend121">Blood Diagnosis</legend>
          <label className="label121" htmlFor="rbcCount">Red Blood Cell Count:</label>
          <input
            type="number"
            id="rbcCount"
            name="rbcCount"
            value={formValues.rbcCount}
            onChange={handleInputChange}
            required
          />

          <label className="label121" htmlFor="hemoglobin">Hemoglobin Level:</label>
          <input
            type="number"
            id="hemoglobin"
            name="hemoglobin"
            value={formValues.hemoglobin}
            onChange={handleInputChange}
            required
          />

          <label className="label121" htmlFor="ironLevel">Iron Level:</label>
          <input
            type="number"
            id="ironLevel"
            name="ironLevel"
            value={formValues.ironLevel}
            onChange={handleInputChange}
            required
          />

          <label className="label121" htmlFor="ferritinLevel">Ferritin Level:</label>
          <input
            type="number"
            id="ferritinLevel"
            name="ferritinLevel"
            value={formValues.ferritinLevel}
            onChange={handleInputChange}
            required
          />
        </fieldset>

        <fieldset className="fieldset121">
          <legend className="legend121">Doctor's Comments</legend>
          <label className="label121" htmlFor="docsComments">Enter details:</label>
          <textarea
            id="docsComments"
            name="docsComments"
            rows="4"
            value={formValues.docsComments}
            onChange={handleInputChange}
          ></textarea>
        </fieldset>

        <fieldset className="fieldset121">
          <legend className="legend121">Follow-up Visit</legend>
          <label className="label121" htmlFor="followupVisit">Number of Visits:</label>
          <input
            type="number"
            id="followupVisit"
            name="followupVisit"
            value={formValues.followupVisit}
            onChange={handleInputChange}
          />
          {formErrors.followupVisit && <p>{formErrors.followupVisit}</p>}
        </fieldset>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Form;
