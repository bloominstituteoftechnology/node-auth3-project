import React from 'react';

const DropSelect = ({ departments, handleChange, value, name }) => (
  <select value={value} onChange={handleChange} name={name}>
    {departments.map(d => (
      <option key={d.id} value={d.id}>
        {d.name}
      </option>
    ))}
  </select>
);

export default DropSelect;
