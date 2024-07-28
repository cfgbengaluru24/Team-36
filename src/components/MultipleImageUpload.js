import React, { useState } from 'react';
import axios from 'axios';

const MultipleImageUpload = ({ id }) => {
  const [images, setImages] = useState([]);

  const handleImageChange = (e) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setImages((prevImages) => [...prevImages, ...filesArray]);
    }
  };

  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleSubmit = async () => {
    const imagePromises = images.map(async (file) => {
      const base64String = await getBase64(file);
      return base64String;
    });

    try {
      const base64Images = await Promise.all(imagePromises);
      const response = await axios.post('http://localhost:3001/upload-images', {
        id,
        images: base64Images,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      alert(`Response: ${response.data.message}`);
    } catch (error) {
      console.error('Error submitting images', error);
      alert('An error occurred');
    }
  };

  const renderPhotos = (source) => {
    return source.map((photo, index) => {
      const imageURL = URL.createObjectURL(photo);
      return (
        <div key={index} style={{ display: 'inline-block', position: 'relative', margin: '10px' }}>
          <img src={imageURL} alt="" style={{ width: '100px', height: '100px' }} />
          <button 
            onClick={() => removeImage(index)}
            style={{
              position: 'absolute',
              top: '0px',
              right: '0px',
              background: '#ff0000',
              color: '#ffffff',
              border: 'none',
              borderRadius: '50%',
              cursor: 'pointer',
              padding: '2px 6px',
              fontSize: '12px',
            }}
          >
            X
          </button>
        </div>
      );
    });
  };

  return (
    <div className="container">
      <h1>Upload Images</h1>
      <form>
        <fieldset>
          <legend>Upload your images</legend>
          <label htmlFor="fileInput">Select Images:</label>
          <input type="file" id="fileInput" multiple accept="image/*" onChange={handleImageChange} />
        </fieldset>
      </form>
      <div>{renderPhotos(images)}</div>
      <button onClick={handleSubmit} type="button">Submit</button>
    </div>
  );
};

export default MultipleImageUpload;
