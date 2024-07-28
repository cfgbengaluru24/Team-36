// components/ImageUpload.js
import React from 'react';

const ImageUpload = ({ onChange }) => {
  return (
    <>
      <label htmlFor="imageUpload">Upload Image:</label>
      <input
        type="file"
        id="imageUpload"
        name="imageUpload"
        accept="image/*"
        onChange={(e) => onChange(e.target.files[0])}
      />
    </>
  );
};

export default ImageUpload;
