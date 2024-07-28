// components/GenderOptions.js
import React from 'react';

const GenderOptions = ({ value, onChange }) => {
  return (
    <>
      <label>Gender:</label>
      <div className="gender-options">
        <label htmlFor="male">
          <input
            type="radio"
            id="male"
            name="gender"
            value="male"
            checked={value === 'male'}
            onChange={() => onChange('male')}
          />
          Male
        </label>
        <label htmlFor="female">
          <input
            type="radio"
            id="female"
            name="gender"
            value="female"
            checked={value === 'female'}
            onChange={() => onChange('female')}
          />
          Female
        </label>
        <label htmlFor="other">
          <input
            type="radio"
            id="other"
            name="gender"
            value="other"
            checked={value === 'other'}
            onChange={() => onChange('other')}
          />
          Other
        </label>
      </div>
    </>
  );
};

export default GenderOptions;
