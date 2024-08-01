import React from 'react';
import './Success.css';

const Success: React.FC = () => {
  return (
    <div className="success-animation">
      <svg
        className="checkmark"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 52 52"
      >
        <circle
          className="checkmark__circle"
          cx="26"
          cy="26"
          r="25"
          fill="none"
        />
        <path className="checkmark__check" fill="none" d="M14 26l7 7 16-16" />
      </svg>
      <p className="success-message">Success!</p>
    </div>
  );
};

export default Success;
