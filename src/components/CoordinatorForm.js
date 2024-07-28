// components/CoordinatorForm.js
import React, { useState } from 'react';
import LocalitySelect from './LocalitySelect';
import GenderOptions from './GenderOptions';
import ImageUpload from './ImageUpload';
import './CoordinatorForm.css';
import axios from 'axios'; // for making HTTP requests
import MultipleImageUpload from './MultipleImageUpload';

function CoordinatorForm() {
  const [locality, setLocality] = useState('');
  const [gender, setGender] = useState('');
  const [image, setImage] = useState(null);
  const [matched, setMatched] = useState(false);
  const [id,setId] = useState(null);

  const handleGenderChange = (value) => {
    setGender(value);
  };

  const handleLocalityChange = (value) => {
    setLocality(value);
  };

  const handleImageChange = (file) => {
    setImage(file);
  };

  // Convert image file to base64
  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result.split(',')[1]); // Extract base64 string
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    let imageBase64 = '';
    if (image) {
      imageBase64 = await getBase64(image);
    }

    const data = {
      locality: locality,
      gender: gender,
      image: imageBase64,
    };

    try {
      const response = await axios.post('http://localhost:5000/compare', data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      alert(`Response: ${response.data.message}`);
      console.log(response.data);
      setId(prev=>response.data.matches)
      if(response.status === 200){
        setMatched(prev=>true);
      }
    } catch (error) {
      console.error('Error submitting form', error);
      alert('An error occurred');
    }
  };

  return (
    <div className="container">
      <h1>Coordinator Page</h1>
      <form id="coordinatorForm" onSubmit={handleSubmit}>
        <fieldset>
          <legend>Coordinator Information</legend>
          <LocalitySelect value={locality} onChange={handleLocalityChange} />
          <GenderOptions value={gender} onChange={handleGenderChange} />
          <ImageUpload onChange={handleImageChange} />
          <button type="submit">Submit</button>
        </fieldset>
      </form>
      {matched ? <MultipleImageUpload id={id}/>: <></>}
    </div>
  );
}

export default CoordinatorForm;
