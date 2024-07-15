import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className: string;
  type: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  children,
  className,
  type,
  disabled,
}) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className={className}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
