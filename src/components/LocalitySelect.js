// components/LocalitySelect.js
import React from 'react';

const LocalitySelect = ({ value, onChange }) => {
  return (
    <>
      <label htmlFor="locality">Locality:</label>
      <select id="locality" name="locality" value={value} onChange={(e) => onChange(e.target.value)}>
        <option value="hyderabad">Hyderabad</option>
        <option value="warangal">Warangal</option>
        <option value="nizamabad">Nizamabad</option>
        <option value="karimnagar">Karimnagar</option>
        {/* Add more localities as needed */}
      </select>
    </>
  );
};

export default LocalitySelect;
