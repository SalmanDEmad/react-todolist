import React from 'react';
import { Form } from 'react-bootstrap';

function DropdownMenu({ onSelect, children }) {
  return (
    <Form.Group controlId="dropdownMenu">
      <Form.Label>Dropdown Menu</Form.Label>
      <Form.Select onChange={(event) => onSelect(event.target.value)}>
      {children}
      </Form.Select>
    </Form.Group>
  );
}

export default DropdownMenu;
