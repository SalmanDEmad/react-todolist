import React, { useState } from 'react';

function DropdownMenu({ onSelect }) {
  const [selectedOption, setSelectedOption] = useState('');

  const handleOptionChange = (event) => {
    const option = event.target.value;
    setSelectedOption(option);
    onSelect(option);
  };

  return (
    <select value={selectedOption} onChange={handleOptionChange}>
      <option value="">Select an option</option>
      <option value="important">Important</option>
      <option value="semi-important">Semi Important</option>
      <option value="unimportant">Unimportant</option>
    </select>
  );
}

export default DropdownMenu;
