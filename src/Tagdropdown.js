import React, { useState } from 'react';
import { Form } from 'react-bootstrap';

function DropdownMenu({ onSelect }) {
  const [selectedOption, setSelectedOption] = useState('');

  const handleOptionChange = (event) => {
    const option = event.target.value;
    setSelectedOption(option);
    onSelect(option);
  };

  return (
    <Form.Group controlId="dropdownMenu">
      <Form.Label>Dropdown Menu</Form.Label>
      <Form.Select value={selectedOption} onChange={handleOptionChange}>
        <option value="">Select an option</option>
        <option value="important">Important</option>
        <option value="semi-important">Semi Important</option>
        <option value="unimportant">Unimportant</option>
      </Form.Select>
    </Form.Group>
  );
}

export default DropdownMenu;
