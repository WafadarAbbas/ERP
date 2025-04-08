// Testing2.js
import React from 'react';
import { useParams } from 'react-router-dom';

const Testing2 = () => {
  const { id } = useParams(); // Get the ID from URL params

  return (
    <div>
      <h1>Testing2 Page</h1>
      <p>Selected Item ID: {id}</p>
    </div>
  );
};

export default Testing2;
