// Button.tsx

import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  color: string;
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({ children, onClick, color }) => {
  return (
    <button className={`btn btn-${color}`} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
